<script>
  import "../styles.css";
</script>

<nav class="pt-10 pb-6">
  <div class="max-w-3xl mx-auto px-4">
    <a class="inline-flex relative -ml-2 py-1 items-center" href="/">
      <div
        class="w-full h-1/3 bg-green-300 absolute transform -rotate-3 shadow rounded"
      />
      <h1 class="mx-2 font-black text-2xl relative tracking-wide">Spendough</h1>
    </a>
  </div>
</nav>
<main class="max-w-3xl mx-auto px-4">
  <slot />
</main>
