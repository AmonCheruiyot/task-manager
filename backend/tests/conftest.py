import pytest
from app import create_app
from app.extensions import db

@pytest.fixture(scope='session')
def app():
    """Create and configure a new app instance for a test session."""
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture(scope='session')
def client(app):
    """A test client for the app."""
    return app.test_client()

