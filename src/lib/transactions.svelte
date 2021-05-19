<script lang="ts">
  import type { Category, Transaction } from "@prisma/client";
  import { moneyFormatter } from "$lib/formatter";
  export let transactions: Record<
    string,
    (Transaction & {
      Category: {
        id: number;
        description: string;
      };
    })[]
  >;
</script>

{#each Object.keys(transactions) as group}
  <p class="text-sm text-gray-600 mb-1">{group}</p>
  <div class="divide-y bg-white shadow-md mb-8 rounded-lg">
    {#each transactions[group] as transaction}
      <a
        class="flex py-4 px-3 items-center"
        href={`/transactions/${transaction.id}/edit`}
      >
        <div class="flex-1">
          <span class="block font-medium leading-none py-1 text-gray-700">
            {transaction.description}
          </span>
          <span
            class="rounded-md bg-green-100 text-green-800 inline-block px-2 text-sm"
          >
            {transaction.Category.description}
          </span>
        </div>
        <span class="tabular-nums text-lg">
          {moneyFormatter.format(transaction.amount / 100)}
        </span>
      </a>
    {/each}
  </div>
{/each}
