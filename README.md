# RSIT EduManage ERP

A full-stack college management system built for **Rohit Sharma Institute of Technology (RSIT)** — designed and developed independently to manage students, faculty, attendance, marks, and fees across departments.

🔗 **Live App:** [edumanage-erp.netlify.app](https://edumanage-erp.netlify.app/login_edumanage_erp/code.html)

---

## 📖 About

EduManage ERP is a role-based academic management portal built from scratch by us as a personal/practice project to learn full-stack development, authentication, and cloud deployment. It is **not affiliated with, based on, or derived from any hackathon or problem statement** — the idea, design, and implementation are entirely our own.

---

## ✨ Features

### 👨‍💼 Admin Portal
- Institutional dashboard with real-time student/faculty/fee stats
- Add, view, and manage student records
- Add, view, and manage faculty records
- Fee record management and payment tracking
- Institutional announcements

### 👩‍🏫 Faculty Portal
- Mark attendance with guided dropdowns (Semester → Department → Subject) — no manual ID entry needed
- Create exams and enter student marks
- View class-wise performance reports
- Personal profile overview

### 🎓 Student Portal
- View exam marks and academic performance
- Subject-wise attendance tracking with a 75% minimum-attendance visual warning
- View fee status and payment history
- Personal profile overview

### 🔐 Authentication
- Role-based access control (Admin / Faculty / Student)
- Secure token-based authentication via Supabase Auth

---

## 🛠️ Tech Stack

**Frontend**
- HTML, CSS (Tailwind CSS), vanilla JavaScript
- Chart.js for data visualization
- Deployed on [Netlify](https://netlify.com)

**Backend**
- Node.js + Express + TypeScript
- Zod for request validation
- Deployed on [Railway](https://railway.app)

**Database & Auth**
- [Supabase](https://supabase.com) (PostgreSQL + Auth)

---

## 🔗 Links

| Service | URL |
|---|---|
| Frontend (Netlify) | https://edumanage-erp.netlify.app |
| Backend API (Railway) | https://student-erp-production.up.railway.app |
| Database | Supabase (PostgreSQL) |

---

## 📂 Project Structure

```
student-erp/
├── backend/                          # Node.js + Express + TypeScript API
│   └── src/
│       ├── config/                   # Supabase client config
│       ├── controllers/              # Route handlers
│       ├── middlewares/              # Auth & role guards
│       ├── routes/                   # API route definitions
│       └── validators/               # Zod schemas
├── login_edumanage_erp/              # Login page
├── admin_dashboard_edumanage_erp/    # Admin dashboard
├── manage_students_edumanage_erp/    # Admin — student management
├── manage_faculty_edumanage_erp/     # Admin — faculty management
├── fee_management_edumanage_erp/     # Admin — fee management
├── mark_attendance_faculty_portal/   # Faculty — mark attendance
├── enter_marks_faculty_portal/       # Faculty — enter marks
├── class_report_faculty_portal/      # Faculty — class reports
├── my_marks_student_portal/          # Student — view marks
├── student_attendance_portal/        # Student — view attendance
├── fee_status_student_portal/        # Student — fee status
└── student_profile_student_portal/   # Student — profile
```

---

## 🚀 Getting Started (Local Development)

### Backend
```bash
cd backend
npm install
# Add your Supabase credentials to a .env file:
# SUPABASE_URL=
# SUPABASE_SERVICE_ROLE_KEY=
# SUPABASE_ANON_KEY=
npm run dev
```

### Frontend
Each portal page is a standalone HTML file — simply open the relevant `code.html` in a browser, or serve the whole folder with any static file server (e.g. `npx serve`).

---

## 👥 Contributors

- **Harsh Shah** — [github.com/Harshshah931](https://github.com/Harshshah931)
- **Kabir Patel** — [github.com/kabirpatel1310](https://github.com/kabirpatel1310)

---

## 📄 License

This project was built for educational purposes as part of our personal learning journey in full-stack web development.
