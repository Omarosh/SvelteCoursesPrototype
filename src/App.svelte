<script>
  import Navbar from "./Navbar.svelte";
  import Course from "./Course.svelte";
  import AddCourse from "./AddCourse.svelte";
  import * as myjson from "./civil.json";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export const courseStates = {
    READY: 1,
    CLOSED: 2,
    PASS: 3,
    ELECTIVE: 4,
  };
  let courses = [
    {
      name: "",
      code: "",
      credit: 0,
      term: 0,
      prerequisites: "",
      satisfies: "",
      state: 0,
      handleClick: function () {
        //Some logic here...
      },
      courseClass: "main",
    },
  ];

  let passedCourses = [];
  let totalCompletedCreditHours = 0;

  let passedElectiveCourses = [];

  const requiredHoursForProject = 130;

  $: completedHoursObserver = checkProject(totalCompletedCreditHours);

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

  let terms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let electives = ["e1", "e2", "e3", "e4", "e5", "e6"];
  let test = Object.entries(myjson);
  courses = test[0][1];
  initPrereq();
  function initPrereq() {
    for (let course of courses) {
      if (course.prerequisites == "_") {
        course.state = courseStates.READY;
        if (course.courseClass == "elective") {
          course.state = courseStates.ELECTIVE;
        }
        if (course.courseClass == "project") {
          course.state = courseStates.CLOSED;
        }
      } else {
        console.log(courses);
        course.prerequisites = course.prerequisites.split("&");
        console.log(courses);
        course.state = courseStates.CLOSED;
      }
    }
    for (let course of courses) {
      if (course.prerequisites == "_") {
      } else {
        for (let i = 0; i < course.prerequisites.length; i++) {
          course.prerequisites[i] = {
            code: course.prerequisites[i],
            passed: false,
          };
        }
      }
    }

    for (let course of courses) {
      if (course.satisfies == "_") {
        //handle no satisfies (don nothing)
      } else {
        course.satisfies = course.satisfies.split("&");
      }
    }
    console.log(courses);
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
      if (course.term == term) {
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
    top: 25%;
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
