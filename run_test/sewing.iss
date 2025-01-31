; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "Sewing"
#define MyAppVersion "5.0"
#define MyAppPublisher "Qadez, Inc."
#define MyAppURL "http://www.qadez.com/"
#define MyAppExeName "sweing.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{91AAC9A1-2CC8-4516-BEEC-E77CC8266636}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName=E:\Sewing_App
DefaultGroupName={#MyAppName}
OutputDir=E:\elkady\run_test\result_exe
DisableProgramGroupPage=yes
OutputBaseFilename=sewing installer hidden 02
SetupIconFile=E:\elkady\run_test\iconfinder_sewing_machine_44917.ico
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
AlwaysRestart = yes 

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}";

[Files]
Source: "E:\elkady\run_test\sweing.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\invisable_start_apache_tomcat_mysql.vbs"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\invisable_start_front_end.vbs"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\start_apache_tomcat_mysql.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\start_front_end.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\design(10).blueprint3d"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\design(11).blueprint3d"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\design(7).blueprint3d"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\design(8).blueprint3d"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\design(9).blueprint3d"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\jlhttp-2.4.jar"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\sweing.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\elkady\run_test\apache-tomcat-9.0.8\*"; DestDir: "{app}\apache-tomcat-9.0.8"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "E:\elkady\run_test\build\*"; DestDir: "{app}\build"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "E:\elkady\run_test\jre1.8.0_221_x32\*"; DestDir: "{app}\jre1.8.0_221_x32"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "E:\elkady\run_test\Portable.Mysql.5.5.13-Very.Small\*"; DestDir: "{app}\Portable.Mysql.5.5.13-Very.Small"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "E:\elkady\run_test\Screen\*"; DestDir: "{app}\Screen"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{commonprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{commonstartup}\{#MyAppName}_tomcat_mysql"; Filename: "{app}\invisable_start_apache_tomcat_mysql.vbs"
Name: "{commonstartup}\{#MyAppName}_start_front_end"; Filename: "{app}\invisable_start_front_end.vbs"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: shellexec postinstall skipifsilent

