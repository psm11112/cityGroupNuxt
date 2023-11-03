import {useAuthStores} from "~/stores/useAuthStores";
import {useLocalStorage} from "@vueuse/core";


export default defineNuxtPlugin(async(nuxtApp) => {

    const auth=useAuthStores();


    const user=useLocalStorage('user',[],[])
    if(user){
        // @ts-ignore
        auth.setUser(user.value)
    }



})
