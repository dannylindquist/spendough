<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    let res = await fetch("/categories.json");
    let categories = await res.json();
    return {
      props: {
        categories: categories.data,
      },
    };
  };
</script>

<script>
  export let categories;
</script>

<div class="flex-1 w-full max-w-lg px-3 py-4 pt-6 mx-auto">
  <h1 class="text-xl font-black">Categories</h1>

  <form class="block py-2" on:submit|preventDefault={() => {}}>
    <h1 class="py-2 text-lg font-semibold">New category</h1>
    <label>
      <span class="block">Description</span>
      <input
        class="w-full px-3 py-2 mb-2 bg-white border rounded appearance-none"
        type="text"
        name="description"
        id="description"
      />
      <input
        class="px-2 py-2 text-white bg-green-500 rounded"
        type="submit"
        value="Create"
      />
    </label>
  </form>
  <div class="space-y-2">
    <div class="space-y-2">
      {#each categories as cat}
        <div class="flex items-center px-4 py-2 bg-white border rounded">
          <p class="flex-1 p-1 mx-2 text-lg">{cat.description}</p>
          <form on:submit|preventDefault={() => {}} data-cat={cat.id}>
            <button
              aria-label="delete category"
              class="px-1 text-sm rounded appearance-none"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 text-gray-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg></button
            >
          </form>
        </div>
      {/each}
    </div>
  </div>
</div>
