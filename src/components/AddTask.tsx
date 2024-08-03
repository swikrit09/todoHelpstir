'use client';
import React, { useState } from 'react';

interface AddTaskProps {
    onAddTask: (task: { title: string; description: string }) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) return;

        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
            const newTask = await response.json();
            window.location.reload();
            setTitle('');
            setDescription('');
        } else {
            // Handle error
            console.error('Failed to add task');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 max-w-[300px]">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border bg-transparent border-gray-950 outline-none rounded-[6px] placeholder:text-gray-500 shadow-md mb-2 w-full"
                required
            />
            <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border bg-transparent border-gray-950 outline-none rounded-[6px] placeholder:text-gray-500 shadow-md mb-2 w-full"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Task
            </button>
        </form>
    );
};

export default AddTask;
