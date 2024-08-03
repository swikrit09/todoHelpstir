'use client';

import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import AddTask from '@/components/AddTask';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  updatedAt: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async (title: string, description: string) => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    const newTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = async (id: number, updatedTask: Partial<Task>) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await response.json();
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-xl min-h-screen mx-auto py-8 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <AddTask onAddTask={addTask} />
      <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
    </div>
  );
}
