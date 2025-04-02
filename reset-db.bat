@echo off
REM Load environment variables from .env
for /f "usebackq tokens=1,2 delims==" %%A in (".env") do (
    set "%%A=%%B"
)

echo Dropping and recreating database "%DB_NAME%"...

REM Execute MySQL commands
mysql -u %DB_USERNAME% -p%DB_PASSWORD% -e "DROP DATABASE IF EXISTS %DB_NAME%; CREATE DATABASE %DB_NAME%;"

echo ✅ Database reset completed!
pause
