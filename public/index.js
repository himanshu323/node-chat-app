let socket= io(); 



socket.on("connect",()=>{
    console.log("Connected to server");
})

socket.on("disconnect",()=>{

    console.log("Server is disconnected");
})

// socket.on("newEmail",(email)=>{
//     console.log("New Email",email);
// })

socket.on("newMessage",(message)=>{
    console.log("New Message",message);
})

// socket.emit("createEmail",{
//     text:"New one",
//     to:"hello@abc.com"
// })

// socket.emit("createMessage",{
//     text:"New Message",
//     to:"Social Group"
// })