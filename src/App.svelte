<script>
  import Navbar from "./Navbar.svelte";
  import Course from "./Course.svelte";
  import AddCourse from "./AddCourse.svelte";
  import * as myjson from "./power.json";

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
    },
  ];
  console.log(courses);

  let terms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let test = Object.entries(myjson);
  courses = test[0][1];
  console.log(courses);
  for (let course of courses) {
    if (course.prerequisites == "_") {
      course.state = courseStates.READY;
    } else {
      course.prerequisites = course.prerequisites.split("&");
      course.state = courseStates.CLOSED;
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

  let passedCourses = [];

  // const addCourse = (e) => {
  //   const newCourse = e.detail;
  //   courses = [...courses, newCourse];
  // };

  const removeCourse = (e) => {
    courses = courses.filter((course) => course.name !== e.detail);
  };

  function handlePass(event) {
    passedCourses.push(event.detail.courseCode);
    console.log(passedCourses);
  }
  function handleFail(event) {
    let tempCode = event.detail.courseCode;

    for (let i = 0; i < passedCourses.length; i++) {
      if (tempCode == passedCourses[i]) {
        passedCourses.splice(i, 1);
        break;
      }
    }
    console.log(passedCourses);
  }
</script>

<style>
  .termHeader {
    color: black;
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
      <h3 class="termHeader">Term {term} courses:</h3>
      <div class="row">
        {#each courses as course}
          {#if course.term == term}
            <Course
              on:coursePassed={handlePass}
              on:courseFailed={handleFail}
              prerequisite={course.prerequisites}
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
            prerequisite={course.prerequisites}
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

    <h3 class="termHeader">Humanity Courses:</h3>
    <div class="row">
      {#each courses as course}
        {#if course.term == 'h'}
          <Course
            on:coursePassed={handlePass}
            on:courseFailed={handleFail}
            prerequisite={course.prerequisites}
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
