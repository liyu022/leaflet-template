<template>
  <div class="atmosphere">
    <!-- 左侧导航 -->
    <leftBox @changeItemId="changeItemId" :itemId="itemId" :boxList="boxList"/>
    <transition name="bounce">
      <!-- 业务概览 -->
      <ywgl class="mokuai" v-if="itemId == '1'"></ywgl>

      <!-- 污水运营: 污水处理 污泥处理 再生利用-->
      <wscl class="mokuai" v-if="itemId == '2-1'"></wscl>
      <wncl class="mokuai" v-if="itemId == '2-2'"></wncl>
      <zsly class="mokuai" v-if="itemId == '2-3'"></zsly>

      <!-- 污水在建: 再生利用 污水处理 污泥处置 配套管网-->
      <zsly2 class="mokuai" v-if="itemId == '3-1'"></zsly2>
      <wscl2 class="mokuai" v-if="itemId == '3-2'"></wscl2>
      <wncz class="mokuai" v-if="itemId == '3-2'"></wncz>
      <ptgw class="mokuai" v-if="itemId == '3-3'"></ptgw>

      <!-- 敏感区域 -->
      <mgqy class="mokuai" v-if="itemId == '4'"></mgqy>
    </transition>
  </div>
</template>

<script>
import leftBox from "@/components/leftBox/index";
import wscl from "./components/wscl.vue";
import wncl from "./components/wncl.vue";
import zsly from "./components/zsly.vue";
import zsly2 from "./components/zsly2.vue";
import wscl2 from "./components/wscl2.vue";
import wncz from "./components/wncz.vue";
import ptgw from "./components/ptgw.vue";
import ywgl from "./components/ywgl.vue";
import mgqy from "./components/mgqy.vue";

export default {
  components: {
    leftBox,
    wscl,
    wncl,
    zsly,
    zsly2,
    wscl2,
    wncz,
    ptgw,
    ywgl,
    mgqy
  },
  data() {
    return {
      itemId: 0,
      boxList: [
        {
          title: "业务概览",
          id:'1'
        },
        {
          title: "污水运营",
          id:'2',
          child: [
            { title: "污水处理", id: '2-1' },
            { title: "污泥处理", id: '2-2' },
            { title: "再生利用", id: '2-3' },
          ],
        },
        {
          title: "污水在建",
          id:'3',
          child: [
            { title: "再生利用", id: '3-1' },
            { title: "污水处理", id: '3-2' },
            { title: "污泥处置", id: '3-3' },
            { title: "配套管网", id: '3-4' },
          ],
        },
        {
          title: "敏感区域",
          id:'4',
        },
      ],
    };
  },
  methods: {
    changeItemId(id) {
      this.itemId = 0;
      // gis 地图变化
      // 。。。
      setTimeout(() => {
        this.itemId = id;
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: opacitys 0.5s;
}

.bounce-leave-active {
  animation: opacitys 0.5s reverse;
}

@keyframes opacitys {
  0% {
    filter: blur(10px);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

.mokuai {
  position: absolute;
  left: 150px;
  top: 0;
  padding: 16px;
  box-sizing: border-box;
}
</style>
