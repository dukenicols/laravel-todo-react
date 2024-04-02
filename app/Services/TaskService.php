<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    public function createTask($attributes)
    {
        $attributes['user_id'] = Auth::id();
        $task = Task::create($attributes);
        return $task;
    }

    public function getUserTaskById($taskId)
    {
        $user = Auth::user();
        return Task::where('user_id', $user->id)->findOrFail($taskId);
    }

    public function getUserTasks()
    {
        $user = Auth::user();
        return Task::where('user_id', $user->id)->get();
    }

    public function updateTask($taskId, $attributes)
    {
        $task = $this->getUserTaskById($taskId);
        $task->update($attributes);
        return $task;
    }

    public function deleteTask($taskId)
    {
        $task = $this->getUserTaskById($taskId);
        $task->delete();
        return $task;
    }
}
