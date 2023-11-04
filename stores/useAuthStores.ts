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

        console.log(loading);
        await useApiFetch("/sanctum/csrf-cookie",{})

        const login=await useApiFetch("/api/login",{
            method:'POST',
            body:credentials,
        })


       await  fetchUser()

           //  loading=false;

        navigateTo('/')
        return login
    }

    console.log(user.value)

    return {user,login,isLoggedIn,fetchUser,logout,setUser,loading}
})