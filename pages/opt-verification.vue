<script setup>
import {useAuthStores} from "../stores/useAuthStores";
import {ref} from "vue";

definePageMeta({
  layout: false,
})

const auth=useAuthStores();
const form=ref({
  email:auth.user.email,
  opt_number:''
})

async function codeVerifid(){
  console.log(form.value)
  const {data,error}=await auth.codeVerification(form.value);

  if(data.value !==null){
    console.log(data);
  }else{
    console.log(error)
  }



}

</script>

<template>
  <div>
    <div class="h-screen flex flex-col items-center justify-center  relative   w-full p-10 min-h-screen bg-white shadow-xl items-center pt-10 dark:bg-slate-900 z-10">
      <img src="../public/assets/images/opt-page.png" >
      <div class="text-4xl dark:text-white">Enter Your Verification Code</div>
      <div class="flex space-x-5 p-5">
      <div><input type="text" v-model="form.opt_number" class="items-center justify-center !w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5" ></div>

      </div>
      <button @click.prevent="codeVerifid" class="p-2 bg-blue-400/50 rounded-lg text-white">
        Code Verification
      </button>
    </div>


  </div>

</template>