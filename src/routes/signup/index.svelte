<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ session }) => {
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
  async function signupError(res: Response, err: Error, form) {
    if (!res.ok) {
      let json = await res.json();
      error = json.data.error;
    }
  }
  async function signupResponse(res: Response) {
    goto("/", { replaceState: true });
  }
</script>

<div class="relative text-center mt-16 mb-8">
  <div class="relative inline-block">
    <div class="absolute bg-green-200 h-1/4 w-full bottom-0" />
    <h2
      class="relative inline-block font-black lg:text-5xl md:text-4xl text-2xl"
    >
      Welcome!<br />Lets get started!
    </h2>
  </div>
</div>
{#if error.length > 0}
  <p
    class="max-w-md mx-auto text-lg bg-red-100 text-red-900 py-1 px-4 rounded shadow mb-4 text-center"
  >
    {error}
  </p>
{/if}
<form
  action="/signup.json"
  method="post"
  class="max-w-md mx-auto text-lg"
  use:enhance={{
    result: signupResponse,
    error: signupError,
  }}
>
  <label class="block">
    <span class="block text-center pb-2">Enter your email:</span>
    <input
      required
      class="w-full px-2 py-3 border border-gray-200 rounded text-center focus:outline-none focus:ring ring-yellow-300"
      type="email"
      name="email"
    />
  </label>
  <label class="pt-2 block">
    <span class="block text-center py-2">Enter your password:</span>
    <input
      required
      class="w-full px-2 py-3 border border-gray-200 rounded text-center focus:outline-none focus:ring ring-yellow-300"
      type="password"
      name="password"
    />
  </label>
  <label class="pt-2 block">
    <span class="block text-center py-2">Confirm password:</span>
    <input
      required
      class="w-full px-2 py-3 border border-gray-200 rounded text-center focus:outline-none focus:ring ring-yellow-300"
      type="password"
      name="password-confirm"
    />
  </label>
  <div class="text-center">
    <input
      class="px-5 py-3 bg-green-500 border mt-2 text-white shadow-lg rounded-lg text-center"
      type="submit"
      value="Sign up"
    />
  </div>
</form>
<div class="text-center pt-4">
  <a class="underline tracking-loose" href="/login">
    Have an account already? Login!
  </a>
</div>
