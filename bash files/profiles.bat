@REM ECHO OFF
@REM @REM SetLocal DisableDelayedExpansion

@REM SET link=https://www.youtube.com/
@REM Set "SearchString=.lnk"

@REM @REM START profile %link%

@REM for %%A in (*) do (
@REM     SET "name= %%~nxA"
@REM     @REM SetLocal EnableDelayedExpansion
@REM     @REM If /I Not "%%~nxA"=="!~nxA:%SearchString%=!" (
@REM     @REM @REM     @REM START %%~nxA %link%
@REM     @REM     echo %%~nxA %link%
@REM     @REM ) ELSE ( echo "no")
@REM     @REM EndLocal
@REM     @REM echo %%~nxA

@REM     if %%~nxA==".lnk" ( echo "wow") else echo "wooo"
@REM     if not x%~nxA:.lnk=%==x%~nxA% echo It contains bcd
@REM )

@REM @REM @Echo Off
@REM @REM SetLocal DisableDelayedExpansion

@REM @REM Set "StringA=Aba D25 C9.8 V23"
@REM @REM Set "SearchString=9.7"

@REM @REM SetLocal EnableDelayedExpansion
@REM @REM If /I Not "%StringA%"=="!StringA:%SearchString%=!" (Echo Yes) Else Echo No
@REM @REM EndLocal


setlocal enableextensions 
setlocal enabledelayedexpansion
@echo off
set str1=%1
if not x%str1:bcd=%==x%str1% echo It contains bcd
endlocal
