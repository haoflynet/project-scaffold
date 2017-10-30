from handlers.hello import HelloHandler
from handlers.user_controllers import UserHandler, UserDetailHandler

url_patterns = [
    (r"/hello", HelloHandler),
    (r"/users", UserHandler),
    (r"/users/[0-9]+", UserDetailHandler),
]
