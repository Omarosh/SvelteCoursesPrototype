<script>
  import Navbar from "./Navbar.svelte";
  import Course from "./Course.svelte";
  import AddCourse from "./AddCourse.svelte";
  import * as myjson from "./power.json";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export const courseStates = {
    READY: 1,
    CLOSED: 2,
    PASS: 3,
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
    },
  ];

  let terms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let test = Object.entries(myjson);
  courses = test[0][1];
  initPrereq();
  function initPrereq() {
    for (let course of courses) {
      if (course.prerequisites == "_") {
        course.state = courseStates.READY;
      } else {
        course.prerequisites = course.prerequisites.split("&");
        course.state = courseStates.CLOSED;
      }
    }
    console.log("SPLIT");
    console.log(courses);
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
    console.log("AddingPassed");
    console.log(courses);

    for (let course of courses) {
      if (course.satisfies == "_") {
        //handle no satisfies (don nothing)
      } else {
        course.satisfies = course.satisfies.split("&");
      }
    }
    console.log(courses);
  }

  let passedCourses = [];

  // const addCourse = (e) => {
  //   const newCourse = e.detail;
  //   courses = [...courses, newCourse];
  // };

  const removeCourse = (e) => {
    courses = courses.filter((course) => course.name !== e.detail);
  };

  function handlePass(event) {
    let tempCode = event.detail.courseCode;
    passedCourses.push(tempCode);
    console.log(passedCourses);

    for (let satisfiedCourse of event.detail.courseSatisfies) {
      console.log("Satisfies are: " + satisfiedCourse);
      for (let j = 0; j < courses.length; j++) {
        if (satisfiedCourse === courses[j].code) {
          console.log("Found Satisfies are: " + satisfiedCourse);
          for (let k = 0; k < courses[j].prerequisites.length; k++) {
            if (courses[j].prerequisites[k].code === tempCode) {
              courses[j].prerequisites[k].passed = true;
              console.log(
                courses[j].name +
                  " has changed prereq " +
                  courses[j].prerequisites[k].code +
                  " Pass value to true"
              );
            }
          }

          break;
        }
      }
    }
    console.log("hiiii");
    console.log(courses);
  }
  function handleFail(event) {
    let tempCode = event.detail.courseCode;

    deleteCourseFromArray(tempCode, passedCourses);

    for (let satisfiedCourse of event.detail.courseSatisfies) {
      console.log("Satisfies are: " + satisfiedCourse);
      for (let j = 0; j < courses.length; j++) {
        if (satisfiedCourse === courses[j].code) {
          console.log("Found Satisfies are: " + satisfiedCourse);
          for (let k = 0; k < courses[j].prerequisites.length; k++) {
            if (courses[j].prerequisites[k].code === tempCode) {
              courses[j].prerequisites[k].passed = false;
              console.log(
                courses[j].name +
                  " has changed prereq " +
                  courses[j].prerequisites[k].code +
                  " Pass value to true"
              );
            }
          }

          break;
        }
      }
    }

    console.log(passedCourses);
  }

  function deleteCourseFromArray(courseCode, array) {
    for (let i = 0; i < array.length; i++) {
      if (courseCode === array[i]) {
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
</style>

<Navbar />
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
              on:removecourse={removeCourse} />
          {/if}
        {/each}
      </div>
      <br />
    {/each}
    <h3 class="termHeader">Elective Courses:</h3>
    <div class="row">
      {#each courses as course}
        {#if course.term == 'e'}
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
            on:removecourse={removeCourse} />
        {/if}
      {/each}
    </div>
    <br />

    <h3 class="termHeader" />
    <div class="row">
      {#each courses as course}
        {#if course.term == 'h'}
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
            on:removecourse={removeCourse} />
        {/if}
      {/each}
    </div>
    <br />
  {/if}
</div>
