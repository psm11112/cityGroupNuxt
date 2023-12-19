<script setup>

import "../public/assets/css/tailwind.css";
import "../public/assets/css/style.css";
import { ref } from "vue";
import {useRuntimeConfig} from "nuxt/app";

let category = ref({});
let loading=ref(false)
const baseUrl=useRuntimeConfig()

onMounted(async () => {
  console.log(baseUrl.public.url);
  loading.value=true;
  nextTick(async () => {


    const { data } = await useFetch("/category", {
      baseURL: baseUrl.public.url +"/api",
    });


    category.value = data.value.data;
    loading.value=false

    console.log(category.value);
    // token.value = data.value;
  });
});


</script>

<template>
  <div
    id="site__sidebar"
    class="fixed top-0 left-0 z-[99] pt-[--m-top] overflow-hidden transition-transform xl:duration-500 max-xl:w-full max-xl:-translate-x-full"
  >
    <!-- sidebar inner -->
    <div
      class="p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-64px)] relative z-30 max-lg:border-r dark:max-xl:!bg-slate-700 dark:border-slate-700"
    >
      <div class="pr-4" data-simplebar>
        <nav id="side">
          <ul>
            <li>
              <NuxtLink  to="/">
                <!--                  <img src="assets/images/icons/home.png" alt="feeds" class="w-6">-->
                <img
                  src="../public/assets/images/icons/home.png"
                  alt="feeds"
                  class="w-6"
                />
                <span> Home</span>
              </NuxtLink>
            </li>

          </ul>
        </nav>


        <nav
          id="side"
          class="font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800"
        >
          <div class="px-3 pb-2 text-sm font-medium">
            <div class="text-black dark:text-white">Category</div>
          </div>

          <ul class="mt-2 -space-y-2" uk-nav="multiple: true">
              <li v-for="(item,index) in category" :key="index">
                  <NuxtLink to="/df">
                    <img
                        :src="baseUrl.public.url+ '/public/storage/' + item.image_url"
                        :alt="item.name"
                        class="w-8 p-1 border-2 border-gray-500 rounded-full object-cover bg-white"/>
                    <span> {{item.name}} </span>
                  </NuxtLink>
              </li>
          </ul>
        </nav>


      </div>
    </div>

    <!-- sidebar overly -->
    <div
      id="site__sidebar__overly"
      class="absolute top-0 left-0 z-20 w-screen h-screen xl:hidden backdrop-blur-sm"
      uk-toggle="target: #site__sidebar ; cls :!-translate-x-0"
    ></div>
  </div>
</template>

<style scoped></style>
