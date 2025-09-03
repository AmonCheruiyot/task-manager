import pytest
from app.models import db, Task

def test_list_tasks_empty(client):
    """
    Test that the /api/tasks endpoint returns an empty list initially.
    """
    # Arrange: Ensure the database is empty for this specific test
    with client.application.app_context():
        db.session.query(Task).delete()
        db.session.commit()

    # Act: Make a GET request to the endpoint
    response = client.get('/api/tasks')

    # Assert: Verify the response status and content
    assert response.status_code == 200
    assert response.get_json() == []

def test_create_and_get_task(client):
    """
    Test that a task can be created and then retrieved by its ID.
    """
    # Arrange: Define the task data
    task_data = {'title': 'First Task', 'description': 'Description of first task'}

    # Act: Send a POST request to create the task
    post_response = client.post('/api/tasks', json=task_data)

    # Assert 1: Check the creation response
    assert post_response.status_code == 201
    created_task = post_response.get_json()
    task_id = created_task['id']

    # Act 2: Send a GET request to retrieve the created task
    get_response = client.get(f'/api/tasks/{task_id}')

    # Assert 2: Check the retrieval response
    assert get_response.status_code == 200
    retrieved_task = get_response.get_json()
    assert retrieved_task['title'] == task_data['title']
    assert retrieved_task['description'] == task_data['description']

def test_update_task(client):
    """
    Test that an existing task can be updated.
    """
    # Arrange: Create a task first
    initial_task_data = {'title': 'Task to Update', 'description': 'Initial description'}
    post_response = client.post('/api/tasks', json=initial_task_data)
    task_id = post_response.get_json()['id']
    update_data = {'status': 'done', 'description': 'Updated description'}

    # Act: Send a PUT request to update the task
    put_response = client.put(f'/api/tasks/{task_id}', json=update_data)

    # Assert: Check the update response
    assert put_response.status_code == 200
    updated_task = put_response.get_json()
    assert updated_task['id'] == task_id
    assert updated_task['status'] == 'done'
    assert updated_task['description'] == 'Updated description'

def test_delete_task(client):
    """
    Test that a task can be deleted.
    """
    # Arrange: Create a task first
    post_response = client.post('/api/tasks', json={'title': 'Task to Delete'})
    task_id = post_response.get_json()['id']

    # Act 1: Send a DELETE request to delete the task
    delete_response = client.delete(f'/api/tasks/{task_id}')

    # Assert 1: Check the deletion response
    assert delete_response.status_code == 204

    # Act 2: Try to get the deleted task
    get_response = client.get(f'/api/tasks/{task_id}')

    # Assert 2: Verify the task is not found
    assert get_response.status_code == 404

