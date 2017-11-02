import tornado.web
from tornado.gen import coroutine
from tornado_sqlalchemy import SessionMixin, as_future

from models.user import User


class UserHandler(tornado.web.RequestHandler, SessionMixin):
    @coroutine
    def get(self):
        with self.make_session() as session:
            count = yield as_future(session.query(User).count)
        self.write('{} users so far!'.format(count))


class UserDetailHandler(tornado.web.RequestHandler):
    def get(self, user_id):
        self.write('user id: ' + user_id)
