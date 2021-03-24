<template>
  <div class="zdcx">
    <el-input
      placeholder="请输入项目名称"
      suffix-icon="el-icon-search"
      v-model="input1"
      class="input2"
    ></el-input>
    <div class="title">条件查询</div>
    <div class="select">
      <el-select v-model="value" placeholder="项目所属" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="项目名称" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="起止地点" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="拟建长度" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="实际开工时间" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="value" placeholder="项目状态" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="bottom">
      <el-button type="primary" size="small">查询</el-button>
      <el-button type="text" size="small">重置</el-button>
      <el-button
        type="text"
        size="small"
        class="right"
        @click="showTable = !showTable"
        >显示列表
        <img
          src="@/assets/common/jiantou.png"
          alt="jiantou"
          :style="{ transform: 'rotate(180deg)' }"
      /></el-button>
    </div>
    <transition name="bounce">
      <el-table
        :data="tableData"
        style="width: 100%;"
        v-if="showTable"
        stripe
        size="mini"
        height="500px"
      >
        <el-table-column prop="name" label="站点名称"></el-table-column>
        <el-table-column prop="AQI" label="AQI"></el-table-column>
        <el-table-column prop="zt" label="状态">
          <template slot-scope="scope">
            <div class="zt">{{ scope.row.zt }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="sywrw" label="首要污染物"></el-table-column>
      </el-table>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTable: false,
      options: [
        { value: "选项1", label: "黄金糕" },
        { value: "选项2", label: "双皮奶" },
        { value: "选项3", label: "蚵仔煎" },
        { value: "选项4", label: "龙须面" },
        { value: "选项5", label: "北京烤鸭" },
      ],
      value: "",
      input1: "",
      tableData: [
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
        { name: "黄月钩子#56047", AQI: "84", zt: "优", sywrw: "PM2.5 , O3" },
      ],
    };
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

.zdcx {
  width: 400px;
  background: #ffffff;
  border: 1px solid #8db0f0;
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.17);
  border-radius: 4px;

  .title {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 6px;
  }

  .select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    margin-bottom: 8px;
  }

  .bottom {
    position: relative;
    margin-bottom: 20px;

    .right {
      position: absolute;
      right: 0;
    }
  }
}

.zt {
  width: 40px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  background: #91d266;
  border-radius: 2px;
  color: #fff;
}
.input2 ::v-deep .el-input__inner::placeholder {
  color: #2669e2;
}
</style>
