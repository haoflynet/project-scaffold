from app1 import app1


@app1.route('/')
def hello():
    return 'Hello World'
