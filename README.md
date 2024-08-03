# Todo List Application

This Todo List application is built with Next.js, featuring Server-Side Rendering (SSR) for fetching tasks and client-side logic for managing tasks. It includes functionalities such as task creation, updating, marking as completed, and searching, along with a modern glassmorphic design.

## System Design

The application is structured to provide a responsive and interactive user experience:

- **Frontend**: Built with Next.js for SSR and React for dynamic user interfaces. Styled using Tailwind CSS for a sleek, glassmorphic look.
- **Backend**: Uses a dummy JSON file for data storage. Server-side rendering ensures that tasks are fetched and displayed with the latest updates on page load.
- **Features**:
  - **Create Task**: Users can add new tasks with a title and description.
  - **Update Task**: Allows editing of existing tasks.
  - **Mark as Done**: Tasks can be marked as completed.
  - **Search Tasks**: Filter tasks using a search bar.
  - **Expandable List**: View task details and timestamps in an expandable format.

## Implementation

- **Server-Side Rendering (SSR)**: 
  - Implemented with `getServerSideProps` to fetch the latest task data on page load, ensuring up-to-date task lists.
- **Real-Time Updates**: 
  - Utilizes client-side state management to refresh the task list whenever a new task is added or updated.
- **Date Formatting**: 
  - Custom utility function formats dates in `dd/mm/yy, HH:MM AM/PM` format for consistent and readable timestamps.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Installation

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
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
- **POST /api/tasks**: Adds a new task. Requires `title` and `description` in the request body.

## Video Demo

Watch the video demonstration of the application: [Demo Video](https://www.loom.com/share/a07652fc7b684b71a53740f8e0cbf9c4) 

## Code Quality

- The code is modular, well-organized, and properly commented for clarity and ease of maintenance.
