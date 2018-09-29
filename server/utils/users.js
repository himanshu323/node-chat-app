 class User{


    
    

    constructor(){
        this.users=[];
    }

    addUser(id,name,room){
        let user={id,name,room};
        this.users.push(user);
        return user;
    }

    getUser(id){
        let user=this.users.filter((user)=>user.id===id);
        return user[0];
    }

    removeUser(id){
        let user=this.getUser(id);

        this.users=this.users.filter((user)=> user.id !==id);

        return user;
    }

    getUserList(room){
       let users= this.users.filter((user)=>{
         return   user.room===room
        })
        return  users.map((user)=>user.name);
    }
}

module.exports={User}