DEBUG = True
BIND_HOST = '0.0.0.0'
BIND_PORT = 5000

SQLALCHEMY_DATABASE_URI = ''			# 在这里面写配置会直接连接
SQLALCHEMY_ECHO = True                  # 测试用，输出所有的sql语句
SQLALCHEMY_POOL_SIZE = 5                # 数据库连接池大小，默认5
SQLALCHEMY_POOL_TIMEOUT = 10            # 超时时间，默认10
SQLALCHEMY_POOL_RECYCLE = 2 * 60 * 60   # 连接回收时间，默认2小时
SQLALCHEMY_TRACK_MODIFICATIONS = True   # 去除最新版本启用的warning