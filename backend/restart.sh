#!/bin/bash

if [ -f serverPID.txt ]; then 
    PID=$(cat serverPID.txt)
    echo "Killing server with PID: $PID"
    kill -s SIGINT $PID
else
    echo "No server to kill"
fi