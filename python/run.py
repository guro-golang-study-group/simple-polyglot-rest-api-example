import sys
from flask import Flask, url_for, redirect

app = Flask(__name__)

@app.route('/admin')
def user_admin():
    return "login Admin"

@app.route('/user/<user>')
def show_user(user):
    return str("Hi~ %s! " %user)

@app.route('/')
def index():
    return "Python Flask"

@app.errorhandler(404)
def page_not_found(error):
    app.logger.error(error)
    return "Code Number - %s" %error


@app.route("/<name>")
def flask_user(name):
    if name == 'admin':
        return redirect(url_for("user_admin"))
    elif name == None :
        return redirect(url_for("index"))
    else:
        return redirect(url_for("show_user", user=name))

if __name__ == '__main__':
	app.run(debug=False)
