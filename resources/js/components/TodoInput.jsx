import React, {useState} from 'react';

const TodoInput = ({ onAddItem }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title) {
            setErrors(errors => [...errors, 'title']);
        }
        if (!description) {
            setErrors(errors => [...errors, 'description']);
        }

        if (!title || !description) {
            return;
        }

        onAddItem({ title, description });
        setTitle("");
        setDescription("");
        setErrors([]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create new Todo</h3>
            <label htmlFor="todo-title">Title:</label>
            <input name="todo-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.includes('title') && <span className="error">Required</span>}
            <label htmlFor="todo-description">Description:</label>
            <textarea name="todo-description" value={description} onChange={(e) => setDescription(e.target.value)} />
            {errors.includes('description') && <span className="error">Required</span>}
            <button type="submit">Add</button>
        </form>
    )
}

export default TodoInput;
