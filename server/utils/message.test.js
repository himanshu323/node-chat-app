

const expect=require("expect")

let {generateMessage,generateLocationMessage}=require("./message")


describe("Test the messages",()=>{


    it("test when the user sends a valid message",()=>{

        let from="Rohan";
        let text="Hello...how are you?";
       let message= generateMessage(from,text);

       expect(message).toMatchObject({
           from,text
       })
    })

    it("when user sends a location",()=>{

        let from="Himanshu";
        let lat=34;
        let long=45;
        let url =`https://www.google.com/maps?q=${lat},${long}`
        let res=generateLocationMessage(from,lat,long);
        expect(res).toMatchObject({from,url})
    })
})