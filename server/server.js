const express=require("express");
const socketio=require("socketio");
const path=require("path");

let app=new express();

let port=process.env.PORT || 3002;

let conPath=path.join(__dirname,"..","public")

console.log(__dirname +"/../public");

app.use(express.static(conPath))




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
