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
  {{auth.user}}
</template>