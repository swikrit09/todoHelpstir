'use client';

import { Check, ChevronDown, ChevronUp, Pencil, Trash2, UndoDot } from 'lucide-react';
import React, { useState } from 'react';
import { formatDate } from '../../utils/dateFormatter';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    updatedAt: string;
}

interface TaskItemProps {
    task: Task;
    onUpdateTask: (id: number, updatedTask: Partial<Task>) => void;
    onDeleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleEditing = () => {
        if (!isExpanded) {
            setIsExpanded(true)
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        onUpdateTask(task.id, { title, description });
        toggleEditing();
    };

    const handleMarkAsDone = () => {
        onUpdateTask(task.id, { completed: !task.completed });
    };

    return (
        <li className="mb-2 border-b border-gray-400 pb-2">
            <div className="flex justify-between items-center">
                <span className={`font-semibold ${isEditing ? "animate-pulse" : ""} ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                </span>
                <div className="flex space-x-2">
                    <button onClick={handleMarkAsDone} className="bg-blue-500  p-2 rounded-full">
                        {task.completed ? <UndoDot /> : <Check />}
                    </button>
                    <button onClick={toggleEditing} className="bg-yellow-500  p-2 rounded-full">
                        <Pencil />
                    </button>
                    <button onClick={() => onDeleteTask(task.id)} className="bg-red-500 p-2 rounded-full">
                        <Trash2 />
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="mt-2 flex flex-col gap-1">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-2  border bg-transparent border-gray-950 outline-none rounded-[6px] placeholder:text-gray-500 shadow-md mb-2"
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="p-2  border bg-transparent border-gray-950 outline-none rounded-[6px] placeholder:text-gray-500 shadow-md mb-2"
                            />
                            <button onClick={handleSave} className="text-green-200 p-1 px-4 rounded-md bg-green-900">
                                Save
                            </button>
                        </>
                    ) : (
                        <p className='px-2'>{task.description}</p>
                    )}
                    <small className="text-gray-500  px-2">Last updated: {formatDate(task.updatedAt)}</small>
                </div>
            )}
            <button onClick={toggleExpanded} className="text-sm text-gray-500">
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>
        </li>
    );
};

export default TaskItem;
