<script setup>
import "../public/assets/css/tailwind.css";
import "../public/assets/css/style.css";
import Chip from 'primevue/chip';

import { ref } from "vue";
import {useRuntimeConfig} from "nuxt/app";

let list = ref({});
let loading=ref(false)
const baseUrl=useRuntimeConfig()

onMounted(async () => {
  console.log(baseUrl.public.url);
  loading.value=true;
  nextTick(async () => {


    const { data } = await useFetch("/list", {
      baseURL: baseUrl.public.url +"/api",
    });

    list.value = data.value.data;
    loading.value=false

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
                    :src="
                     baseUrl.public.url+ '/public/storage/' + item.feature_image_url
                    "
                    :alt="item.title"
                    class="h-36 w-full object-cover"
                  />
                  <div
                    class="w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10"
                  >
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


        <!-- slide nav icons -->
        <a class="nav-prev" href="#" uk-slider-item="previous">
          <ion-icon name="chevron-back" class="text-2xl"></ion-icon>
        </a>
        <a class="nav-next" href="#" uk-slider-item="next">
          <ion-icon name="chevron-forward" class="text-2xl"></ion-icon
        ></a>
      </div>

<!--      <div-->
<!--        class="flex items-center justify-between text-black dark:text-white py-3 mt-6"-->
<!--      >-->
<!--        <h3 class="text-xl font-semibold">Upcomming Events</h3>-->
<!--        <a href="#" class="text-sm text-blue-500">See all</a>-->
<!--      </div>-->

<!--      &lt;!&ndash; event grid &ndash;&gt;-->
<!--      <div-->
<!--        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2.5 mt-4"-->
<!--      >-->
<!--        <div class="card">-->
<!--          <a href="timeline-event.html">-->
<!--            <div class="card-media h-32">-->
<!--              <img src="../public/assets/images/events/img-1.jpg" alt="" />-->
<!--              <div class="card-overly"></div>-->
<!--            </div>-->
<!--          </a>-->
<!--          <div class="card-body">-->
<!--            <p class="text-xs font-medium text-black text-red-600 mb-1">-->
<!--              WED JUL 10,2024 AT 10PM-->
<!--            </p>-->
<!--            <a href="timeline-event.html"-->
<!--              ><h4 class="card-title text-sm">The global creative</h4>-->
<!--            </a>-->
<!--            <a href="#"> <p class="card-text text-black mt-2">Japan</p> </a>-->
<!--            <div class="card-list-info text-xs mt-1">-->
<!--              <div>15 Intersted</div>-->
<!--              <div class="md:block hidden">·</div>-->
<!--              <div>2 Going</div>-->
<!--            </div>-->
<!--            <div class="flex gap-2">-->
<!--              <button type="button" class="button bg-primary text-white flex-1">-->
<!--                Intersted-->
<!--              </button>-->
<!--              <button type="button" class="button bg-secondery !w-auto">-->
<!--                <ion-icon name="arrow-redo" class="text-lg"></ion-icon>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="card">-->
<!--          <a href="timeline-event.html">-->
<!--            <div class="card-media h-32">-->
<!--              <img src="../public/assets/images/events/img-2.jpg" alt="" />-->
<!--              <div class="card-overly"></div>-->
<!--            </div>-->
<!--          </a>-->
<!--          <div class="card-body">-->
<!--            <p class="text-xs font-semibold text-teal-600 mb-1">Opening</p>-->
<!--            <a href="timeline-event.html"-->
<!--              ><h4 class="card-title text-sm">Wedding trend Ideas</h4>-->
<!--            </a>-->
<!--            <a href="#"> <p class="card-text text-black mt-2">Turkey</p></a>-->
<!--            <div class="card-list-info text-xs mt-1">-->
<!--              <div>20 Intersted</div>-->
<!--              <div class="md:block hidden">·</div>-->
<!--              <div>16 Going</div>-->
<!--            </div>-->
<!--            <div class="flex gap-2">-->
<!--              <button type="button" class="button bg-primary text-white flex-1">-->
<!--                Intersted-->
<!--              </button>-->
<!--              <button type="button" class="button bg-secondery !w-auto">-->
<!--                <ion-icon name="arrow-redo" class="text-lg"></ion-icon>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="card">-->
<!--          <a href="timeline-event.html">-->
<!--            <div class="card-media h-32">-->
<!--              &lt;!&ndash;                <img src="../assets/images/events/img-3.jpg" alt="">&ndash;&gt;-->
<!--              <img src="../public/assets/images/events/img-3.jpg" alt="" />-->
<!--              <div class="card-overly"></div>-->
<!--            </div>-->
<!--          </a>-->
<!--          <div class="card-body">-->
<!--            <p class="text-xs font-medium text-black text-red-600 mb-1">-->
<!--              WED JUL 10,2024 AT 10PM-->
<!--            </p>-->
<!--            <a href="timeline-event.html"-->
<!--              ><h4 class="card-title text-sm">About Safety and Flight</h4>-->
<!--            </a>-->
<!--            <a href="#"> <p class="card-text text-black mt-2">Dubai</p> </a>-->
<!--            <div class="card-list-info text-xs mt-1">-->
<!--              <div>26 Intersted</div>-->
<!--              <div class="md:block hidden">·</div>-->
<!--              <div>8 Going</div>-->
<!--            </div>-->
<!--            <div class="flex gap-2">-->
<!--              <button type="button" class="button bg-primary text-white flex-1">-->
<!--                Intersted-->
<!--              </button>-->
<!--              <button type="button" class="button bg-secondery !w-auto">-->
<!--                <ion-icon name="arrow-redo" class="text-lg"></ion-icon>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="card">-->
<!--          <a href="timeline-event.html">-->
<!--            <div class="card-media h-32">-->
<!--              <img src="../public/assets/images/events/img-4.jpg" alt="" />-->
<!--              <div class="card-overly"></div>-->
<!--            </div>-->
<!--          </a>-->
<!--          <div class="card-body">-->
<!--            <p class="text-xs font-semibold text-teal-600 mb-1">Opening</p>-->
<!--            <a href="timeline-event.html"-->
<!--              ><h4 class="card-title text-sm">Perspective is everything</h4>-->
<!--            </a>-->
<!--            <a href="#"> <p class="card-text text-black mt-2">London</p></a>-->
<!--            <div class="card-list-info text-xs mt-1">-->
<!--              <div>20 Intersted</div>-->
<!--              <div class="md:block hidden">·</div>-->
<!--              <div>16 Going</div>-->
<!--            </div>-->
<!--            <div class="flex gap-2">-->
<!--              <button type="button" class="button bg-primary text-white flex-1">-->
<!--                Intersted-->
<!--              </button>-->
<!--              <button type="button" class="button bg-secondery !w-auto">-->
<!--                <ion-icon name="arrow-redo" class="text-lg"></ion-icon>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </main>
</template>
