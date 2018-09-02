const express=require("express");
const socketIO=require("socket.io");
const path=require("path");
const http=require("http");

let {generateMessage}=require("./utils/message");

let app=new express();

let port=process.env.PORT || 3002;

let conPath=path.join(__dirname,"..","public")

let server=http.createServer(app)

let io= socketIO(server);



app.use(express.static(conPath))



io.on("connection",(socket)=>{
    console.log("User connected");

    socket.emit("newMessage",generateMessage("Admin","Welcome to Chat Group"))

    socket.broadcast.emit("newMessage",generateMessage("Admin","New User Joined"))

    socket.on("disconnect",()=>{
        console.log("user is disconnected");
    })

   

    // socket.emit("newMessage",{
    //     from:"FriendsGroup",
    //     text:"Hi ..cmng there",
    //     createdAt:9898
    // })
    
    // socket.on("createEmail",(email)=>{
    //     console.log("Create mail",email);
    // })

    socket.on("createMessage",(message)=>{
        io.emit("newMessage",generateMessage(message.from,message.text))
    })
})




server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
