title 8081
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8080') DO TaskKill.exe /PID %%P /T /F
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8005') DO TaskKill.exe /PID %%P /T /F
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8009') DO TaskKill.exe /PID %%P /T /F
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8443') DO TaskKill.exe /PID %%P /T /F

%cd%
del "%~dp0\apache-tomcat-9.0.8\logs\*.*" /q
del "%~dp0\apache-tomcat-9.0.8\conf\Catalina\*.*" /q
del "%~dp0\apache-tomcat-9.0.8\webapps\SewingLastISA\*.*" /q

rd /q /s "%~dp0\apache-tomcat-9.0.8\webapps\SewingLastISA"
rd /q /s "%~dp0\apache-tomcat-9.0.8\conf\Catalina"


cd "%~dp0\Portable.Mysql.5.5.13-Very.Small\"
start.exe

%cd%

set "JAVA_HOME=%~dp0jre1.8.0_221_x32\"
cd "%~dp0\apache-tomcat-9.0.8\bin\"
catalina.bat run
pause
