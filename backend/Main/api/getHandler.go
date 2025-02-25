package api


import(
    "log"
)


type user struct{
    userName string 
    password string
    userID int64
}


func loginHandler(w http.ResponseWriter, r *http.Request){
    log.Println("login handler is called")


    w.Write([]byte("login handler"))
}
