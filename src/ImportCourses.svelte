<script>
  import * as myjson from "./courses.json";
  export let courses = [];
  let test = Object.entries(myjson);
  //   console.log("hi");
  //   console.log(myjson);
  courses = test[0][1];
</script>
