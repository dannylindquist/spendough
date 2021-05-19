<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ session }) => {
    console.log("redirect", session);
    if (session.signedIn) {
      return {
        status: 303,
        redirect: "/",
      };
    }
    return {
      status: 200,
    };
  };
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { enhance } from "$lib/form";
  let error = "";
  async function loginError(res: Response, err: Error, form) {
    if (!res.ok) {
      let json = await res.json();
      error = json.message;
    }
  }
  async function loginResponse(res: Response) {
    goto("/", { replaceState: true });
  }
  $: console.log(error);
</script>

<h2 class="text-center font-black lg:text-5xl md:text-4xl text-2xl mt-16 mb-8">
  Welcome back!<br />Lets get signed in
</h2>
{#if error.length > 0}
  <p>{error}</p>
{/if}
<form
  action="/login.json"
  method="post"
  class="max-w-md mx-auto text-lg"
  use:enhance={{
    result: loginResponse,
    error: loginError,
  }}
>
  <label class="block">
    <span class="block text-center pb-2">Enter your email:</span>
    <input
      class="w-full px-2 py-3 border border-gray-200 rounded text-center focus:outline-none focus:ring ring-yellow-300"
      type="email"
      name="email"
    />
  </label>
  <label class="pt-2 block">
    <span class="block text-center py-2">Enter your password:</span>
    <input
      class="w-full px-2 py-3 border border-gray-200 rounded text-center focus:outline-none focus:ring ring-yellow-300"
      type="password"
      name="password"
    />
  </label>
  <div class="text-center">
    <input
      class="px-5 py-3 bg-green-500 border mt-2 text-white shadow-lg rounded-lg text-center"
      type="submit"
      value="Log in"
    />
  </div>
</form>
<div class="text-center pt-4">
  <a class="underline tracking-loose" href="/signup">
    Don't have an account? Sign up!
  </a>
</div>
