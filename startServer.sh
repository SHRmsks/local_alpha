#!/bin/bash 
cd ./backend || exit
go get && go mod tidy
