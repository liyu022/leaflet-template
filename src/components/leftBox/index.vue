<template>
  <div class="left-box">
    <div class="item" v-for="(item, index) in boxList" :key="index">
      <div class="box" @click="changeShowChild(item, index)">
        <div>{{ item.title }}</div>
        <img
            src="@/assets/common/jiantou.png"
            alt="jiantou"
            :style="{
            transform: index === navIndex ? 'rotate(180deg)' : '' ,
            opacity: item.child && item.child.length > 1 ? '1' : '0'
          }"
        />
      </div>
      <transition name="bounce">
        <div
            class="navs"
            v-if="index === navIndex && item.child && item.child.length > 1"
            :style="{ height: 40 * item.child.length + 'px' }"
        >
          <div
              class="nav"
              :style="{ color: itemId == val.id ? '#2568E2' : '' }"
              v-for="val in item.child"
              :key="val.id"
              @click="changeItemId(val.id)"
          >
            {{ val.title }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemId","boxList"],
  data() {
    return {
      navIndex: -1,
    };
  },
  methods: {
    changeItemId(id) {
      this.$emit("changeItemId", id);
    },
    changeShowChild(item, index) {
      this.$emit("changeItemId", item.id);
      if (this.navIndex === index) {
        this.navIndex = -1;
      } else {
        this.navIndex = index;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: slide-in-fwd-top 0.5s;
}

.bounce-leave-active {
  animation: slide-in-fwd-top 0.5s reverse;
}

@keyframes slide-in-fwd-top {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.left-box {
  width: 140px;
  .top {
    width: 100%;
    height: 48px;
    background: #4386ff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    text-indent: -43px;
    border-bottom: 1px solid #c7deff;
  }

  .item {
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #c7deff;
    position: relative;

    .box {
      width: 100%;
      height: 48px;
      background: #4386ff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
    }

    .navs {
      position: relative;
      background: #fff;
      padding: 10px 0 10px 30px;

      .nav {
        border-left: 1px solid #ededed;
        padding-left: 10px;
        line-height: 40px;
        cursor: pointer;

        &:hover {
          background: #dbeaff;
        }
      }
    }
  }
}
</style>
