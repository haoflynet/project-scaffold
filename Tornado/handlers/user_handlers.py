from handlers.base_handler import BaseHandler

import tornado.web

from models import User


class UserHandler(BaseHandler):
    def get(self):
        user = User.get_username('')
        count = self.db_session.query(User).count()
        self.write('{} users so far!'.format(count))


class UserDetailHandler(tornado.web.RequestHandler):
    def get(self, user_id):
        self.write('user id: ' + user_id)
