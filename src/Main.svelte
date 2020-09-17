<script>
  import App from "./App.svelte";
  import * as civil from "./civil.json";
  import * as power from "./power.json";
  import * as meca from "./meca.json";
  import * as communication from "./communication.json";
  import AppMeca from "./AppMeca.svelte";
  import AppCom from "./AppCom.svelte";
  import AppPower from "./AppPower.svelte";
  import AppCivil from "./AppCivil.svelte";
  import AppProd from "./AppProd.svelte";
  import AppChem from "./AppChem.svelte";
  import AppText from "./AppText.svelte";

  let flag = false;
  let flag1 = true;
  let count = 0;
  let flags = {
    meca: false,
    com: false,
    civil: false,
    power: false,
    prod: false,
    chem: false,
    text: false,
  };
  let initFlags = {
    meca: true,
    com: true,
    civil: true,
    power: true,
    prod: true,
    chem: true,
    text: true,
  };
  const btnClasses = { s: "btn-secondary", p: "btn-primary" };
  let btnClass = {
    meca: "btn-secondary",
    com: "btn-secondary",
    civil: "btn-secondary",
    power: "btn-secondary",
    prod: "btn-secondary",
    chem: "btn-secondary",
    text: "btn-secondary",
  };
  let counts = {
    meca: 0,
    com: 0,
    civil: 0,
    power: 0,
    prod: 0,
    chem: 0,
    text: 0,
  };

  function toggleMeca() {
    counts.meca++;
    if (counts.meca > 1) {
      initFlags.meca = false;
    }
    if (counts.meca % 2 == 0) {
      btnClass.meca = btnClasses.s;
    } else {
      btnClass.meca = btnClasses.p;
    }
    flags.meca = !flags.meca;
  }

  function togglePower() {
    counts.power++;
    if (counts.power > 1) {
      initFlags.power = false;
    }
    if (counts.power % 2 == 0) {
      btnClass.power = btnClasses.s;
    } else {
      btnClass.power = btnClasses.p;
    }
    flags.power = !flags.power;
  }

  function toggleCom() {
    counts.com++;
    if (counts.com > 1) {
      initFlags.com = false;
    }
    if (counts.com % 2 == 0) {
      btnClass.com = btnClasses.s;
    } else {
      btnClass.com = btnClasses.p;
    }
    flags.com = !flags.com;
  }

  function toggleCivil() {
    counts.civil++;
    if (counts.civil > 1) {
      initFlags.civil = false;
    }
    if (counts.civil % 2 == 0) {
      btnClass.civil = btnClasses.s;
    } else {
      btnClass.civil = btnClasses.p;
    }
    flags.civil = !flags.civil;
  }

  function toggleProd() {
    counts.prod++;
    if (counts.prod > 1) {
      initFlags.prod = false;
    }
    if (counts.prod % 2 == 0) {
      btnClass.prod = btnClasses.s;
    } else {
      btnClass.prod = btnClasses.p;
    }
    flags.prod = !flags.prod;
  }

  function toggleChem() {
    counts.chem++;
    if (counts.chem > 1) {
      initFlags.chem = false;
    }
    if (counts.chem % 2 == 0) {
      btnClass.chem = btnClasses.s;
    } else {
      btnClass.chem = btnClasses.p;
    }
    flags.chem = !flags.chem;
  }
  function toggleText() {
    counts.text++;
    if (counts.text > 1) {
      initFlags.text = false;
    }
    if (counts.text % 2 == 0) {
      btnClass.text = btnClasses.s;
    } else {
      btnClass.text = btnClasses.p;
    }
    flags.text = !flags.text;
  }
</script>

<style>
  .floating {
    /* position: fixed;
    left: 5px;
    top: 5px; */
    margin: 1px;
  }
</style>

<div class="floating row center">
  <button class="btn {btnClass.power}" on:click={togglePower}> Power </button>
  <button class="btn {btnClass.com}" on:click={toggleCom}> Com </button>
  <button class="btn {btnClass.meca}" on:click={toggleMeca}> Meca </button>
  <button class="btn {btnClass.civil}" on:click={toggleCivil}> Civil </button>
  <button class="btn {btnClass.prod}" on:click={toggleProd}>
    Production
  </button>
  <button class="btn {btnClass.chem}" on:click={toggleChem}> Chemistry </button>
  <button class="btn {btnClass.text}" on:click={toggleText}> Textile </button>
</div>

<!-- <App {courses} /> -->

{#if flags.power}
  <AppPower flag={initFlags.power} />
{/if}

{#if flags.com}
  <AppCom flag={initFlags.com} />
{/if}

{#if flags.meca}
  <AppMeca flag={initFlags.meca} />
{/if}

{#if flags.civil}
  <AppCivil flag={initFlags.civil} />
{/if}

{#if flags.prod}
  <AppProd flag={initFlags.prod} />
{/if}

{#if flags.chem}
  <AppChem flag={initFlags.chem} />
{/if}

{#if flags.text}
  <AppText flag={initFlags.text} />
{/if}

<!-- 
{#if flag}
  <AppMeca courses={courses1} />
{/if} -->
