# Todo List Application

This Todo List application is built with Next.js, demonstrating Server-Side Rendering (SSR) for task management. It includes features like task creation, editing, marking as completed, searching, and expandable task details.

## Features

- **Create Task**: Add new tasks with a title and description.
- **Update Task**: Edit existing tasks.
- **Mark as Done**: Mark tasks as completed.
- **Search Tasks**: Filter tasks using a search functionality.
- **Expandable List**: Display tasks in an expandable format, showing a description and a timestamp of the last update.
  
## Data Storage

- Uses a dummy JSON file as a data repository for storing tasks.

## Tech Stack

- **Next.js**: A React framework with built-in SSR support.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Provides type safety and error checking.
- **Tailwind CSS**: For modern and responsive UI design.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/swikrit09/todoHelpstir.git
   cd todoHelpstir
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

To build the application for production, run:

```bash
npm run build
```

Then, start the production server:

```bash
npm start
```

## API Endpoints

- **GET /api/tasks**: Fetches the list of tasks.
- **POST /api/tasks**: Adds a new task. Requires `title` and `description`.

## Implementation Details

- **Server-Side Rendering (SSR)**: 
  - Uses `getServerSideProps` to fetch tasks initially, ensuring the task list is up-to-date on page load.

- **Real-Time Updates**: 
  - Task list refreshes automatically when a new task is added or updated.

- **URL Parameters**: 
  - Utilized for handling search functionality, enabling users to filter tasks effectively.

## Video Demo

Watch the video demonstration of the application: [Demo Video](https://www.loom.com/share/b9e8c20613ce4ebdaa9cd2b0bb51bb6d) 

## Code Quality

- The code is modular, well-organized, and properly commented to facilitate understanding and future enhancements.

