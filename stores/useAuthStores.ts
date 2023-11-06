import {defineStore} from "pinia";
import {useApiFetch} from "~/composables/useApiFetch";
import {useLocalStorage} from "@vueuse/core/index";
type User={
    id:string,
    name:string,
    email:string
}

type Credentials={
    email:string,
    password:string
}
type Register={
    name:string,
    email:string,
    password:string,
    password_confirmation:string
}
type condeVerification={
    email:string,
    opt_number:string
}

export const  useAuthStores =defineStore('auth',()=>{
    const user=ref<User |null>(null)
    let loading=<boolean>(false)


    const isLoggedIn=computed(()=>!!user.value)

    // @ts-ignore
    async function setUser(data) {
        console.log("lop");

        user.value=data
        console.log(user);
    }

    async function logout(){
        await useApiFetch("/api/logout",{method:"POST"});
        user.value=null;

        console.log(user.value);
        console.log(isLoggedIn);

        localStorage.removeItem('user')


        navigateTo('/')
    }
    async function fetchUser(){
        loading=true;
        const {data}=await useApiFetch("/api/user",{})

        useLocalStorage('user',JSON.stringify(data.value))
        user.value=data.value as User;
        loading=false;

    }
    async function login(credentials:Credentials){
        loading=true;
        await useApiFetch("/sanctum/csrf-cookie",{})
        const login=await useApiFetch("/api/login",{
            method:'POST',
            body:credentials,
        })
       await  fetchUser()
        return login
    }


    async function register(data:Register){
        const register=await useApiFetch("/api/register",{
            method:'POST',
            body:data,
        })

        return register
    }

    async function codeVerification(data:condeVerification){
        const codeVerification=await useApiFetch("/api/opt_verification",{
            method:'POST',
            body:data,
        })

        return codeVerification
    }






    return {user,login,isLoggedIn,fetchUser,logout,setUser,loading,register,codeVerification}
})