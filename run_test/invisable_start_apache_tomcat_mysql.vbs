Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c start_apache_tomcat_mysql.bat"
oShell.Run strArgs, 0, false