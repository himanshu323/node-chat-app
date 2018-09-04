const moment=require("moment")

let generateMessage=(from,text)=>{

    return {
        from,text, createdAt:moment().valueOf()
        //new Date().getTime()
    }
}

let generateLocationMessage=(from,lat,long)=>{

    return{
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt:moment().valueOf()
    }
}
module.exports={
    generateMessage,generateLocationMessage
}