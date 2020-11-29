Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c start_front_end.bat"
oShell.Run strArgs, 0, false