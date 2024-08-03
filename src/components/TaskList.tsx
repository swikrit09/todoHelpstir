import React, { useState } from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    updatedAt: string;
}

interface TaskListProps {
    tasks: Task[];
    onUpdateTask: (id: number, updatedTask: Partial<Task>) => void;
    onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='w-full px-2'>
            <input
                type="text"
                placeholder="Search tasks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300"
            />
            <ul>
                {filteredTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;