<script>
  import { createEventDispatcher } from "svelte";
  import * as animateScroll from "svelte-scrollto";

  const dispatch = createEventDispatcher();
  export const courseStates = {
    READY: 1,
    CLOSED: 2,
    PASS: 3,
    ELECTIVE: 4,
  };
  let buttonStateClasses = [
    "",
    "btn-info",
    "btn-danger",
    "btn-success",
    "btn-warning",
  ];

  export let name;
  export let code;
  export let credit;
  export let term;
  export let prerequisites;
  export let satisfies;
  export let state = courseStates.READY;
  export let courseClass;
  export let passedCourses = [];
  export let passedElectiveCourses = [];

  $: test = handlePrerequisitesChange(prerequisites);
  $: buttonClass = buttonStateClasses[state];

  function handlePrerequisitesChange(prereq) {
    if (prereq == "_") {
    } else {
      for (let course of prereq) {
        if (course.passed === true) {
          // console.log(
          //   course.code +
          //     "   JAJAJAJAJ  " +
          //     course.passed +
          //     "Component COurse:" +
          //     code
          // );
          continue;
        } else {
          if (courseClass == "e" && state === courseStates.PASS) {
            deleteElectiveFromArray(term, passedElectiveCourses);
          }
          state = courseStates.CLOSED;
          return false;
        }
      }
      // console.log("State is " + state);
      if (state == courseStates.CLOSED) {
        state = courseStates.READY;
      }
      return true;
    }
  }

  let showControls = false;

  const addPoint = () => (credit += 1);
  const removePoint = () => (credit -= 1);
  const toggleControls = () => (showControls = !showControls);
  const onDelete = () => dispatch("removecourse", name);

  export function handleOnClick() {
    if (courseClass == "e") {
      handleElectiveClick();
    } else {
      handleClick();
    }
  }

  function checkElective() {
    for (let e of passedElectiveCourses) {
      if (e == term) {
        console.log("Found elective " + term);
        return true;
      }
    }
    return false;
  }
  function deleteElectiveFromArray(courseCode, array) {
    for (let i = 0; i < array.length; i++) {
      if (courseCode === array[i]) {
        array.splice(i, 1);
        break;
      }
    }
  }
  export function handleElectiveClick() {
    if (state == courseStates.CLOSED) {
      //Handle closed course
    } else {
      if (state === courseStates.READY && !checkElective()) {
        passCourse();
        passedElectiveCourses.push(term);
        dispatch("coursePassed", {
          courseCode: code,
          courseSatisfies: satisfies,
          credit: credit,
          courseClass: courseClass,
          term: term,
        });
      } else if (state === courseStates.PASS) {
        failCourse();
        deleteElectiveFromArray(term, passedElectiveCourses);
        dispatch("courseFailed", {
          courseCode: code,
          courseSatisfies: satisfies,
          credit: credit,
          courseClass: courseClass,
          term: term,
        });
      }
    }
  }
  export function handleClick() {
    if (state == courseStates.CLOSED) {
      //Handle closed course
    } else if (state == courseStates.ELECTIVE) {
      animateScroll.scrollTo({ element: "#elective" });
    } else {
      if (state === courseStates.READY) {
        passCourse();
        dispatch("coursePassed", {
          courseCode: code,
          courseSatisfies: satisfies,
          credit: credit,
        });
      } else if (state === courseStates.PASS) {
        failCourse();
        dispatch("courseFailed", {
          courseCode: code,
          courseSatisfies: satisfies,
          credit: credit,
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
  .btn-warning {
    color: black;
  }
  .btn-warning h1 {
    color: darkred;
  }
</style>

<div on:click={handleOnClick} class="text-center course btn {buttonClass}">
  <h1>{name}</h1>
  <h4>{code} - {credit} Credit Hours</h4>
  {#if showControls}
    <button class="btn" on:click={addPoint}>+1</button>
    <button class="btn btn-dark" on:click={removePoint}>-1</button>
    <input type="number" bind:value={credit} />
  {/if}
</div>
