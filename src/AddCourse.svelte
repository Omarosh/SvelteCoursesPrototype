<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let course = {
    name: "",
    credit: 0,
    code: "FF000",
    term: 0
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch("addcourse", course);
    course = {
      name: "",
      credit: 0,
      code: "FF000",
      term: 0
    };
  };
</script>

<form on:submit={onSubmit} class="grid-3">
  <input type="text" placeholder="Course Name" bind:value={course.name} />
  <input
    type="number"
    placeholder="Course credit hours"
    bind:value={course.points} />
  <input type="submit" class="btn btn-primary" value="Add Course" />
</form>
