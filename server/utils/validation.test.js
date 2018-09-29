const expect=require("expect");
let {isRealString} = require("./validation")

describe("validate real String",()=>{


    it("validate when the data is empty",()=>{

        let data="";
        let value=isRealString(data)
        expect(value).toBe(false);
    })

    it("validate when the input is a number",()=>{

        let data=7;
        let value=isRealString(7);
        expect(value).toBe(false);
    })

    it("validate when the user enters a valid string",()=>{

        let data =" Hello great";
        let value=isRealString(data);
        expect(value).toBe(true);
    })
})