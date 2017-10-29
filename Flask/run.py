from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from app1 import app1


app = Flask(__name__, instance_relative_config=True)		# 第二个参数是为了加载instance文件夹

app.config.from_object('config')		# 加载配置文件config.py，之后可以通过app.config['name']来访问对应的配置了，这和flask的配置是放在一起的，这里设置DEBUG就能影响到flask
app.config.from_pyfile('config.py')		 # 这里是在加载instance文件夹下的配置，这样就可以覆盖config.py里面的配置了
# 获取配置方式: app.config['HOST']

app.register_blueprint(app1, url_prefix='/app1')		# 可以自定义前缀

SQLAlchemy(app)		# 连接数据库，数据库的各项配置可直接写在config.py里面

if __name__ == '__main__':
    app.run()
