<script setup>
import { useAuthStores } from "../stores/useAuthStores";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import {useLocalStorage} from "@vueuse/core/index";

definePageMeta({
  layout: false,
});
const form = ref({
  email: "",
  password: "",
});

const loading = ref(false);
const toast = useToast();
const errorMessage = ref("");

watch(loading, (newUsername) => {
  console.log("heelo");
  // Do something with the updated value.
});
const auth = useAuthStores();

async function login() {
  console.log(form.value);
  // loading.value = true;
  const { data, error } = await auth.login(form.value);

  console.log(data.value);
  if(data.value!==null){

    localStorage.setItem('user',JSON.stringify(data.value.data))
   // useLocalStorage('user',JSON.stringify(data.value.data))
    auth.setUser(data.value.data)
    toast.success('User Successfully Login')
    navigateTo('/')
  }else{




    if (error.value.data.message.errors) {
      errorMessage.value = error.value.data.message.error.email[0];
    } else {
      errorMessage.value = error.value.data.message;
    }

  }


  // // toast.success('User Successfully Login')
  // loading.value = false;
}
</script>
<template>
  <div class="sm:flex">
    <div
      class="relative lg:w-[580px] md:w-96 w-full p-10 min-h-screen bg-white shadow-xl flex items-center pt-10 dark:bg-slate-900 z-10"
    >
      <div
        class="w-full lg:max-w-sm mx-auto space-y-10"
        uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
      >
        <!-- logo image-->
        <a href="#">
          <img
            src="../public/assets/images/logo.png"
            class="w-28 absolute top-10 left-10 dark:hidden"
            alt=""
        /></a>
        <a href="#">
          <img
            src="../public/assets/images/logo-light.png"
            class="w-28 absolute top-10 left-10 hidden dark:!block"
            alt=""
        /></a>

        <!-- logo icon optional -->
        <div class="hidden">
          <img
            class="w-12"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
            alt="Socialite html template"
          />
        </div>

        <!-- title -->
        <div>
          <h2 class="text-2xl font-semibold mb-1.5">Sign in to your account</h2>
          <p class="text-sm text-gray-700 font-normal">
            If you haven’t signed up yet.
            <a href="form-register.html" class="text-blue-700"
              >Register here!</a
            >
          </p>
        </div>
        <ErrorMessage
          v-auto-animate
          :errorMessage="errorMessage"
        ></ErrorMessage>

        <!-- form -->
        <form
          method="#"
          action="#"
          class="space-y-7 text-sm text-black font-medium dark:text-white"
          uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
        >
          <!-- email -->
          <div>
            <label for="email" class="">Email address</label>
            <div class="mt-2.5">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autofocus=""
                placeholder="Email"
                required=""
                class="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                :readonly="loading"
              />
            </div>
          </div>
          <!-- password -->
          <div>
            <label for="email" class="">Password</label>
            <div class="mt-2.5">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                class="!w-full !rounded-lg !bg-transparent !shadow-sm !border-slate-200 dark:!border-slate-800 dark:!bg-white/5"
                :readonly="loading"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <input id="rememberme" name="rememberme" type="checkbox" />
              <label for="rememberme" class="font-normal">Remember me</label>
            </div>
            <a href="#" class="text-blue-700">Forgot password </a>
          </div>

          <!-- submit button -->
          <div>
            <button
              @click.prevent="login"
              class="button bg-primary text-white w-full"
            >
              <span v-if="!loading">Sign in</span>
              <svg
                v-else
                class="text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <g>
                  <circle cx="3" cy="12" r="2" fill="#FFFFFF"></circle>
                  <circle cx="21" cy="12" r="2" fill="#FFFFFF"></circle>
                  <circle cx="12" cy="21" r="2" fill="#FFFFFF	"></circle>
                  <circle cx="12" cy="3" r="2" fill="#FFFFFF"></circle>
                  <circle cx="5.64" cy="5.64" r="2" fill="#FFFFFF"></circle>
                  <circle cx="18.36" cy="18.36" r="2" fill="#FFFFFF"></circle>
                  <circle cx="5.64" cy="18.36" r="2" fill="#FFFFFF"></circle>
                  <circle cx="18.36" cy="5.64" r="2" fill="#FFFFFF"></circle>
                  <animateTransform
                    attributeName="transform"
                    dur="1.5s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  ></animateTransform>
                </g>
              </svg>
            </button>
          </div>

          <div class="text-center flex items-center gap-6">
            <hr class="flex-1 border-slate-200 dark:border-slate-800" />
            Or continue with
            <hr class="flex-1 border-slate-200 dark:border-slate-800" />
          </div>

          <!-- social login -->
          <div
            class="flex gap-2"
            uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 400 ;repeat: true"
          >
            <a
              href="#"
              class="button flex-1 flex items-center gap-2 bg-primary text-white text-sm"
            >
              <ion-icon name="logo-facebook" class="text-lg"></ion-icon>
              facebook
            </a>
            <a
              href="#"
              class="button flex-1 flex items-center gap-2 bg-sky-600 text-white text-sm"
            >
              <ion-icon name="logo-twitter"></ion-icon> twitter
            </a>
            <a
              href="#"
              class="button flex-1 flex items-center gap-2 bg-black text-white text-sm"
            >
              <ion-icon name="logo-github"></ion-icon> github
            </a>
          </div>
        </form>
      </div>
    </div>

    <!-- image slider -->
    <div class="flex-1 relative bg-primary max-md:hidden">
      <div
        class="relative w-full h-full"
        tabindex="-1"
        uk-slideshow="animation: slide; autoplay: true"
      >
        <ul class="uk-slideshow-items w-full h-full">
          <li class="w-full">
            <img
              src="../public/assets/images/post/img-3.jpg"
              alt=""
              class="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
            />
            <div
              class="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10"
            >
              <div
                class="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
              >
                <img
                  class="w-12"
                  src="../public/assets/images/logo-icon.png"
                  alt="Socialite html template"
                />
                <h4
                  class="!text-white text-2xl font-semibold mt-7"
                  uk-slideshow-parallax="y: 600,0,0"
                >
                  Connect With Friends
                </h4>
                <p
                  class="!text-white text-lg mt-7 leading-8"
                  uk-slideshow-parallax="y: 800,0,0;"
                >
                  This phrase is more casual and playful. It suggests that you
                  are keeping your friends updated on what’s happening in your
                  life.
                </p>
              </div>
            </div>
            <div
              class="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"
            ></div>
          </li>
          <li class="w-full">
            <img
              src="../public/assets/images/post/img-2.jpg"
              alt=""
              class="w-full h-full object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"
            />
            <div
              class="absolute bottom-0 w-full uk-tr ansition-slide-bottom-small z-10"
            >
              <div
                class="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative"
                uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
              >
                <img
                  class="w-12"
                  src="../public/assets/images/logo-icon.png"
                  alt="Socialite html template"
                />
                <h4
                  class="!text-white text-2xl font-semibold mt-7"
                  uk-slideshow-parallax="y: 800,0,0"
                >
                  Connect With Friends
                </h4>
                <p
                  class="!text-white text-lg mt-7 leading-8"
                  uk-slideshow-parallax="y: 800,0,0;"
                >
                  This phrase is more casual and playful. It suggests that you
                  are keeping your friends updated on what’s happening in your
                  life.
                </p>
              </div>
            </div>
            <div
              class="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"
            ></div>
          </li>
        </ul>

        <!-- slide nav -->
        <div class="flex justify-center">
          <ul
            class="inline-flex flex-wrap justify-center absolute bottom-8 gap-1.5 uk-dotnav uk-slideshow-nav"
          ></ul>
        </div>
      </div>
    </div>
  </div>
</template>
