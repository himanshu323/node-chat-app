const expect=require("expect")

let {generateMessage}=require("./message")


describe("Test the messages",()=>{


    it("test when the user sends a valid message",()=>{

        let from="Rohan";
        let text="Hello...how are you?";
       let message= generateMessage(from,text);

       expect(message).toMatchObject({
           from,text
       })
    })
})