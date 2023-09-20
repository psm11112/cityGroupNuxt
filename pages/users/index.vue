<template>
  <div>
    <div class="p-5">
      <input
        type="text"
        class="bg-slate-100 rounded border-gray-200"
        v-model.lazy="search"
        @keyup.prevent="seraching"
      />
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
      <div
        class="h-screen absolute z-50 flex items-center ml-96"
        v-if="pending"
      >
        <Icon name="svg-spinners:6-dots-rotate" class="text-5xl" />
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th>Id</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="item in users.data.data"
            :key="item.id"
          >
            <th scope="row" class="px-6 py-4 font-medium">
              {{ item.name }}
            </th>
            <td class="px-6 py-4">{{ item.email }}</td>
            <td class="px-6 py-4 text-green-400">
              <Icon
                name="line-md:circle-twotone-to-confirm-circle-twotone-transition"
                class="text-lg"
              />
            </td>

            <td class="flex items-center px-6 py-4 space-x-3">
              <a
                href="#"
                class="font-medium text-green-500 dark:text-blue-500 hover:underline"
                :class="pending ? 'text-green-100' : ''"
              >
                <Icon name="line-md:pencil" class="text-lg"
              /></a>
              <a
                href="#"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                :class="pending ? 'text-red-100' : ''"
                ><Icon
                  name="line-md:buy-me-a-coffee-filled"
                  class="text-lg"
                ></Icon>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-center p-5">
        <nav aria-label="Page navigation example">
          <ul class="flex items-center -space-x-px h-10 text-base">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li v-for="(link, index) in users.data.links" :key="index">
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                @click.prevent="pagination(link.label)"
                >{{ link.label }}</a
              >
            </li>

            <li>
              <a
                href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const page = ref(1);
const search = ref("");
const filter = ref();

const {
  pending,
  data: users,
  refresh,
} = await useFetch(
  () =>
    "https://nearmeglocal.com/backend/api/users?page=" +
    page.value +
    "&serach=" +
    search.value
);

function pagination(pageNumber) {
  page.value = pageNumber;
}
</script>
