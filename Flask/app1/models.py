from sqlalchemy import Column
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):		# 这样子定义model
    pass