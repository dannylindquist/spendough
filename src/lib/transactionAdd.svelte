<script lang="ts">
  import type { Category } from "@prisma/client";
  import { goto } from "$app/navigation";
  import Calendar from "$lib/calendar.svelte";
  export let categories: Category[];
  let selectedDate = new Date();

  async function formSubmit(e) {
    var formData = new FormData(e.target);
    var object = {};
    formData.forEach((v, k) => (object[k] = v));
    object["timestamp"] = selectedDate;
    object["amount"] *= 100;
    object["categoryId"] = +object["categoryId"];
    console.log(object);
    let res = await fetch(`/transactions.json`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(object),
    });
    goto("/");
  }
</script>

<div>
  <h2 class="font-medium text-lg text-center">Edit Transaction</h2>
</div>
<form
  on:submit|preventDefault={formSubmit}
  action={`/transactions`}
  method="post"
>
  <label class="pt-2 block">
    <span class="block">Description:</span>
    <input
      class="w-full px-2 py-3 border border-gray-200 rounded focus:outline-none focus:ring ring-yellow-300"
      type="text"
      name="description"
    />
  </label>
  <label class="pt-2 block relative" for="amount">
    <span class="block">Amount:</span>
  </label>
  <div class="relative flex items-center mb-4">
    <input
      inputmode="decimal"
      class="relative block w-full py-3 pl-6 pr-2 border rounded appearance-none focus:outline-none focus:ring ring-yellow-300"
      type="number"
      name="amount"
      id="amount"
      step="0.01"
      min="0.01"
      required
    />
    <span class="absolute pl-2">$</span>
  </div>
  <div>
    <p class="pt-2">Date:</p>
    <Calendar bind:selectedDate />
  </div>
  <p class="pt-2">Category:</p>
  <div class="flex flex-wrap -ml-1">
    {#each categories as category}
      <div class="">
        <input
          class="sr-only"
          type="radio"
          id={`category-${category.id}`}
          name="categoryId"
          value={category.id}
        />
        <label
          for={`category-${category.id}`}
          class="block border px-2 py-3 m-0.5 rounded bg-white group cursor-pointer group-checked:border-green-400 category-label"
        >
          {category.description}
        </label>
      </div>
    {/each}
  </div>
  <div class="text-center">
    <input
      class="px-5 py-3 bg-green-500 border mt-2 text-white shadow-lg rounded-lg text-center focus:outline-none focus:ring ring-yellow-300"
      type="submit"
      value="Update"
    />
  </div>
</form>

<style lang="postcss">
  input[type="radio"]:checked ~ .category-label {
    @apply border-green-500 text-green-900;
  }
</style>
