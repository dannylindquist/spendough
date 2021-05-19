<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ session, fetch, page }) => {
    if (!session.signedIn) {
      return {
        status: 303,
        redirect: "/login",
      };
    }
    let tranId = +page.params.transactionId;
    let catRes = fetch("/categories.json");
    let res = await fetch(`/transactions/${tranId}.json`);
    let transaction = await res.json();
    if (!transaction.data) {
      return {
        status: 404,
        error: "Could not find transaction",
      };
    }
    let categories = await (await catRes).json();
    return {
      props: {
        transaction: transaction.data,
        categories: categories.data,
      },
    };
  };
</script>

<script lang="ts">
  import type { Transaction, Category } from "@prisma/client";
  import TransactionEdit from "$lib/transactionEdit.svelte";

  export let transaction: Transaction;
  export let categories: Category[];
</script>

<div class="max-w-lg mx-auto px-4">
  <TransactionEdit {transaction} {categories} />
</div>
