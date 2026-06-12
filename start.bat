@echo off

echo Starting gimbal-vite...
start "gimbal-vite" cmd /k "cd /d gimbal-vite && npm run dev"

echo Starting gimbal-server...
start "gimbal-server" cmd /k "cd /d gimbal-server\src && node server.js"

echo Starting Dump1090...
start "Dump1090" cmd /k "cd /d Dump1090 && .\dump1090.exe --interactive --net"

REM Give the servers a few seconds to start
timeout /t 5 /nobreak >nul

echo Opening browser tabs...
start "" "http://localhost:8080/"
start "" "http://localhost:5173/"

echo.
echo Frontend: http://localhost:5173/
echo ADS-B Map: http://localhost:8080/