'use client';

import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    updatedAt: string;
}

interface TaskListProps {
    initialTasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ initialTasks }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleUpdateTask = async (id: number, updatedTask: Partial<Task>) => {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        if (response.ok) {
            const data = await response.json();
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === id ? { ...task, ...data } : task))
            );
        } else {
            console.error('Failed to update task');
        }
    };

    const handleDeleteTask = async (id: number) => {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } else {
            console.error('Failed to delete task');
        }
    };

    return (
        <div className='min-w-[400px] w-full'>
            <input
                type="text"
                placeholder="Search tasks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border bg-transparent border-gray-950 outline-none rounded-[6px] placeholder:text-gray-500 shadow-md mb-2 w-full sm:w-[70%]"
            />
            <ul>
                {filteredTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                    />
                ))}
            </ul>
        </div>
    );
};


export default TaskList;
