<script setup>
import {useAuthStores} from "../stores/useAuthStores";

const auth=useAuthStores();
async function logout(){
  await auth.logout();
}

</script>
<template>
  <button v-if="auth.isLoggedIn" @click="logout">Logout</button>
<h1>Check</h1>
  <div class="bg-teal-400/50" >{{auth.user}}</div>
</template>