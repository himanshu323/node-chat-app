let {User}=require("./users");

const expect=require("expect");

describe("Test the user class",()=>{

    let users;
beforeEach(()=>{
 users=new User();
 users.users=[{
     id:"1",
     name:"John",
     room:"Angular Course"
 },{
         id: "2",
         name: "Mike",
         room: "Node Course"
 },{
         id: "3",
         name: "Andrew",
         room: "Angular Course"
 }]


})
    it("adds a valid user",()=>{

        let user={id:"4",name:"Jazzy",room:"Node course"};
        let res=users.addUser(user.id,user.name,user.room);
        
        
        expect(res).toEqual(user); 
    })

    it("should find a user",()=>{

        let user=users.getUser("1");
        console.log("**",user);
        expect(user).toEqual(users.users[0]);
    })

    it("should not find a user",()=>{

        let user=users.getUser("98098");
        expect(user).toBeFalsy();
    })

    it("should remove a user",()=>{

       let user= users.removeUser("2")
       expect(user.id).toBe("2");
       expect(users.users.length).toBe(2)
    })


    it("should not remove a user",()=>{

       let user= users.removeUser("9");
       expect(user).toBeFalsy();
       expect(users.users.length).toBe(3);
    })


    it("should return room list",()=>{

        let userValue=users.getUserList(users.users[0].room);
        expect(userValue.length).toBe(2);
        expect(userValue).toEqual(["John","Andrew"])
    })
})