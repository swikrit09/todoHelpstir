import fs from 'fs';
import path from 'path';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  updatedAt: string;
}

async function getTasks(): Promise<Task[]> {
  const filePath = path.join(process.cwd(), 'data', 'tasks.json');
  const tasksData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(tasksData);
}

export default async function Home() {
  let tasks = await getTasks();
  return (
    <div className="min-w-screen min-h-screen bg-[url('https://images.pexels.com/photos/139312/pexels-photo-139312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover flex items-center justify-center">
      <div className="max-w-screen min-h-[70vh] bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl md:backdrop-blur-md rounded-lg p-8 shadow-lg my-4">
        <h1 className="text-2xl tracking-[0.9px] font-bold text-emerald-950 mb-4">Todo List</h1>
        <div className="flex flex-col sm:flex-row gap-10">

          <AddTask
          // onAddTask={onAddTask}
          />
          <TaskList initialTasks={tasks} />
        </div>
      </div>
    </div>
  );
}
