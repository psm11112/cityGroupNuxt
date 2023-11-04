import {useAuthStores} from "~/stores/useAuthStores";
import {useLocalStorage} from "@vueuse/core";


export default defineNuxtPlugin(async(nuxtApp) => {

    const auth=useAuthStores();
    const user=useLocalStorage('user',null,[])

    if(user.value){
        // @ts-ignore

        auth.setUser(JSON.parse(user.value))


    }




})
