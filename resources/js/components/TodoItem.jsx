import React from 'react';

function TodoItem({ task, onDelete, onComplete }) {

    const handleChange = () => {
        onComplete(task);
    }

    const handleDelete = () => {
        onDelete(task.id);
    }

    const completed = task.status === 'completed';

    return (
        <div className={`todo-item ${completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={task.status === 'completed'} onChange={handleChange} />
            <div>
                <p>{task.title}</p>
                <p>{task.description}</p>
            </div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default TodoItem;
