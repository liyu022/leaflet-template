<template>
  <div id="app">
    <Layouts/>
  </div>
</template>

<script>
import Layouts from "./layouts"

export default {
  components: {Layouts}
}
</script>

<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
  user-select:none;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
