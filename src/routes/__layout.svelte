<script>
  import { session } from "$app/stores";
  import "../styles.css";
</script>

<nav class="pt-10 pb-6">
  <div class="max-w-3xl mx-auto px-4 flex">
    <a class="inline-flex relative -ml-2 py-1 items-center" href="/">
      <div
        class="w-full h-1/3 bg-green-300 absolute transform -rotate-3 shadow rounded"
      />
      <h1 class="mx-2 font-black text-2xl relative tracking-wide">Spendough</h1>
    </a>
    <div class="flex-1 flex justify-end">
      {#if $session.signedIn}
        <form action="/logout" method="post">
          <button>Logout</button>
        </form>
      {/if}
    </div>
  </div>
</nav>
<main class="max-w-3xl mx-auto px-4">
  <slot />
</main>
