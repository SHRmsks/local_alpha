#!/bin/bash 
cd ./backend || exit
go get && go mod tidy
go run main.go &
GO_PID=$!

echo $GO_PID > serverPID.txt
