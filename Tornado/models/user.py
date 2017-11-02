from sqlalchemy import Column, BigInteger, String
from tornado_sqlalchemy import declarative_base

DeclarativeBase = declarative_base()


class User(DeclarativeBase):
    id = Column(BigInteger, primary_key=True)
    username = Column(String(255), unique=True)
