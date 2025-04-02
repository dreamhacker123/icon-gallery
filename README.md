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
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=icon_gallery
PORT=6060
```

#### Frontend `.env` (in `/icon-gallery-react`):
```env
REACT_APP_API_BASE_URL=http://localhost:6060
PORT=3000
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

> Made with ❤️ by Rohit & ChatGPT

