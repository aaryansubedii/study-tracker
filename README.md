# 📚 Study Tracker

A full-stack task and deadline management app built to help students track assignments, deadlines, and priorities across their modules.

## Features
- Create, edit, complete, and delete tasks
- Filter tasks by status (All / Pending / Completed)
- Tasks sorted automatically by upcoming deadline
- Priority levels (Low / Medium / High) with visual indicators
- Persistent storage via H2 file-based database

## Tech Stack
**Backend:** Java, Spring Boot, Spring Data JPA, H2 Database
**Frontend:** HTML, CSS, JavaScript (vanilla, no framework)
**Tools:** Maven, Git/GitHub, Postman (API testing)

## Architecture
- REST API built with Spring Boot following standard layered architecture (Controller → Repository → Entity)
- Frontend communicates with the backend via the Fetch API, using JSON over HTTP
- CRUD operations fully implemented and tested (Create, Read, Update, Delete)

## How to Run

**Backend:**
1. Clone this repo
2. Open the project in IntelliJ (or your preferred IDE)
3. Run `StudyTrackerApplication.java`
4. Backend runs on `http://localhost:8080`

**Frontend:**
1. Open `frontend/index.html` in your browser
2. Make sure the backend is running first

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/{id} | Get a task by ID |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

## Future Improvements
- User authentication (multi-user support)
- Deploy backend and frontend live
- Add unit tests
- Migrate frontend to React

---
Built by Aaryan Subedi