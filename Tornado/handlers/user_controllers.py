import tornado.web


class UserHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('users')


class UserDetailHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('user detail')