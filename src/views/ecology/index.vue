<template>
  <div class="atmosphere">
    <!-- 左侧导航 -->
    <leftBox @changeItemId="changeItemId" :itemId="itemId" :boxList="boxList"/>

    <transition name="bounce">
      <!-- 旅游概览-->
      <lygl class="mokuai" v-if="itemId == '1'"/>
      <jdml class="mokuai" v-if="itemId == '2'"/>

      <!-- 美丽乡村：旅游特色名镇等-->
      <lytsmz class="mokuai" v-if="itemId == '3-1'"/>
      <lysfc class="mokuai" v-if="itemId == '3-2'"/>
      <lyzdc class="mokuai" v-if="itemId == '3-3'"/>
      <gjslc class="mokuai" v-if="itemId == '3-4'"/>
      <mlxxc class="mokuai" v-if="itemId == '3-5'"/>
    </transition>
  </div>
</template>

<script>
import leftBox from "@/components/leftBox/index";
import lygl from "./components/lygl";
import jdml from "./components/jdml";
import lytsmz from "./components/lytsmz";
import lysfc from "./components/lysfc";
import lyzdc from "./components/lyzdc";
import gjslc from "./components/gjslc";
import mlxxc from "./components/mlxxc";
export default {
  components:{
    leftBox,
    lygl,
    jdml,
    lytsmz,
    lysfc,
    lyzdc,
    gjslc,
    mlxxc
  },
  data() {
    return {
      itemId: 0,
      boxList: [
        {
          title: "旅游概览",
          id:'1'
        },
        {
          title: "景点名录",
          id:'2'
        },
        {
          title: "美丽乡村",
          id:'3',
          child: [
            { title: "旅游特色镇", id: '3-1' },
            { title: "旅游示范村", id: '3-2' },
            { title: "旅游重点村", id: '3-3' },
            { title: "国家森林村", id: '3-4' },
            { title: "美丽休闲村", id: '3-5' },
          ],
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
