export interface Register{
    firstName : string,
    lastName : string,
    email : string,
    password : string
}
export interface Login{
    userName : string,
    password : string
}
export interface User{
    firstName : string,
    lastName : string,
    jwt : string;

}