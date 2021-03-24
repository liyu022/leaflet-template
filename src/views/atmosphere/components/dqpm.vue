<template>
  <div class="zdcx">
    <el-tabs v-model="activeName">
      <el-tab-pane label="AQI排名" name="1">
        <el-table :data="tableData" style="width: 100%" stripe size="mini" height="750px">
          <el-table-column prop="index" label="名次" width="50"></el-table-column>
          <el-table-column prop="name" label="地市名称" width="100"></el-table-column>
          <el-table-column prop="zt" label="AQI">
            <template slot-scope="scope">
              <div class="title">
                <div>良</div>
                <div>{{scope.row.AQI}}</div>
              </div>
              <el-progress :percentage="scope.row.AQI" :show-text="false" :color="customColors"></el-progress>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="优良天数" name="2">
        <div>优良天数</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activeName:'1',
      customColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
      tableData: [
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
        {index: 1, name: '延安市', AQI: +(Math.random() * 100).toFixed(2)},
      ]
    }
  }
}
</script>

<style scoped>
.zdcx{
  width: 400px;
  height: 844px;
  background: #FFFFFF;
  border: 1px solid #8DB0F0;
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
}
.title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
