<template>
  <div class="layouts">
    <!-- 公共头部 -->
    <Header/>
    <!-- gis地图 -->
    <MapView/>
    <!-- 路由（水，大气，土壤，污染源） -->
    <div class="router">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './header'
import MapView from '../views/mapviews/ViewContent'

export default {
  components: {
    Header,
    MapView
  }
}
</script>

<style scoped lang="scss">
.layouts {
  width: 100vw;
  height: 100vh;
  position: relative;

  .router {
    position: absolute;
    top: 100px;
    left: 0;
    z-index: 999;
  }
}
</style>
