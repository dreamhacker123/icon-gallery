# 🖼️ Icon Gallery - Realtime Image & Folder Manager

A fullstack real-time image management app built with **React**, **Node.js**, **Sequelize**, and **MySQL**. This app supports folder grouping, visibility toggling, drag & drop reordering, and real-time sync across sessions.

---

## 📦 Features

- Upload images with title & folder assignment
- Create/delete folders
- Group and reorder items & folders via drag and drop
- Toggle image visibility (hide/show)
- View hidden icons per folder
- Persist reorder state & visibility in database
- Real-time sync using **Socket.IO**
- Smooth UI with Tailwind CSS
- Bat scripts for starting and resetting the app
- Demo link: https://drive.google.com/file/d/1mnWacILuUAzerq8NKuLKdFOvUN4uuMDS/view?usp=drive_link
- HOW TO START APP: https://drive.google.com/file/d/1MV6IOc6Y0ssF1yB6QSSZGwG1Ym4uh6RJ/view?usp=sharing

---

## 🚀 Getting Started

### 1. 📁 Clone the Repository
```bash
https://github.com/dreamhacker123/icon-gallery.git
cd icon-gallery
```

### 2. ⚙️ Setup Environment Variables

#### Backend `.env` (in `/server`):
```env
REFER TO .env.example file
```

#### Frontend `.env` (in `/icon-gallery-react`):
```env
REFER TO .env.example file
```

### 3. 📂 Install Dependencies
```bash
cd server
npm install

cd ../icon-gallery-react
npm install
```

---

## 🧪 Start the Application

### ✅ Run everything via one command:
Double-click or run in terminal:
```bash
start-app.bat
```
This script will:
- Create the database if it doesn't exist
- Start backend (on `6060`)
- Start frontend (on `3000`)

---

## 🔄 Reset Database

To reset (drop and recreate) your database:
```bash
reset-db.bat
```
This loads environment variables and recreates the database.

---

## ✅ Healthcheck
Backend exposes:
```
GET http://localhost:6060/healthcheck
```
To confirm the server is running.

---

## 🛑 Exit Script
To stop the running servers cleanly:
```bash
exit-app.bat
```

---

## 📁 Project Structure
```
icon-gallery/
├── server/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── socket.ts
│   ├── .env
│   └── ...
├── icon-gallery-react/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   ├── .env
│   └── ...
├── start-app.bat ✅
├── reset-db.bat ✅
├── exit-app.bat ✅
└── README.md 🚀
```

---

## 👏 Contributions
Rohith Satya Nivas Muchakarla

---

## 📄 License
MIT

---

