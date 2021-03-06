from handlers.hello import HelloHandler
from handlers.user_handlers import UserHandler, UserDetailHandler

url_patterns = [
    (r"/hello", HelloHandler),
    (r"/users", UserHandler),
    (r"/users/(?P<user_id>\d+)", UserDetailHandler),
]
