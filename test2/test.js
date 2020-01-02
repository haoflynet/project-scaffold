'use strict';
var inquirer = require('inquirer');


inquirer
  .prompt([
    {
      type: 'input',
      name: 'path',
      message: '你想生成到哪个目录?',
      default: './'
    },
    {
      type: 'input',
      name: 'name',
      message: '输入项目名',
      default: 'test'
    },
    {
      type: 'input',
      name: 'version',  // 定义选项的回答
      message: '你想使用的Django版本',
      default: 'Newest'
    },
    {
      type: 'input',
      name: 'enable',
      message: '输入默认的venv地址，没有输入则会在指定目录下创建venv文件夹',
      default: ''
    },
    {
      type: 'confirm',
      name: 'enable_admin',
      message: '是否开启admin',
      default: true
    },
    {
      type: 'confirm',
      name: 'enable_safedelete',
      message: '是否安装软删插件'
    },
    {
      type: 'input',
      name: 'time_zone',
      message: '设置时区',
      default: 'Chongqing'
    }
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  });
