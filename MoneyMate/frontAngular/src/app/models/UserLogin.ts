export class UserLogin{
    username:string
    password:string
    userToken:string = ""
    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
}