@echo off 
setlocal enabledelayedexpansion 

echo ***** 原名称 replaced ||与小写replaced2 *****
set replaced=rxRnTemplate
set replaced2=rxrntemplate

echo ***** 新名称 all *****
set /p all='please entry project name':

echo ************************************************* 修改 package.json **************************************************
set file=%cd%\package.json
set "file=%file:"=%" 
for %%i in ("%file%") do set file=%%~fi

echo ***** 遍历，替换 *****
for /f "delims=" %%i in ('type "%file%"') do ( 
  set str=%%i 
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.txt 
)
move "%file%"_tmp.txt "%file%"


echo ************************************************* 修改 app.json **************************************************
set file=%cd%\app.json
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** 遍历，替换 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.txt
)
move "%file%"_tmp.txt "%file%"



echo ************************************************* 修改 AndroidManifest.xml **************************************************
set file=%~dp0android\app\src\main\AndroidManifest.xml
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** 遍历，替换 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced2%=%all%!"
  echo !str!>>"%file%"_tmp.txt
)
move "%file%"_tmp.txt "%file%"



echo ************************************************* 修改 strings.xml **************************************************
set file=%~dp0android\app\src\main\res\values\strings.xml
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** 遍历，替换 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.xml
)
move "%file%"_tmp.xml "%file%"


echo ************************************************* 修改 MainApplication.java **************************************************
set file=%~dp0android\app\src\main\java\com\rxrntemplate\MainApplication.java
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** 遍历，替换 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced2%=%all%!"
  echo !str!>>"%file%"_tmp.java
)
move "%file%"_tmp.java "%file%"


echo ************************************************* 修改 MainActivity.java **************************************************
set file=%~dp0android\app\src\main\java\com\rxrntemplate\MainActivity.java
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** 遍历，替换 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced2%=%all%!"
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.java
)
move "%file%"_tmp.java "%file%"


echo ************************************************* 修改 settings.gradle **************************************************
set file=%~dp0android\settings.gradle
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** 遍历，替换 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced%=%all%!"
  echo !str!>>"%file%"_tmp.gradle
)
move "%file%"_tmp.gradle "%file%"


echo ************************************************* 修改 build.gradle **************************************************
set file=%~dp0android\app\build.gradle
set "file=%file:"=%"
for %%i in ("%file%") do set file=%%~fi

echo ***** 遍历，替换 *****
for /f "delims=" %%i in ('type "%file%"') do (
  set str=%%i
  set "str=!str:%replaced2%=%all%!"
  echo !str!>>"%file%"_tmp.gradle
)
move "%file%"_tmp.gradle "%file%"



echo ************************************************* 修改包名 **************************************************
ren %~dp0android\app\src\main\java\com\rxrntemplate %all%
