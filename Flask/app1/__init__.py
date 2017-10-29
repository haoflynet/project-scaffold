from flask import Blueprint
app1 = Blueprint('app1', __name__, template_folder='', static_folder='')

from app1 import views
