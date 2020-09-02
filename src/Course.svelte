<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export const courseStates = {
    READY: 1,
    CLOSED: 2,
    PASS: 3
  };
  let buttonStateClasses = ["", "btn-info", "btn-danger", "btn-success"];

  export let name;
  export let code;
  export let credit;
  export let term;
  export let prerequisites;
  export let satisfies;
  export let state = courseStates.READY;
  export let passedCourses = [];

  $: buttonClass = buttonStateClasses[state];

  let showControls = false;

  const addPoint = () => (credit += 1);
  const removePoint = () => (credit -= 1);
  const toggleControls = () => (showControls = !showControls);
  const onDelete = () => dispatch("removecourse", name);

  function handleClick() {
    if (state == courseStates.CLOSED) {
      //Handle closed course
    } else {
      if (state === courseStates.READY) {
        passCourse();
        dispatch("coursePassed", {
          courseCode: code,
          courseSatisfies: satisfies
        });
      } else if (state === courseStates.PASS) {
        failCourse();
        dispatch("courseFailed", {
          courseCode: code,
          courseSatisfies: satisfies
        });
      }
    }
  }
  function passCourse() {
    state = courseStates.PASS;
  }
  function failCourse() {
    state = courseStates.READY;
  }
</script>

<style>
  h1 {
    color: #fffc61;
    font-size: 0.9em;
  }
  h4 {
    margin-left: 4px;
    margin-right: 4px;
    font-size: 0.6em;
  }
  .course {
    margin: 2px;
    cursor: pointer;
  }
  .btn-info {
  }
</style>

<div on:click={handleClick} class="text-center course btn {buttonClass}">
  <h1>{name}</h1>
  <h4>{code} - {credit} Credit Hours - Term {term}</h4>
  {#if showControls}
    <button class="btn" on:click={addPoint}>+1</button>
    <button class="btn btn-dark" on:click={removePoint}>-1</button>
    <input type="number" bind:value={credit} />
  {/if}
</div>
