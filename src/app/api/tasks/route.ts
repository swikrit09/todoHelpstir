import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'tasks.json');

const getTasks = (): any[] => {
    const tasksData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(tasksData);
};

export async function GET() {
    const tasks = getTasks();
    return NextResponse.json(tasks);
}


export async function POST(req: Request) {
    const { title, description } = await req.json();
    const tasks = getTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        description,
        completed: false,
        updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    return NextResponse.json(newTask);
}
