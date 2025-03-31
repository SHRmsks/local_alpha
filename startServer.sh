#!/bin/bash 
cd ./backend || exit
go get && go mod tidy
GO_PID=$!

echo $GO_PID > serverPID.txt
