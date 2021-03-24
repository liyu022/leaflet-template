<template>
  <div class="atmosphere">
    <!-- 左侧导航 -->
    <leftBox @changeItemId="changeItemId" :itemId="itemId" :boxList="boxList"/>

    <transition name="bounce">
      <!-- 大气站：站点查询 站点统计 地区排名 考核管理-->
      <zdcx class="mokuai" v-if="itemId == 1"/>
      <zdtj class="mokuai" v-if="itemId == 2"/>
      <dqpm class="mokuai" v-if="itemId == 3"/>
      <khgl class="mokuai" v-if="itemId == 4"/>

      <!-- 气象站：站点查询 气象信息-->
      <zdcx2 class="mokuai" v-if="itemId == 5"/>
      <qxxx class="mokuai" v-if="itemId == 6"/>
    </transition>
  </div>
</template>

<script>
import leftBox from "@/components/leftBox/index";
import zdcx from "./components/zdcx";
import zdtj from "./components/zdtj";
import qxxx from "./components/qxxx";
import zdcx2 from "./components/zdcx2";
import khgl from "./components/khgl";
import dqpm from "./components/dqpm";

export default {
  components: {
    leftBox,
    zdcx,
    zdtj,
    qxxx,
    zdcx2,
    khgl,
    dqpm
  },
  data() {
    return {
      itemId: 0,
      boxList: [
        {
          title: '大气站',
          img: require('../../assets/atmosphere/icon1.png'),
          child: [
            {title: '站点查询', id: 1},
            {title: '站点统计', id: 2},
            {title: '地区排名', id: 3},
            {title: '考核管理', id: 4}
          ]
        },
        {
          title: '气象站',
          img: require('../../assets/atmosphere/icon2.png'),
          child: [
            {title: '站点查询', id: 5},
            {title: '气象信息', id: 6}
          ]
        }
      ]
    }
  },
  methods: {
    changeItemId(id) {
      this.itemId = 0
      // gis 地图变化
      // 。。。
      setTimeout(()=>{
        this.itemId = id
      },500)
    }
  }
}
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: opacitys .5s;
}

.bounce-leave-active {
  animation: opacitys .5s reverse;
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
