<script setup>

import Chip from 'primevue/chip';
import 'vue3-carousel/dist/carousel.css'
import Carousel from 'primevue/carousel';


import { ref } from "vue";
import {useRuntimeConfig} from "nuxt/app";

let list = ref({});
let loading=ref(false)
let category=ref(null);
const baseUrl=useRuntimeConfig()

onMounted(async () => {
  loading.value=true;
  nextTick(async () => {
    const { data } = await useFetch("/list", {
      baseURL: baseUrl.public.url +"/api",
    });
    list.value = data.value.data;
    loading.value=false

    // token.value = data.value;
  });

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
  <main
    id="site__main"
    class="relative 2xl:ml-[--w-side] xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
  >
    <div class="2xl:max-w-[1220px] max-w-[1065px] mx-auto">
      <div class="page-heading">
        <h1 class="page-title">Featured</h1>

        <nav class="nav__underline">
          <ul
            uk-tab
            class="group"
            uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
          >
<!--            <li><a href="#"> Suggestions </a></li>-->
<!--            <li><a href="#"> Popular </a></li>-->
<!--            <li><a href="#"> My events </a></li>-->
          </ul>
        </nav>
      </div>

      <!-- event feautred -->

      <div class="sm:my-6 my-3 flex items-center justify-between md:mt-10">
        <div>
          <h2 class="text-xl font-semibold">Featured List</h2>
          <p class="font-normal text-sm text-gray-500 leading-6">
            Find a Featured items
          </p>
        </div>
        <a href="#" class="text-blue-500 sm:block hidden text-sm"> See all </a>
      </div>

      <!-- listing  slider -->
      <div class="mt-4" tabindex="-1" uk-slider="finite:true">
        <div class="uk-slider-container pb-1" >
          <ul class="uk-slider-items grid-small" v-if="!loading">
            <li
              v-for="(item, index) in list"
              :key="index"
              class="md:w-1/5 sm:w-1/3 w-1/2"
            >

              <a href="#">
                <div class="relative rounded-lg overflow-hidden">
                  <img
                    :src="baseUrl.public.url+ baseUrl.public.image_url + item.feature_image_url"
                    :alt="item.title"
                    class="h-36 w-full object-cover"
                  />
                  <div class="w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10">
                      <div class="flex space-x-2 text-xs pl-2 ">
                          <Chip v-for="sub in JSON.parse(item.sub_category_ids)"  :label="sub.name" class="bg-green-400 rounded p-1" />
                      </div>
                    <div class="text-white p-2">


                      <div class="text-sm font-light">
                        {{ item.title }}

                        <div class="text-2xs">
                            {{item.city.city_name}},
                            {{item.states.state_name}}
                        </div>
                      </div>
                      <div class="text-lg leading-3 mt-1.5">
                        {{ item.parent_category.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <div class="flex justify-center" v-else >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
          </div>
        </div>
        <!-- category title -->
        <div class="sm:my-6 my-3 flex items-center justify-between">
          <div>
            <h2 class="md:text-lg text-base font-semibold text-black"> Categories </h2>
            <p class="font-normal text-sm text-gray-500 leading-6"> Find a group by browsing top categories. </p>
          </div>
          <a href="#" class="text-blue-500 sm:block hidden text-sm"> See all </a>
        </div>

        <!-- group  slider -->
        <div tabindex="-1" uk-slider="finite:true">

          <div class="uk-slider-container pb-1">

            <ul class="uk-slider-items grid-small" v-if="!loading">
              <li v-for="(item,index) in category" :key="index" class="md:w-1/5 sm:w-1/3 w-1/2">
                <NuxtLink :to="'/category/'+item.sku">
                  <div class="relative rounded-lg overflow-hidden">
                    <img :src="baseUrl.public.url+ baseUrl.public.image_url + item.image_url" alt="" class="h-36 w-full object-cover">
                    <div class="w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10">
                      <div class="text-white p-5 text-lg leading-3"> {{item.name}} </div>
                    </div>
                  </div>
                </NuxtLink>
              </li>
            </ul>
            <div class="flex justify-center" v-else >
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
            </div>

          </div>

          <!-- slide nav icons -->
          <a class="nav-prev" href="#" uk-slider-item="previous"> <ion-icon name="chevron-back" class="text-2xl"></ion-icon> </a>
          <a class="nav-next" href="#" uk-slider-item="next"> <ion-icon name="chevron-forward" class="text-2xl"></ion-icon></a>

        </div>


        <!-- slide nav icons -->
        <a class="nav-prev" href="#" uk-slider-item="previous">
          <ion-icon name="chevron-back" class="text-2xl"></ion-icon>
        </a>
        <a class="nav-next" href="#" uk-slider-item="next">
          <ion-icon name="chevron-forward" class="text-2xl"></ion-icon
        ></a>
      </div>
    </div>
  </main>
</template>
