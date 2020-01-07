"use strict";
const inquirer = require("inquirer");
const fs = require("fs");
const PATH = require("path");
const util = require("util");
const execSync = require("child_process").execSync;

class Django {
  constructor(answer) {
    this.answer = answer;
    this.settings_file_path = util.format(
      "%s/%s/%s/settings.py",
      answer.path,
      answer.name,
      answer.name
    );
    this.python_path = util.format(
      "%s/%s/venv/bin/python",
      this.answer.path,
      this.answer.name
    );
    this.pip_path = util.format(
      "%s/%s/venv/bin/pip",
      this.answer.path,
      this.answer.name
    );
    this.project_path = util.format(
      "%s/%s",
      this.answer.path,
      this.answer.name
    );
    this.initProject();
    this.setDatabases();
    this.installApps();
    this.otherSettings();
  }

  execCmd(cmd) {
    console.log(cmd);
    console.log(execSync(cmd).toString());
  }

  setDatabases() {
    console.log("设置数据库");
    const self = this;
    if (this.answer.databases.includes("mysql")) {
      console.log("设置Mysql数据库连接");
      const settings_mysql = util.format(
        "DATABASES = {\n" +
          "    'default': {\n" +
          "        'ENGINE': 'django.db.backends.mysql',\n" +
          "        'NAME': '%s',\n" +
          "        'USER': '%s',\n" +
          "        'PASSWORD': '%s',\n" +
          "        'HOST': '%s',\n" +
          "        'PORT': %s,\n" +
          "        'CONN_MAX_AGE': 0,\n" +
          "    }\n" +
          "}",
        this.answer.mysql_db,
        this.answer.mysql_username,
        this.answer.mysql_password,
        this.answer.mysql_host,
        this.answer.mysql_port
      );

      let content = fs.readFileSync(this.settings_file_path, "utf-8");
      const result = content.replace(
        /DATABASES[\s\S]*?default[\s\S]*?{[\s\S]*?}[\s\S]*?}/g,
        settings_mysql
      );
      fs.writeFileSync(this.settings_file_path, result, "utf-8");
      this.execCmd(
        util.format(
          '%s install mysqlclient --global-option=build_ext --global-option="-L/usr/local/opt/openssl/lib" --global-option="-I/usr/local/opt/openssl/include"',
          this.pip_path
        )
      );

      if (this.answer.databases.mysql_inspect) {
        console.log("自动生成model");
        this.execCmd(
          "cd %s && %s manage.py inspect > %s/models.py",
          this.project_path,
          this.python_path,
          this.python_path,
          this.answer.default_app
        );
      }
    }

    // 设置Redis数据库连接
    if (this.answer.databases.includes("redis")) {
      console.log("暂不支持redis的设置");
    }

    // 设置Mongodb数据库连接
    if (this.answer.databases.includes("mongodb")) {
      console.log("暂不支持mongodb的设置");
    }
  }

  installApps() {
    console.log("安装APP");
    const self = this;
    let addApps = [];

    if (this.answer.apps.includes("django-safedelete")) {
      console.log("安装django-safedelete");
      this.execCmd(util.format("%s install django-safedelete", this.pip_path));
      addApps.push("safedelete");
    }

    let appsStr = "'django.contrib.staticfiles',\n";
    addApps.forEach(item => {
      appsStr += util.format("    '%s',\n", item);
    });
    appsStr += "]";
    console.log(appsStr);
    let content = fs.readFileSync(this.settings_file_path, "utf-8");
    const result = content.replace(
      /'django.contrib.staticfiles',[\s\S]*?]/g,
      appsStr
    );
    fs.writeFileSync(this.settings_file_path, result, "utf-8");
  }

  otherSettings() {
    console.log("系统其他配置");
    const self = this;
    if (this.answer.system_settings.includes("将时区设置为当前时区")) {
      console.log("设置时区");

      let content = fs.readFileSync(this.settings_file_path, "utf-8");
      const result = content.replace(
        /TIME_ZONE = 'UTC'/g,
        "TIME_ZONE = 'Asia/Chongqing'"
      );
      fs.writeFileSync(this.settings_file_path, result, "utf-8");
    }
  }

  initProject() {
    console.log("项目初始化");
    console.log("检查django-admin命令是否安装...");

    console.log("新建项目");
    this.execCmd(
      util.format(
        "cd %s && django-admin startproject %s",
        this.answer.path,
        this.answer.name
      )
    );

    console.log("新建APP");
    this.execCmd(
      util.format(
        "cd %s/%s && django-admin startapp %s",
        this.answer.path,
        this.answer.name,
        this.answer.default_app
      )
    );

    if (this.answer.enable_venv) {
      console.log("生成虚拟环境...");
      this.execCmd(
        util.format(
          "cd %s/%s && virtualenv --no-site-packages --python=%s venv",
          this.answer.path,
          this.answer.name,
          this.answer.python_path
        )
      );
    } else {
      console.log("目前仅支持使用venv");
    }
  }
}

inquirer
  .prompt([
    {
      type: "input",
      name: "path",
      message: "你想生成到哪个目录?",
      default: "./",
      validate: function(path) {
        try {
          fs.accessSync(PATH.resolve(path), fs.W_OK);
          return true;
        } catch (err) {
          return "\n该目录" + PATH.resolve(path) + "不可写，请重新输入";
        }
      },
      filter: function(path) {
        return PATH.resolve(path);
      }
    },
    {
      type: "input",
      name: "name",
      message: "输入项目名",
      default: "my_project",
      validate: function(name, answer) {
        const path = PATH.resolve(answer.path, name);
        try {
          fs.statSync(path);
          return "\n该路径" + path + "已存在，请重新输入";
        } catch (err) {
          return true;
        }
      }
    },
    {
      type: "input",
      name: "version",
      message: "你想使用的Django版本",
      default: "Newest"
    },
    {
      type: "confirm",
      name: "enable_venv",
      message: "是否需要使用虚拟python环境(virtualenv)",
      default: true
    },
    {
      type: "input",
      name: "venv_name",
      message: "请输入生成的venv目录名称",
      default: "venv",
      when: function(answer) {
        return answer.enable_venv;
      }
    },
    {
      type: "input",
      name: "python_path",
      message: "请输入Python解释器命令地址",
      default: "python3.7",
      when: function(answer) {
        return answer.enable_venv;
      }
    },
    {
      type: "checkbox",
      message: "需要设置哪些数据库",
      name: "databases",
      default: ["mysql"],
      choices: [
        {
          name: "mysql"
        },
        {
          name: "redis"
        },
        {
          name: "mongodb"
        }
      ]
    },
    {
      type: "input",
      name: "mysql_host",
      message: "输入MySQL的Host",
      default: "127.0.0.1",
      when: function(answer) {
        return answer.databases.includes("mysql");
      }
    },
    {
      type: "input",
      name: "mysql_port",
      message: "输入MySQL的端口",
      default: "3306",
      when: function(answer) {
        return answer.databases.includes("mysql");
      }
    },
    {
      type: "input",
      name: "mysql_db",
      message: "输入MySQL的DB_name",
      default: "test",
      when: function(answer) {
        return answer.databases.includes("mysql");
      }
    },
    {
      type: "input",
      name: "mysql_username",
      message: "输入MySQL的用户名",
      default: "root",
      when: function(answer) {
        return answer.databases.includes("mysql");
      }
    },
    {
      type: "input",
      name: "mysql_password",
      message: "输入MySQL的密码",
      default: "",
      when: function(answer) {
        return answer.databases.includes("mysql");
      }
    },
    {
      type: "confirm",
      name: "mysql_inspect",
      message: "是否需要从MySQL数据库自动生成model",
      default: true,
      when: function(answer) {
        return answer.databases.includes("mysql");
      }
    },
    {
      type: "input",
      name: "redis_host",
      message: "请输入Redis的Host",
      default: "127.0.0.1:6379",
      when: function(answer) {
        return answer.databases.includes("redis");
      }
    },
    {
      type: "input",
      name: "default_app",
      message: "请输入默认APP的名称",
      default: "app"
    },
    {
      type: "checkbox",
      name: "apps",
      message: "需要安装哪些APP",
      default: ["admin", "django-safedelete"],
      choices: [
        {
          name: "admin"
        },
        {
          name: "django-safedelete"
        }
      ]
    },
    {
      type: "checkbox",
      name: "system_settings",
      message: "其他设置",
      default: ["支持多语言", "将时区设置为当前时区"],
      choices: [
        {
          name: "支持多语言"
        },
        {
          name: "将时区设置为当前时区"
        }
      ]
    }
  ])
  .then(answer => {
    new Django(answer);
  });
