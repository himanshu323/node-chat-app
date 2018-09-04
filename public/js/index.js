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

    let formattedTime = moment(message.createdAt).format("h:mm a");
    console.log("New Message",message);
    let template=$("#message-template").html()
    let html = Mustache.render(template, {
        from: message.from,
        createdAt:formattedTime,
        text:message.text
    });
    // let li= jQuery("<li></li>");
    // li.text(`${message.from}:${formattedTime} ${message.text}`);

 jQuery("#messages").append(html);

})

let locationButton=jQuery("#send-location");
locationButton.on("click",function () {
    if(!navigator.geolocation){
        alert("Not supported for this browser");
    }

    locationButton.prop("disabled", true).text("sending location...");
    navigator.geolocation.getCurrentPosition((position)=>{
        locationButton.prop("disabled",false).text("Send Location");
        socket.emit("createLocationMessage",{
            from:"Admin",
            latitude:position.coords.latitude,
            longitude:position.coords.longitude

        })
    },(error)=>{
        alert("Unable to fetch location")
        locationButton.prop("disabled", false).text("Send Location");;
    })
})

socket.on("newLocationMessage",(message)=>{

    //let formattedTime = moment(message.createdAt).format("h:mm a");

    let formattedTime = moment(message.createdAt).format("h:mm a");
    console.log("New Message", message);
    let template = $("#location-message-template").html()
    console.log("UELLLLLL",message.url)
    let html = Mustache.render(template, {
        from: message.from,
        url:message.url,
        createdAt: formattedTime,
       
    });

    // let li=jQuery("<li></li>");

    // let a=jQuery("<a target=\"_blank\">My current location</a>")

    // li.text(`${message.from}:${formattedTime} `)

    // a.attr("href",message.url)

    // li.append(a)

    jQuery("#messages").append(html);
})

// socket.emit("createEmail",{
//     text:"New one",
//     to:"hello@abc.com"
// })

// socket.emit("createMessage",{
//     text:"New Message",
//     to:"Social Group"
// })

// socket.emit("createMessage",{
//     text:"HNice to"
//     ,from:"TestUser"
// },(message)=>{
//     console.log("Got it",message)
// })

let messageBox = $("[name='message']");
$("#message-form").on("submit",function (e) {
    e.preventDefault();
    socket.emit("createMessage",{
        from:"Himanshu",
        text:messageBox.val()
    },()=>{
messageBox.val('');
    })
})