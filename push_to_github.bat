@echo off
cd /d "%~dp0"
echo ========================================================
echo       MARVIS Website - Push and Auto-Deploy to GitHub
echo ========================================================
echo.

set /p commit_msg="Enter commit message (or press ENTER for 'Update website'): "
if "%commit_msg%"=="" set commit_msg=Update website content

echo.
echo [1/3] Staging all files...
git add .

echo [2/3] Committing changes...
git commit -m "%commit_msg%"

echo [3/3] Pushing changes to GitHub main branch...
git branch -M main
git push origin main

echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo  SUCCESS! Changes pushed to GitHub.
    echo  GitHub Actions is now automatically building & deploying!
    echo ========================================================
) else (
    echo [ERROR] Push failed. Make sure your GitHub remote is set up and you are logged in.
)

echo.
pause
