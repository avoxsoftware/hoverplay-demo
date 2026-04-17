from datetime import timedelta
import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-change-me')
    DEMO_USER = os.getenv('DEMO_USER', 'demo')
    DEMO_PASSWORD = os.getenv('DEMO_PASSWORD', 'demo')
    DEMO_PASSWORD_HASH = os.getenv('DEMO_PASSWORD_HASH')
    SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE', 'False').lower() in ('1','true','yes')
    SESSION_LIFETIME_HOURS = int(os.getenv('SESSION_LIFETIME_HOURS', '2'))
    PERMANENT_SESSION_LIFETIME = timedelta(hours=SESSION_LIFETIME_HOURS)
