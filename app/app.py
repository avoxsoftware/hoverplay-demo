import time
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
from werkzeug.security import generate_password_hash, check_password_hash
from .config import Config

start_time = time.time()

app = Flask(__name__, template_folder='templates', static_folder='static', static_url_path='/static')
app.config.from_object(Config)

# Session cookie settings
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = True if app.config.get('SESSION_COOKIE_SECURE') else False
app.permanent_session_lifetime = app.config.get('PERMANENT_SESSION_LIFETIME')

# Demo credentials (in-memory)
DEMO_USER = app.config.get('DEMO_USER')
if app.config.get('DEMO_PASSWORD_HASH'):
    DEMO_PASSWORD_HASH = app.config.get('DEMO_PASSWORD_HASH')
else:
    DEMO_PASSWORD_HASH = generate_password_hash(app.config.get('DEMO_PASSWORD'))


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect(url_for('login', next=request.path))
        return f(*args, **kwargs)
    return decorated_function


@app.after_request
def set_security_headers(response):
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Referrer-Policy'] = 'no-referrer'
    return response


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/status')
def status():
    uptime = time.time() - start_time
    return jsonify(status='ok', service='hoverplay-demo', uptime_seconds=int(uptime))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user' in session:
        return redirect(url_for('demo'))
    error = None
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')
        if username == DEMO_USER and check_password_hash(DEMO_PASSWORD_HASH, password):
            session.permanent = True
            session['user'] = username
            return redirect(request.args.get('next') or url_for('demo'))
        else:
            error = 'Invalid credentials'
            flash(error, 'danger')
    return render_template('login.html', error=error)


@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))


@app.route('/demo')
@login_required
def demo():
    user = session.get('user')
    return render_template('demo.html', user=user)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
