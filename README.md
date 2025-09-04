# 🏃‍♂️ TaskSprint

![GitHub Repo Size](https://img.shields.io/github/repo-size/AmonCheruiyot/task-manager)
![GitHub stars](https://img.shields.io/github/stars/AmonCheruiyot/task-manager?style=social)
![GitHub license](https://img.shields.io/github/license/AmonCheruiyot/task-manager)
![GitHub issues](https://img.shields.io/github/issues/AmonCheruiyot/task-manager)

**TaskSprint** is a modern, full-stack **task management application** designed to help users efficiently create, manage, and track tasks. It features a **responsive and stylish frontend** built with **React (Vite)**, and a **powerful backend** powered by **Flask**.

---

## 🚀 Features

### ✏️ Task Management
- **Add, edit, and delete tasks** with ease
- Track task status: **To Do**, **In Progress**, **Done**
- **Search and filter** tasks to find what you need
- Set and view **due dates and timestamps**

### 📊 Analytics Dashboard
- Visual **summary of completed vs. pending tasks**
- Get a quick overview of your productivity

### 🔄 Undo Functionality
- **Undo edits or deletions** quickly via intuitive notifications
- Never lose a task by mistake

### 🎨 Modern UI/UX
- **Clean, responsive design** that works on desktop and mobile
- **Smooth animations** for a polished feel
- Separate modals for adding and editing tasks

### 🛠️ Modular Architecture
- Frontend and backend are completely separated
- Built with **reusable components** and **custom hooks**

---

## 📁 Project Structure

```
task-manager/
├── backend/                 # Flask backend application
│   ├── app/                # Application modules and routes
│   ├── instance/           # Configurations and environment files
│   ├── tests/              # Unit and integration tests
│   ├── run.py              # Application entry point
│   ├── seed.py             # Script to seed initial data
│   ├── requirements.txt
│   ├── Pipfile
│   └── .env.example        # Environment variables template
└── frontend/               # React frontend application
    ├── src/
    │   ├── api/            # API calls and services
    │   ├── assets/         # Images, icons, fonts
    │   ├── components/     # Reusable UI components
    │   ├── hooks/          # Custom React hooks
    │   ├── pages/          # Application pages
    │   ├── utils/          # Utility functions
    │   └── main.jsx        # Application entry point
    ├── public/
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

### Backend (Flask)

**Backend Features:**
- **RESTful API** for full **CRUD operations** on tasks
- **Undo/redo** functionality support
- **Unit & integration test** coverage

**Example Endpoints:**
- `GET /tasks` – Fetch all tasks
- `POST /tasks` – Create a new task
- `PUT /tasks/<id>` – Update a specific task
- `DELETE /tasks/<id>` – Delete a task

### Frontend (React + Vite)

**Frontend Features:**
- Modern UI/UX styled with **Tailwind CSS**
- **Modals** for seamless task creation and editing
- Real-time **notifications** for undo actions
- Interactive **Analytics Dashboard**

---

## 💻 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** and **pipenv** (or virtualenv)

### 1. Clone the Repository
```bash
git clone https://github.com/AmonCheruiyot/task-manager.git
cd task-manager
```

### 2. Set Up the Backend
```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
pipenv install

# Activate the virtual environment
# On Linux/macOS:
pipenv shell
# On Windows (Command Prompt):
.\venv\Scripts\activate
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# Install Python dependencies
pip install -r requirements.txt

# Edit .env file with your configuration

# Seed the database with sample data
python seed.py

# Start the Flask development server
python run.py
```
The backend API will be running at `http://localhost:5000`.

### 3. Set Up the Frontend
```bash
# Open a new terminal, navigate to the frontend directory
cd frontend

# Install npm dependencies
npm install

# Start the Vite development server
npm run dev
```
The frontend application will be running at `http://localhost:3000`.

---

## ⚡ Usage

1. Open your browser and go to `http://localhost:3000`
2. **Add a new task** by clicking the "New Task" button
3. **Edit an existing task** by clicking the edit (✎) icon
4. **Delete a task** by clicking the delete (🗑️) icon
5. **Undo** an action using the notification that appears
6. Use the **search and filter** options to manage your tasks
7. View your productivity stats on the **Analytics Dashboard**

---

## 🛠️ Tech Stack

| Layer          | Technology |
|----------------|------------|
| **Frontend**   | React, Vite, Tailwind CSS, Heroicons |
| **Backend**    | Python, Flask, Flask-RESTful |
| **Architecture** | RESTful APIs, Modular Components, Custom Hooks |

---

## ✅ Future Improvements

- [ ] User authentication and personal accounts
- [ ] Task categorization by projects or labels
- [ ] Drag-and-drop task prioritization
- [ ] Email or browser notifications for upcoming due dates
- [ ] Persistent database storage (e.g., PostgreSQL, MongoDB)
- [ ] Dark mode theme

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/AmonCheruiyot/task-manager/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Amon Kiprotich**

* 📍 Nairobi, Kenya
* 📧 kiprotichamon03@gmail.com
* 🔗 [GitHub](https://github.com/AmonCheruiyot)
* 🔗 [LinkedIn](https://www.linkedin.com/in/amon-kiprotich-b67a252b6/)

---

## 🙏 Acknowledgments

- Icons provided by [Heroicons](https://heroicons.com/)
- UI components built with [Tailwind CSS](https://tailwindcss.com/)
- Backend powered by [Flask](https://flask.palletsprojects.com/)
