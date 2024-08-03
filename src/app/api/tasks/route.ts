import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const { title, description } = await req.json();

    if (!title || !description) {
        return new Response(JSON.stringify({ error: 'Title and description are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const filePath = path.join(process.cwd(), 'data', 'tasks.json');
    const tasksData = fs.readFileSync(filePath, 'utf8');
    const tasks = JSON.parse(tasksData);

    const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    return new Response(JSON.stringify(newTask), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}
