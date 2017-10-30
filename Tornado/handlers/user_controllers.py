import tornado.web


class UserHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('users')


class UserDetailHandler(tornado.web.RequestHandler):
    def get(self, user_id):
        self.write('user id: ' + user_id)