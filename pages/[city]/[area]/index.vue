<template>
  <main id="site__main" class="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">

    <div class="flex max-lg:flex-col 2xl:gap-12 gap-10 2xl:max-w-[1220px] max-w-[1065px] mx-auto" id="js-oversized">

      <h1>{{ $route.params.city}}</h1>
      <h1>{{ $route.params.area}}</h1>

    </div>

  </main>
</template>