import React, {useEffect, useState} from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import {
    useAddTaskMutation,
    useDeleteTaskMutation,
    useGetTasksQuery,
    useUpdateTaskMutation
} from "../store/components/tasks.js";
import {toast} from "react-toastify";

function TodoList(props) {

    const { data, isFetching, isSuccess, refetch } = useGetTasksQuery(null)

    const [addTaskMutation, resultAdd] = useAddTaskMutation();
    const [updateTaskMutation, resultUpdate] = useUpdateTaskMutation();
    const [deleteTaskMutation, resultDelete] = useDeleteTaskMutation();


    const [tasks, setTasks] = useState([]);


    useEffect(() => {

        if (data && data.data) {
            setTasks(data.data)
        }


    }, [data, isFetching, isSuccess])

    const deleteTask = (id) => {
        deleteTaskMutation(id);
    }
    const toggleCompleted = (task) => {
        const nextStatus = task.status === 'pending' ? 'completed' : 'pending';
        updateTaskMutation({ ...task, status: nextStatus });
    }

    const addTask = (task) => {
        addTaskMutation(task);
    }

    useEffect(() => {
        if (resultAdd.status === 'fulfilled') {
            toast("New task added :)")
        }
    }, [resultAdd]);

    useEffect(() => {
        if (resultUpdate.status === 'fulfilled') {
            toast(`Task "${resultUpdate.data.data.title}" updated :)`)
        }
    }, [resultUpdate]);

    useEffect(() => {
        if (resultDelete.status === 'fulfilled') {
            toast(`Task deleted :(`)
        }
    }, [resultDelete]);

    return (
        <div className="container">
            <TodoInput onAddItem={addTask} />
            <div className="list">
            {tasks.map((task) => (
                <TodoItem key={task.id} task={task} onDelete={deleteTask} onComplete={toggleCompleted} />
            ))}
            </div>
            {!tasks.length && <p>No tasks yet, Try creating one using the form above :)</p>}
        </div>
    );
}

export default TodoList;
