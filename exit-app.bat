@echo off
echo Stopping Node.js processes...

:: Kill backend server (typically listening on node)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :6060') do taskkill /F /PID %%a

:: Kill frontend dev server (typically on port 3000)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /F /PID %%a

echo ✅ All relevant processes stopped.
pause
