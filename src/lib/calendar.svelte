<script>
  import { scale } from "svelte/transition";
  import { quadInOut } from "svelte/easing";
  import tinydate from "tinydate";
  import { clickOutside } from "./actions";
  import calendarize from "calendarize";
  const shortdate = tinydate("{MM}/{DD}/{YYYY}");
  const fulldate = tinydate("{DDD}", {
    MMMM: (d) => d.toLocaleString("default", { month: "long" }),
    DDD: (d) => d.toLocaleString("default", { weekday: "long" }),
    DD: (d) => d.getDate(),
  });
  export let selectedDate = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let viewDate = selectedDate;

  let menuOpen = false;

  function handleButtonClick() {
    menuOpen = !menuOpen;
  }

  function dateClicked(e) {
    console.log(e.target.dataset.day);
    selectedDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      e.target.dataset.day
    );
    menuOpen = false;
  }

  function previousMonth() {
    var month = viewDate.getMonth() === 0 ? 11 : viewDate.getMonth() - 1;
    viewDate = new Date(viewDate.getFullYear(), month, 1);
  }
  function nextMonth() {
    var month = viewDate.getMonth() === 11 ? 0 : viewDate.getMonth() + 1;
    viewDate = new Date(viewDate.getFullYear(), month, 1);
  }
</script>

<div
  use:clickOutside={{ enabled: menuOpen, cb: () => (menuOpen = false) }}
  class="relative"
>
  <button
    aria-label={`Choose date, selected is ${fulldate(selectedDate)}`}
    on:click|preventDefault={handleButtonClick}
    class="block w-full px-2 py-3 bg-white border rounded appearance-none"
  >
    {shortdate(selectedDate) || "Select Date"}
  </button>
  {#if menuOpen}
    <div
      transition:scale={{
        duration: 100,
        delay: 0,
        opacity: 0.2,
        start: 0.85,
        easing: quadInOut,
      }}
      class="absolute z-10 inline-block px-3 py-4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl left-1/2 top-1/2"
    >
      <div class="flex">
        <button
          on:click|preventDefault={previousMonth}
          class="flex items-center justify-center px-3 rounded hover:bg-gray-200"
          aria-label="previous month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6 text-gray-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg></button
        >
        <h3 class="flex-1 py-2 text-lg text-center">
          {viewDate.toLocaleString("en", { month: "long" })}
        </h3>
        <button
          on:click|preventDefault={nextMonth}
          class="flex items-center justify-center px-3 rounded hover:bg-gray-200"
          aria-label="next month"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6 text-gray-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg></button
        >
      </div>
      <div class="flex justify-between w-full space-x-2">
        {#each dayNames as day}
          <span class="w-10 h-10 text-center tabular-nums">{day}</span>
        {/each}
      </div>
      {#each calendarize(viewDate) as week}
        <div class="flex justify-between w-full">
          {#each week as day}
            <span
              on:click={dateClicked}
              data-day={day}
              class:bg-gray-200={selectedDate.getDate() === day}
              class="flex items-center justify-center w-10 h-10 text-center cursor-pointer tabular-nums hover:bg-gray-200"
              >{day !== 0 ? day : " "}</span
            >
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
