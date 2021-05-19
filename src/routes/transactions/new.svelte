<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ session, fetch, page }) => {
    if (!session.signedIn) {
      return {
        status: 303,
        redirect: "/login",
      };
    }
    let catRes = fetch("/categories.json");
    let categories = await (await catRes).json();
    return {
      props: {
        categories: categories.data,
      },
    };
  };
</script>

<script lang="ts">
  import type { Transaction, Category } from "@prisma/client";
  import TransactionAdd from "$lib/transactionAdd.svelte";

  export let categories: Category[];
</script>

<div class="max-w-lg mx-auto px-4">
  <TransactionAdd {categories} />
</div>
