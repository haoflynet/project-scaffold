import tornado.httpserver
import tornado.ioloop
import tornado.web
from tornado_sqlalchemy import make_session_factory

from urls import url_patterns


def make_app():
    factory = make_session_factory('sqlite:///relative_path')
    return tornado.web.Application(url_patterns, session_factory=factory)

if __name__ == "__main__":
    address = '127.0.0.1'
    port = 8888

    app = make_app()
    app.listen(port, address)
    print('* Running on http://{address}:{port}/ (Press CTRL+C to quit)'.format(address=address, port=port))
    tornado.ioloop.IOLoop.current().start()
