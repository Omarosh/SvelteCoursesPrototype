<script>
  import Navbar from "./Navbar.svelte";
  import Course from "./Course.svelte";
  import AddCourse from "./AddCourse.svelte";
  import * as myjson from "./courses.json";

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
      course.state = courseStates.CLOSED;
    }
  }
  console.log(courses);
  // const addCourse = (e) => {
  //   const newCourse = e.detail;
  //   courses = [...courses, newCourse];
  // };

  const removeCourse = (e) => {
    courses = courses.filter((course) => course.name !== e.detail);
  };
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
              state={course.state}
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
            state={course.state}
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
            state={course.state}
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
