import fs from 'fs';
import path from 'path';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, description, completed } = await req.json();

    const filePath = path.join(process.cwd(), 'data', 'tasks.json');
    const tasksData = fs.readFileSync(filePath, 'utf8');
    const tasks = JSON.parse(tasksData);

    const taskIndex = tasks.findIndex((task: any) => task.id === parseInt(id));

    if (taskIndex === -1) {
        return new Response(JSON.stringify({ error: 'Task not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const updatedTask = {
        ...tasks[taskIndex],
        title: title ?? tasks[taskIndex].title,
        description: description ?? tasks[taskIndex].description,
        completed: completed ?? tasks[taskIndex].completed,
        updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    return new Response(JSON.stringify(updatedTask), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), 'data', 'tasks.json');
    const tasksData = fs.readFileSync(filePath, 'utf8');
    const tasks = JSON.parse(tasksData);

    const filteredTasks = tasks.filter((task: any) => task.id !== parseInt(id));

    fs.writeFileSync(filePath, JSON.stringify(filteredTasks, null, 2));

    return new Response(JSON.stringify({ message: 'Task deleted' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
