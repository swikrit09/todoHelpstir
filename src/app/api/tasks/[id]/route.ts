import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'tasks.json');

const getTasks = (): any[] => {
    const tasksData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(tasksData);
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const taskId = parseInt(params.id);
    const updatedData = await req.json();
    const tasks = getTasks();

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    const updatedTask = {
        ...tasks[taskIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    return NextResponse.json(updatedTask);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const taskId = parseInt(params.id);
    const tasks = getTasks();

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    tasks.splice(taskIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    return NextResponse.json({ message: 'Task deleted successfully' });
}