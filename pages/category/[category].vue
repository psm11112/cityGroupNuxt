<script setup>
import { ref,onMounted } from "vue";
import {useRuntimeConfig} from "nuxt/app";
import Dropdown from 'primevue/dropdown';

const categoryName=ref(null);
const list=ref(null);
const baseUrl=useRuntimeConfig()
const country=ref('');
let country_id=ref('');
let categoryId=ref('');
let stataList=ref('');
let stats_id=ref('');
let cityList=ref('');
let city_id=ref('');
let loading=ref(false);


const route = useRoute();

onMounted(async () => {
 // loading.value=true;


    const { data } = await useFetch("/category/"+route.params.category, {
      baseURL: baseUrl.public.url +"/api",
    });
  //

   categoryName.value = data.value.name;
   categoryId.value=data.value.id;
   getList(data.value.id);
   getCountry();

});


async function getList(id){
  const { data } = await useFetch("/list/"+id, {
    baseURL: baseUrl.public.url +"/api",
  });
   list.value=data.value
}

async function getCountry(){
  const { data } = await useFetch("/country", {
    baseURL: baseUrl.public.url +"/api",
  });


  country.value=data.value
}

async function getListByCountry(filed){
  console.log("Field:"+filed);
  let value='';
  if(filed==="country_id"){
     value=country_id.value
  }
  if(filed==="state_id"){
     value=stats_id.value
  }
  if(filed==="city_id"){
    value=city_id.value
  }

  console.log("value:-"+value);

  const { data } = await useFetch("/list/search/"+ categoryId.value+"/"+filed+"/"+value, {
    baseURL: baseUrl.public.url +"/api",
  });
  list.value=data.value
  getStats(country_id.value);
  getCity(stats_id.value);

}

async function getStats(id){

  loading=true;
  // /stats/{country_id}
  const { data } = await useFetch("/stats/"+id , {
    baseURL: baseUrl.public.url +"/api",
  });
  stataList.value=data.value
  loading=false;

}


async function getCity(statsId){

  loading=true;
  const { data } = await useFetch("/city/"+statsId , {
    baseURL: baseUrl.public.url +"/api",
  });
  cityList.value=data.value
  loading=false;

}


</script>
<template>
  <main id="site__main" class="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">

    <div class="flex max-lg:flex-col 2xl:gap-12 gap-10 2xl:max-w-[1220px] max-w-[1065px] mx-auto" id="js-oversized">

      <div class="flex-1">

        <div class="max-w-[680px] w-full mx-auto">

          <div class="page-heading p-2  lg:block md:p-1 lg:p-1 flex justify-between">
          <div>
            <h1 class="page-title"> {{categoryName}}
            {{loading}}
            </h1>
          </div>
            <div class=" lg:hidden  bg-green-400 rounded-full p-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M234.29 47.91A20 20 0 0 0 216 36H40a20 20 0 0 0-14.8 33.45l.12.14L92 140.75V216a20 20 0 0 0 31.1 16.64l32-21.33a20 20 0 0 0 8.9-16.65v-53.91l66.67-71.16l.12-.14a20 20 0 0 0 3.5-21.54Zm-88.88 77.58a19.93 19.93 0 0 0-5.41 13.68v53.35l-24 16v-69.35a19.93 19.93 0 0 0-5.41-13.68L49.23 60h157.54Z"></path></svg>
            </div>


          </div>

          <!-- page feautred -->


          <div  class="mt-10">

            <!-- pages card layout 1 -->

            <div v-if="list" class="grid sm:grid-cols-3 grid-cols-2 gap-3" uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true">



              <div v-for="(item,index) in list.data" :key="index" class="card">

                <a href="timeline-page.html">
                  <div class="card-media sm:aspect-[2/1.7] h-40">

                    <img v-if="item.feature_image_url" :src="baseUrl.public.url+ baseUrl.public.image_url+ item.feature_image_url" :alt="item.title">

                    <img v-else src="../../public/assets/images/full_item_feature_image.webp">

                    <div class="card-overly"></div>
                  </div>
                </a>

                <div class="card-body p-2">
                  <a href="timeline-page.html"> <span class="font-bold  text-green-600"> {{item.title}}</span>  </a>
                  <div class="w-full p-1">
                    <p class="card-text">{{item.address}}
                     {{item.area.area_name}},{{item.city.city_name}}<br>
                     {{item.states.state_name}}  {{item.post_code}}
                    </p>
                  </div>

                  <div class="flex space-x-1 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20ZM79.57 196.57a60 60 0 0 1 96.86 0a83.72 83.72 0 0 1-96.86 0ZM100 120a28 28 0 1 1 28 28a28 28 0 0 1-28-28Zm94 59.94a83.48 83.48 0 0 0-29-23.42a52 52 0 1 0-74 0a83.48 83.48 0 0 0-29 23.42a84 84 0 1 1 131.9 0Z"></path></svg>
                    <span v-if="item.user">{{item.user.name}}</span>
                  </div>
                  <div class="text-xs pl-5">{{item.createdAtHumansReadable}}</div>
                   <button type="button" class="button bg-primary text-white">Follow</button>
                </div>
              </div>

              <!-- load more -->
              <div class="flex justify-center my-6 lg:col-span-3 col-span-2">
                <button type="button" class="bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-dark2">Load more...</button>
              </div>
            </div>

          </div>

        </div>


      </div>

      <!-- sidebar -->
      <div class="2xl:w-[380px] lg:w-[330px] w-full">

        <div  class="lg:space-y-8 space-y-10 lg:pb-1 max-lg:grid sm:grid-cols-2 max-lg:gap-6 pt-24"
              uk-sticky="media: 1024; end: #js-oversized; offset: 80">

          <div class="box p-5 px-6 ">

            <div class="flex items-baseline justify-between text-black dark:text-white">
              <h3 class="font-bold text-base"> Total Results Found: 1 Results </h3>

            </div>

            <div class="side-list">

              <div class="flex items-center p-1">Filter by</div>

              <div v-if="country" class="side-list-item">


                <Dropdown v-model="country_id" :options="country" filter optionLabel="name" option-value="id" placeholder="Select a Country"
                          class="w-full md:w-14rem"

                          :pt="{
                                root:{class: 'backGrounAndText'},
                                list: { class: 'backGrounAndText p-4 w-full' },
                                filterInput:{class:'backGrounAndText p-2 w-full'},
                                input:{class:'input w-full'},
                                header:{class:'backGrounAndText p-2 w-full'},
                                filterContainer:{class:'backGrounAndText p-2 w-full'},
                                 }"
                          @change="getListByCountry('country_id')">


                </Dropdown>



              </div>
              <div class="side-list-item">
                <Dropdown v-model="stats_id" :options="stataList" filter optionLabel="state_name" option-value="id" placeholder="Select a State"
                          class="w-full md:w-14rem"
                          @change="getListByCountry('state_id')"
                          :loading=loading
                          :pt="{
                                root:{class: 'backGrounAndText'},
                                list: { class: 'backGrounAndText p-4 w-full' },
                                filterInput:{class:'backGrounAndText p-2 w-full'},
                                input:{class:'input w-full'},
                                header:{class:'backGrounAndText p-2 w-full'},
                                filterContainer:{class:'backGrounAndText p-2 w-full'},
                                 }"


                >


                </Dropdown>
              </div>
              <div class="side-list-item">
                <Dropdown v-model="city_id" :options="cityList" filter optionLabel="city_name" option-value="id" placeholder="Select a City"
                          class="w-full md:w-14rem"
                          @change="getListByCountry('city_id')"
                          :loading=loading
                          :pt="{
                                root:{class: 'backGrounAndText'},
                                list: { class: 'backGrounAndText p-4 w-full' },
                                filterInput:{class:'backGrounAndText p-2 w-full'},
                                input:{class:'input w-full'},
                                header:{class:'backGrounAndText p-2 w-full'},
                                filterContainer:{class:'backGrounAndText p-2 w-full'},
                                 }"


                >


                </Dropdown>
              </div>



            </div>

          </div>

        </div>

      </div>
    </div>
  </main>
</template>