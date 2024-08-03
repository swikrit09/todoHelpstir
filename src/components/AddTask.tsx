// src/components/AddTask.tsx

import React, { useState } from 'react';

interface AddTaskProps {
    onAddTask: (title: string, description: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (title.trim() === '' || description.trim() === '') {
            alert('Please provide both a title and a description.');
            return;
        }

        onAddTask(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <div className="min-w-[300px] mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-2">Add New Task</h2>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border border-gray-300 w-full"
                />
            </div>
            <div className="mb-2">
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border border-gray-300 w-full"
                />
            </div>
            <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Task
            </button>
        </div>
    );
};

export default AddTask;
