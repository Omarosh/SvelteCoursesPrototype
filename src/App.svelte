<script>
  import Navbar from "./Navbar.svelte";
  import Course from "./Course.svelte";
  import AddCourse from "./AddCourse.svelte";
  import * as myjson from "./courses.json";

  let courses = [];
  let terms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let test = Object.entries(myjson);
  console.log("hi");
  console.log(myjson);
  courses = test[0][1];

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
          {#if course.term == 1}
            <Course
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
