@echo off
echo ========================================
echo NexusCare - Quick Start Script
echo ========================================
echo.

echo Checking prerequisites...
echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed!
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)
echo [OK] Python is installed

REM Check Node
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js is installed

REM Check MySQL
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] MySQL command not found in PATH
    echo Make sure MySQL is installed and running
)
echo [OK] MySQL check passed

echo.
echo ========================================
echo Starting NexusCare Application
echo ========================================
echo.

echo Step 1: Starting Backend Server...
echo.
start cmd /k "cd backend && venv\Scripts\activate && python app.py"
timeout /t 3 >nul

echo Step 2: Starting Frontend Server...
echo.
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo NexusCare is starting!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows will open:
echo 1. Backend server (Flask)
echo 2. Frontend server (React)
echo.
echo Press any key to exit this window...
pause >nul
