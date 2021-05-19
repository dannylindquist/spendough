<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ fetch, session, page }) => {
    if (!session.signedIn) {
      return {
        status: 303,
        redirect: "/login",
      };
    }
    if (!/\d+/.test(page.params.monthKey)) {
      return {
        status: 404,
        error: "Page not found",
      };
    }
    let tranRes = await fetch(
      `/transactions/month/${page.params.monthKey}.json`
    );
    let transactions = await tranRes.json();
    return {
      props: {
        transactions: transactions.data,
      },
    };
  };
</script>

<script lang="ts">
  import type { Category, Transaction } from "@prisma/client";
  import Transactions from "$lib/transactions.svelte";
  import { moneyFormatter } from "$lib/formatter";
  export let transactions: (Transaction & {
    Category: {
      id: number;
      description: string;
    };
  })[];
  export let categories: Category[];

  let sortMode: "date" | "category" = "date";

  $: total = transactions?.reduce((agg, val) => agg + val.amount, 0);
  $: grouped = transactions?.reduce((agg, val) => {
    if (sortMode === "date") {
      let d = new Date(val.timestamp);
      let summary = d.toLocaleDateString("default", {
        month: "short",
        day: "2-digit",
      });
      if (agg[summary]) {
        agg[summary].push(val);
      } else {
        agg[summary] = [val];
      }
    }
    return agg;
  }, {});
</script>

<div class="max-w-lg mx-auto pt-4">
  <div class="flex items-center mb-6">
    <div class="flex-1">month</div>
    <div class="text-center">
      <span
        class="block font-black uppercase tracking-widest text-xs text-gray-500"
      >
        Spent
      </span>
      <span class="block text-4xl pt-1">
        {moneyFormatter.format(total / 100)}
      </span>
    </div>
    <div class="flex-1 text-right">
      <a
        href="/transactions/new"
        class="bg-white rounded-xl p-3 shadow-md inline-block"
        aria-label="Create transaction"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </a>
    </div>
  </div>
  <Transactions transactions={grouped} />
</div>
