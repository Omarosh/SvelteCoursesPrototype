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
  import AppNuc from "./AppNuc.svelte";
  import AppNaval from "./AppNaval.svelte";
  import AppComputer from "./AppComputer.svelte";
  import AppArch from "./AppArch.svelte";

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
    nuc: false,
    naval: false,
    computer: false,
    arch: false,
  };
  let initFlags = {
    meca: true,
    com: true,
    civil: true,
    power: true,
    prod: true,
    chem: true,
    text: true,
    nuc: true,
    naval: true,
    computer: true,
    arch: true,
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
    nuc: "btn-secondary",
    naval: "btn-secondary",
    computer: "btn-secondary",
    arch: "btn-secondary",
  };
  let counts = {
    meca: 0,
    com: 0,
    civil: 0,
    power: 0,
    prod: 0,
    chem: 0,
    text: 0,
    nuc: 0,
    naval: 0,
    computer: 0,
    arch: 0,
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
  function toggleNuc() {
    counts.nuc++;
    if (counts.nuc > 1) {
      initFlags.nuc = false;
    }
    if (counts.nuc % 2 == 0) {
      btnClass.nuc = btnClasses.s;
    } else {
      btnClass.nuc = btnClasses.p;
    }
    flags.nuc = !flags.nuc;
  }

  function toggleNaval() {
    counts.naval++;
    if (counts.naval > 1) {
      initFlags.naval = false;
    }
    if (counts.naval % 2 == 0) {
      btnClass.naval = btnClasses.s;
    } else {
      btnClass.naval = btnClasses.p;
    }
    flags.naval = !flags.naval;
  }
  function toggleComputer() {
    counts.computer++;
    if (counts.computer > 1) {
      initFlags.computer = false;
    }
    if (counts.computer % 2 == 0) {
      btnClass.computer = btnClasses.s;
    } else {
      btnClass.computer = btnClasses.p;
    }
    flags.computer = !flags.computer;
  }

  function toggleArch() {
    counts.arch++;
    if (counts.arch > 1) {
      initFlags.arch = false;
    }
    if (counts.arch % 2 == 0) {
      btnClass.arch = btnClasses.s;
    } else {
      btnClass.arch = btnClasses.p;
    }
    flags.arch = !flags.arch;
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
  <button class="btn {btnClass.nuc}" on:click={toggleNuc}> Nuclear </button>
  <button class="btn {btnClass.naval}" on:click={toggleNaval}> Naval </button>
  <button class="btn {btnClass.computer}" on:click={toggleComputer}>
    Computer
  </button>
  <button class="btn {btnClass.arch}" on:click={toggleArch}>
    Architecture
  </button>
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

{#if flags.nuc}
  <AppNuc flag={initFlags.nuc} />
{/if}

{#if flags.naval}
  <AppNaval flag={initFlags.naval} />
{/if}

{#if flags.computer}
  <AppComputer flag={initFlags.computer} />
{/if}

{#if flags.arch}
  <AppArch flag={initFlags.arch} />
{/if}

<!-- 
{#if flag}
  <AppMeca courses={courses1} />
{/if} -->
