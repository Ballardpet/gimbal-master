@echo off

echo Installing gimbal-vite dependencies...
cd gimbal-vite
call npm install
cd ..

echo Installing gimbal-server dependencies...
cd gimbal-server
call npm install
cd ..

echo.
echo ==================================================
echo Dump1090 requires a one-time setup.
echo Open Dump1090\setup.exe and complete installation.
echo ==================================================
pause