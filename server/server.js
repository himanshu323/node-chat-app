const express=require("express");
const socketIO=require("socket.io");
const path=require("path");
const http=require("http");
const moment=require("moment");

let {isRealString}=require("./utils/validation")
let {User}=require("./utils/users");

let {generateMessage,generateLocationMessage}=require("./utils/message");

let app=new express();

let port=process.env.PORT || 3002;

let conPath=path.join(__dirname,"..","public")

let server=http.createServer(app)

let io= socketIO(server);



let users=new User();

app.use(express.static(conPath))



io.on("connection",(socket)=>{
    console.log("User connected");



    //socket.emit("newMessage",generateMessage("Admin","Welcome to Chat Group"))

    //socket.broadcast.emit("newMessage",generateMessage("Admin","New User Joined"))

    socket.on("join",(message,callback)=>{

       if( !(isRealString(message.name) && isRealString(message.room))){
           callback("Name and group name required");
       }

       socket.join(message.room);
       socket.broadcast.to(message.room).emit("newMessage",generateMessage("Admin",`${message.name} Joined`));
   
        socket.emit("newMessage", generateMessage("Admin", "Welcome to Chat Group"));

       users.removeUser(socket.id);
       users.addUser(socket.id,message.name,message.room);

       io.to(message.room).emit("updateUserList",users.getUserList(message.room));

        callback()
    })

    socket.on("disconnect",()=>{
        console.log("user is disconnected");

        let user=users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`));
            io.to(user.room).emit("updateUserList",users.getUserList(user.room));
        }
    })

    socket.on("createLocationMessage",(message)=>{
        let user = users.getUser(socket.id);
        
        
        if(user){
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, message.latitude, message.longitude))
        }
       
    })
   

    // socket.emit("newMessage",{
    //     from:"FriendsGroup",
    //     text:"Hi ..cmng there",
    //     createdAt:9898
    // })
    
    // socket.on("createEmail",(email)=>{
    //     console.log("Create mail",email);
    // })

    socket.on("createMessage",(message,callback)=>{
       let user=users.getUser(socket.id);
       if(user && isRealString(message.text)){
           io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
       }
        
        callback();

    })
})




server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
