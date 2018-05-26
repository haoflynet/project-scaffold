from sqlalchemy import Column, BigInteger, String

from db import Base, db_session



class User(Base):
    id = Column(BigInteger, primary_key=True)
    username = Column(String(255), unique=True)

    @staticmethod
    def get_username(username):
        db_session.commit()
        return 'ok'
