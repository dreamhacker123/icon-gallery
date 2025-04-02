@echo off
setlocal EnableDelayedExpansion

REM === Load backend env vars ===
for /f "tokens=1,2 delims==" %%A in (server\.env) do (
    set "%%A=%%B"
)

REM === Create DB if not exists ===
echo Checking if database '%DB_NAME%' exists...
mysql -u %DB_USERNAME% -p%DB_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS \`%DB_NAME%\`;"

REM === Start backend ===
echo Starting backend...
start cmd /k "cd server && npm start"

REM === Wait for backend to initialize (healthcheck) ===
echo Waiting for backend to be ready...
powershell -Command ^
    "$ErrorActionPreference='SilentlyContinue'; ^
    do { Start-Sleep -Seconds 2 } while ((Invoke-WebRequest -Uri http://localhost:%PORT%/healthcheck -UseBasicParsing).StatusCode -ne 200)"

REM === Load frontend env vars ===
for /f "tokens=1,2 delims==" %%A in (icon-gallery-react\.env) do (
    set "%%A=%%B"
)

REM === Start frontend ===
echo Starting frontend on port %PORT%...
start cmd /k "cd icon-gallery-react && set PORT=%PORT% && npm start"

endlocal
