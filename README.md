# 🎓 Student ERP — Institutional Access Portal

A full-stack web-based ERP system for educational institutions, built for **Smart India Hackathon 2025** (Problem Statement SIH25103 — Government of Rajasthan). It provides a unified platform for Admins, Faculty, and Students to manage academic operations efficiently.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| Frontend | [https://edumanage-erp.netlify.app](https://edumanage-erp.netlify.app) |
| Backend API | [https://student-erp-backend-v7f3.onrender.com](https://student-erp-backend-v7f3.onrender.com) |

---

## 👥 Team

| Name | Role |
|---|---|
| Harsh Shah | Frontend Development |
| Kabir Patel | Backend Development & Database |

---

## ✨ Features

### 🔐 Authentication
- Role-based login system (Admin / Faculty / Student)
- JWT-based session management
- Secure password handling

### 🧑‍💼 Admin Portal
- Manage students (add, update, view)
- Manage faculty (add, update, view)
- Manage departments
- View and control fee records
- Monitor attendance and marks across the institution

### 👨‍🏫 Faculty Portal
- Mark and update student attendance
- Enter and manage student marks/grades
- View assigned students and departments

### 🧑‍🎓 Student Portal
- View personal academic profile
- Check attendance records
- View marks and grades
- Track fee payment status

---

## 🛠️ Tech Stack

### Frontend
- **HTML5, CSS3, JavaScript** — vanilla, no framework
- Deployed on **Netlify**

### Backend
- **Node.js** with **TypeScript**
- **Express.js** — REST API framework
- **Zod** — request validation
- **JWT** — authentication tokens
- Deployed on **Render**

### Database
- **Supabase** (PostgreSQL) — database + storage
- Row-level access managed via service role key

---

## 📁 Project Structure

```
student-erp/
│
├── backend/                        # Node.js + TypeScript backend
│   ├── src/
│   │   ├── config/                 # Supabase client config
│   │   ├── constants/              # App-wide constants
│   │   ├── controllers/            # Route handler logic
│   │   │   ├── auth.controller.ts
│   │   │   ├── student.controller.ts
│   │   │   ├── faculty.controller.ts
│   │   │   ├── attendance.controller.ts
│   │   │   ├── marks.controller.ts
│   │   │   ├── fee.controller.ts
│   │   │   ├── department.controller.ts
│   │   │   └── notification.controller.ts
│   │   ├── middlewares/            # Auth middleware
│   │   ├── repositories/           # DB query abstraction
│   │   ├── routes/                 # Express route definitions
│   │   ├── services/               # Business logic layer
│   │   ├── types/                  # TypeScript type definitions
│   │   ├── utils/                  # Helper utilities
│   │   ├── validators/             # Zod schemas for validation
│   │   └── index.ts                # App entry point
│   ├── package.json
│   └── tsconfig.json
│
├── login_edumanage_erp/            # Login page
├── admin_dashboard_edumanage_erp/  # Admin dashboard
├── manage_students_edumanage_erp/  # Student management UI
├── manage_faculty_edumanage_erp/   # Faculty management UI
├── fee_management_edumanage_erp/   # Fee management UI
├── fee_status_student_portal/      # Student fee status UI
├── mark_attendance_faculty_portal/ # Faculty attendance UI
├── enter_marks_faculty_portal/     # Faculty marks entry UI
├── my_marks_student_portal/        # Student marks UI
├── institutional_trust/            # Landing/info page
└── index.html                      # Root redirect to login
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login and receive JWT token |

### Students
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Update student details |
| DELETE | `/api/students/:id` | Delete a student |

### Faculty
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/faculty` | Get all faculty |
| POST | `/api/faculty` | Add faculty |
| PUT | `/api/faculty/:id` | Update faculty |

### Attendance
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/attendance` | Get attendance records |
| POST | `/api/attendance` | Mark attendance |

### Marks
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/marks` | Get marks |
| POST | `/api/marks` | Enter marks |

### Fees
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/fees` | Get fee records |
| POST | `/api/fees` | Add fee record |

### Departments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/departments` | Get all departments |
| POST | `/api/departments` | Add department |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- npm
- A Supabase project (free tier works)

### 1. Clone the repository
```bash
git clone https://github.com/Harshshah931/student-erp.git
cd student-erp
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
PORT=10000
```

Start the backend:
```bash
npx tsx src/index.ts
```

Backend will run at `http://localhost:10000`

### 3. Setup the Frontend
No build step needed — open any HTML file directly in your browser, or use a local server:
```bash
# From the repo root
npx serve .
```

Make sure the API base URL in the frontend JS files points to `http://localhost:10000` for local development.

---

## 🚀 Deployment

### Backend — Render
1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `npx tsx src/index.ts`
6. Add all environment variables from the `.env` above

### Frontend — Netlify
1. Go to [Netlify](https://netlify.com) → Add new site → Import from Git
2. Connect your GitHub repo
3. Leave build command empty (static site)
4. Set **Publish directory** to `/` (repo root)
5. Deploy

---

## 🗄️ Database

This project uses **Supabase** (PostgreSQL). Key tables:

- `users` — shared auth table for all roles
- `students` — student profile data
- `faculty` — faculty profile data
- `departments` — department records
- `attendance` — attendance entries
- `marks` — student marks/grades
- `fees` — fee payment records

---

## 📄 License

This project was built for **Smart India Hackathon 2025** (SIH25103).  
All rights reserved © 2025 Harsh Shah & Kabir Patel.