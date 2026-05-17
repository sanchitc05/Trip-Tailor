import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

BACKEND_ROOT = Path(__file__).resolve().parents[1]

if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.main import app
from app.routers.auth import users_db


@pytest.fixture(autouse=True)
def clear_users_db():
    users_db.clear()
    yield
    users_db.clear()


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client
