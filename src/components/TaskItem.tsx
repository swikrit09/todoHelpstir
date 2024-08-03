import React, { useState } from 'react';

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
        <li className="mb-2 border-b border-gray-200 pb-2 px-4">
            <div className="flex justify-between items-center">
                <span className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                </span>
                <div className="flex space-x-2">
                    <button onClick={handleMarkAsDone} className="text-blue-500">
                        {task.completed ? 'Undo' : 'Done'}
                    </button>
                    <button onClick={toggleEditing} className="text-yellow-500">
                        Edit
                    </button>
                    <button onClick={() => onDeleteTask(task.id)} className="text-red-500">
                        Delete
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="mt-2">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-1 border border-gray-300 w-full mb-2"
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="p-1 border border-gray-300 w-full mb-2"
                            />
                            <button onClick={handleSave} className="text-green-500">
                                Save
                            </button>
                        </>
                    ) : (
                        <p>{task.description}</p>
                    )}
                    <small className="text-gray-500">Last updated: {task.updatedAt}</small>
                </div>
            )}
            <button onClick={toggleExpanded} className="text-sm text-gray-500">
                {isExpanded ? 'Collapse' : 'Expand'}
            </button>
        </li>
    );
};

export default TaskItem;
