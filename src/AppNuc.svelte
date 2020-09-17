<script>
  import Navbar from "./Navbar.svelte";
  import Course from "./Course.svelte";
  import AddCourse from "./AddCourse.svelte";

  import { createEventDispatcher } from "svelte";
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import * as nuc from "./nuc.json";
  onMount(() => {
    console.log("Mounted");
  });

  afterUpdate(() => {
    console.log("Updated");
  });

  onDestroy(() => {
    console.log("Destroyed " + flag);
  });

  const dispatch = createEventDispatcher();
  export const courseStates = {
    READY: 1,
    CLOSED: 2,
    PASS: 3,
    ELECTIVE: 4,
  };
  export let flag = true;
  let terms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let electives = ["e1", "e2", "e3", "e4", "e5", "e6"];
  // let test = Object.entries(program);
  // courses = test[0][1];
  export let courses = [
    {
      name: "",
      code: "",
      credit: 0,
      term: 0,
      prerequisites: "_",
      satisfies: "_",
      state: 0,
      handleClick: function () {
        //Some logic here...
      },
      courseClass: "main",
    },
  ];
  let test = Object.entries(nuc);
  courses = [...test[0][1]];

  let passedCourses = [];
  $: totalCompletedCreditHours = updateCompletedHours(
    passedCourses,
    totalCompletedCreditHours
  );

  let passedElectiveCourses = [];

  const requiredHoursForProject = 130;

  $: completedHoursObserver = checkProject(totalCompletedCreditHours);

  function updateCompletedHours(array, hours) {
    let temp = 0;
    for (let i of array) {
      temp += parseInt(i.tempCredit);
    }
    totalCompletedCreditHours = temp;
    return temp;
  }

  function checkProject(creditHours) {
    if (creditHours >= requiredHoursForProject) {
      for (let course of courses) {
        if (
          course.courseClass == "project" &&
          course.state == courseStates.CLOSED
        ) {
          course.state = courseStates.READY;
        }
      }
    } else {
      for (let course of courses) {
        if (course.courseClass == "project") {
          course.state = courseStates.CLOSED;
          break;
        }
        if (course.courseClass == "project2") {
          console.log("555555555555            " + "55555555555555");
          course.state = courseStates.CLOSED;
          break;
        }
      }
    }
  }

  // $: arrayChangeListener = handleArrayChange(courses);

  // function handleArrayChange(array) {
  //   if (flag) {
  //     //initPrereq();
  //   }
  // }
  if (flag) {
    console.log("THE FLAG is " + flag);
    setTimeout(initPrereq, 1500);
  } else {
    failWholeterms();
  }

  function initPrereq() {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].prerequisites == "_") {
        courses[i].state = courseStates.READY;
        if (courses[i].courseClass == "elective") {
          courses[i].state = courseStates.ELECTIVE;
        }
        if (courses[i].courseClass == "project") {
          courses[i].state = courseStates.CLOSED;
        }
      } else if (typeof courses[i].prerequisites != "string") {
        console.log("Fuck EGYPT PRE");
      } else {
        console.log("Helloooo FROM: (" + courses[i].prerequisites + ")");
        try {
          courses[i].prerequisites = courses[i].prerequisites.split("&");
        } catch (err) {
          console.log(
            "Helloooo FROM: (" +
              courses[i].prerequisites +
              ") " +
              courses[i] +
              "==== " +
              i
          );
        } // console.log(courses[i]s);
        courses[i].state = courseStates.CLOSED;
      }
    }
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].prerequisites == "_") {
      } else if (typeof courses[i].satisfies != "string") {
        console.log("Fuck EGYPT SAT");
      } else {
        for (let j = 0; j < courses[i].prerequisites.length; j++) {
          courses[i].prerequisites[j] = {
            code: courses[i].prerequisites[j],
            passed: false,
          };
        }
      }
    }

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].satisfies == "_") {
        //handle no satisfies (don nothing)
      } else {
        try {
          courses[i].satisfies = courses[i].satisfies.split("&");
        } catch (err) {
          // /console.log(
          //   "SAAAAAAT FROM: (" +
          //     courses[i].satisfies +
          //     ") " +
          //     courses[i] +
          //     "==== " +
          //     i
          // );
        }
      }
    }
    // console.log(courses[i]s);
  }

  // const addCourse = (e) => {
  //   const newCourse = e.detail;
  //   courses = [...courses, newCourse];
  // };

  const removeCourse = (e) => {
    courses = courses.filter((course) => course.name !== e.detail);
  };

  function handlePass(event) {
    let tempCode = event.detail.courseCode;
    let tempCredit = event.detail.credit;
    passedCourses.push({ tempCode: tempCode, tempCredit: tempCredit });
    // console.log("PAAAASSED COURSESSSSSSSS");
    // console.log(passedCourses);
    totalCompletedCreditHours += parseInt(tempCredit);

    // console.log(passedCourses);

    for (let satisfiedCourse of event.detail.courseSatisfies) {
      // console.log("Satisfies are: " + satisfiedCourse);
      for (let j = 0; j < courses.length; j++) {
        if (satisfiedCourse === courses[j].code) {
          // console.log("Found Satisfies are: " + satisfiedCourse);
          for (let k = 0; k < courses[j].prerequisites.length; k++) {
            if (courses[j].prerequisites[k].code === tempCode) {
              courses[j].prerequisites[k].passed = true;
              // console.log(
              //   courses[j].name +
              //     " has changed prereq " +
              //     courses[j].prerequisites[k].code +
              //     " Pass value to true"
              // );
            }
          }

          break;
        }
      }
    }
  }
  function deleteElectiveFromArray(courseCode, array) {
    for (let i = 0; i < array.length; i++) {
      if (courseCode === array[i]) {
        array.splice(i, 1);
        break;
      }
    }
  }
  function handleFail(event) {
    let tempCode = event.detail.courseCode;
    let tempCredit = event.detail.credit;
    let tempClass = event.detail.courseClass;
    let tempTerm = event.detail.term;

    deleteCourseFromArray(tempCode, passedCourses);
    // console.log("PAAAASSED COURSESSSSSSSS");
    // console.log(passedCourses);
    totalCompletedCreditHours -= parseInt(tempCredit);

    for (let satisfiedCourse of event.detail.courseSatisfies) {
      // console.log("Satisfies are: " + satisfiedCourse);
      for (let j = 0; j < courses.length; j++) {
        if (satisfiedCourse === courses[j].code) {
          // console.log("Found Satisfies are: " + satisfiedCourse);
          for (let k = 0; k < courses[j].prerequisites.length; k++) {
            if (courses[j].prerequisites[k].code === tempCode) {
              courses[j].prerequisites[k].passed = false;
              // console.log(
              //   courses[j].name +
              //     " has changed prereq " +
              //     courses[j].prerequisites[k].code +
              //     " Pass value to true"
              // );
            }
          }

          break;
        }
      }
    }

    //console.log(passedCourses);
  }

  function deleteCourseFromArray(courseCode, array) {
    for (let i = 0; i < array.length; i++) {
      if (courseCode === array[i].tempCode) {
        array.splice(i, 1);
        break;
      }
    }
  }

  function passWholeterm(term) {
    for (let course of courses) {
      if (course.term == term && course.state === courseStates.READY) {
        course.handleClick();
        // console.log("Hello from " + term);
        // if (course.state === courseStates.READY) {
        //   console.log("Hello from State " + course.state);
        //   course.state = courseStates.PASS;
        //   console.log("Hello 222 from State " + course.state);
        //   dispatch("coursePassed", {
        //     courseCode: course.code,
        //     courseSatisfies: course.satisfies,
        //   });
        // }
      }
    }
  }

  function failWholeterms() {
    for (let course of courses) {
      if (course.state === courseStates.PASS) {
        course.handleClick();
      }
    }
  }
</script>

<style>
  .termHeader {
    color: black;
  }
  .hlink {
    color: cornflowerblue !important;
    cursor: pointer !important;
  }
  .btn-secondary {
    font-size: 0.6rem;
  }
  .credit-overlay {
    padding: 6px;
    color: white;
    background-color: rgb(95, 3, 3);
    border-style: solid;
    border-width: 1px;
    font-weight: bold;
    font-size: 0.8rem;
    position: fixed;
    right: 2px;
    top: 1px;
  }
</style>

<Navbar />

<div class="credit-overlay">
  Completed credit hours: {totalCompletedCreditHours}
</div>

<div class="container">
  <!-- <div class="">
    <AddCourse on:addcourse={addCourse} />
  </div> -->

  {#if courses.length == 0}
    <p>No courses</p>
  {:else}
    {#each terms as term}
      <h3 class="termHeader">
        Term {term} courses: <button class="btn btn-secondary" on:click={() => passWholeterm(term)}>Select
          all courses</button>
      </h3>
      <div class="row">
        {#each courses as course}
          {#if course.term == term}
            <Course
              on:coursePassed={handlePass}
              on:courseFailed={handleFail}
              bind:handleClick={course.handleClick}
              bind:prerequisites={course.prerequisites}
              satisfies={course.satisfies}
              bind:passedCourses
              bind:totalCompletedCreditHours
              bind:state={course.state}
              name={course.name}
              credit={course.credit}
              term={course.term}
              code={course.code}
              courseClass={course.courseClass}
              on:removecourse={removeCourse} />
          {/if}
        {/each}
      </div>
      <br />
    {/each}
    <h3 class="termHeader" id="elective">Elective Courses:</h3>
    {#each electives as elective, i}
      <h5 class="termHeader">مقرر إختياري {i + 1}:</h5>
      <div class="row">
        {#each courses as course}
          {#if course.term == elective}
            <Course
              on:coursePassed={handlePass}
              on:courseFailed={handleFail}
              bind:handleClick={course.handleClick}
              bind:prerequisites={course.prerequisites}
              satisfies={course.satisfies}
              bind:state={course.state}
              bind:passedCourses
              bind:totalCompletedCreditHours
              name={course.name}
              credit={course.credit}
              term={course.term}
              code={course.code}
              courseClass={course.courseClass}
              bind:passedElectiveCourses
              on:removecourse={removeCourse} />
          {/if}
        {/each}
      </div>
      <br />
    {/each}
  {/if}
</div>

<div
  class="modal fade"
  id="exampleModalCenter"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">
          اختر مقرراً واحداً
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">...</div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
