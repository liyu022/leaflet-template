<template>
  <header class="header">
    <div class="center">
      <div class="item" v-for="(item,index) in navList" :key="item.router"
           :class="$route.path === item.router ? (index > 2 ? 'itemactive2' : 'itemactive1') : ''"
           @click="changeNav(item)">
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {title: '空气质量', router: '/'},
        {title: '流域水', router: '/water'},
        {title: '污染源', router: '/pollution'},
        {title: '垃圾处理', router: '/garbage'},
        {title: '污水处理', router: '/sewage'},
        {title: '生态旅游', router: '/ecology'}
      ]
    }
  },
  methods: {
    changeNav(item) {
      this.$router.push(item.router)
      // 改变路由初始化gis页面
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 103px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 99999999;
  background-image: url("../assets/common/header.png");
  background-repeat: no-repeat;
  background-size: 1920px 103px;
  background-position: center;

  .center {
    width: 1428px;
    display: flex;
    align-items: center;

    .item{
      width: 158px;
      color: #fff;
      line-height: 58px;
      text-align: center;
      cursor: pointer;
      &:hover{
        font-weight: bold;
        background-size: 158px 58px;
        background-position: center;
      }
      &active1,
      &:nth-child(1):hover,
      &:nth-child(2):hover,
      &:nth-child(3):hover{
        background: url("../assets/common/active1.png");
      }
      &active2,
      &:nth-child(4):hover,
      &:nth-child(5):hover,
      &:nth-child(6):hover{
        background: url("../assets/common/active2.png");
      }
      &:nth-child(3){
        margin-right: 480px;
      }
    }
  }
}
</style>
