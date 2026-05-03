# 🚀 TaskSphere - Premium Task Management System

TaskSphere is a professional, full-stack task management application designed for high-performing teams. It features a stunning **frosted glassmorphism** UI and robust role-based access control.

![TaskSphere Dashboard](https://raw.githubusercontent.com/ajithbaburocks652-tech/TaskSphere/main/assets/preview.png)

## ✨ Features

- **💎 Elite UI/UX**: Stunning frosted glass aesthetic with fluid Framer Motion animations.
- **🔐 Secure Auth**: JWT-based authentication with encrypted password hashing.
- **👥 Role-Based Access**:
  - **Admins**: Full control over projects, team members, and task assignments.
  - **Members**: Focused workspace to view and update assigned tasks.
- **📊 Smart Dashboard**: Real-time productivity metrics, overdue alerts, and activity streams.
- **📋 Kanban Task Board**: Intuitive status management (Todo, In Progress, Done) with smart deadline tracking.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Framer Motion, Lucide Icons, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Styling**: Vanilla CSS (Custom Design System), HSL Color Palette.
- **Deployment**: Optimized for Railway.app.

## 🚀 Deployment Guide (Railway)

### 1. Backend Setup
- **Root Directory**: `/backend`
- **Environment Variables**:
  - `MONGO_URI`: Your MongoDB connection string.
  - `JWT_SECRET`: A secure random string for signing tokens.
  - `FRONTEND_URL`: The URL of your deployed frontend.

### 2. Frontend Setup
- **Root Directory**: `/frontend`
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview`
- **Environment Variables**:
  - `VITE_API_BASE_URL`: The public URL of your backend service.

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ajithbaburocks652-tech/TaskSphere.git
   cd TaskSphere
   ```

2. **Install Dependencies**:
   ```bash
   npm run install-all
   ```

3. **Configure Environment**:
   - Create `.env` in the `backend` folder with `MONGO_URI` and `JWT_SECRET`.

4. **Run the App**:
   - Backend: `npm run backend`
   - Frontend: `npm run frontend`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [Ajit Babu](https://github.com/ajithbaburocks652-tech)