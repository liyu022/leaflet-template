<template>
  <div class="layerSwitch">
    <div
      class="imgef item"
      @click="vectorClick"
      :style="{ zIndex: index == 1 ? 9999 : 0 }"
    >
      地图
    </div>
    <div
      class="imget item"
      @click="imageClick"
      :style="{ zIndex: index == 2 ? 9999 : 0 }"
    >
      影像
    </div>
  </div>
</template>
<script>
import MapInt from "../../components/maps/MapInt";
import mapConfig from "../../components/maps/mapConfig";
import LayerUtils from "../../components/maps/LayerUtils";
import L from "leaflet";
export default {
  data() {
    return {
      index: 1,
    };
  },
  mounted() {},
  methods: {
    imageClick() {
      MapInt.pGroupLayers.clearLayers();
      this.index = 2;
      this.layer1 = LayerUtils.addTileLayer(mapConfig.imgVector, 2);
      this.layer2 = LayerUtils.addTileLayer(mapConfig.imgVectorL, 1);
    },
    vectorClick() {
      this.index = 1;
      MapInt.pGroupLayers.clearLayers();
      LayerUtils.addTileLayer(mapConfig.dtVector, 2);
      LayerUtils.addTileLayer(mapConfig.dtVectorL, 1);
    },
  },
};
</script>

<style>
.layerSwitch {
  width: 76px;
  height: 76px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  color: rgb(12, 235, 235);
  cursor: pointer;
  z-index: 999;
  border-radius: 4px;
}
.layerSwitch:hover .imget {
  transform: translateX(-72px);
}
.imgef {
  position: absolute;
  top: 0;
  right: 0;
  width: 76px;
  height: 76px;
  background-image: url("../../assets/maptype.de0b032.jpg");
  background-repeat: no-repeat;
  background-size: 76px 152px;
  background-position: top;
  border: 4px solid #fff;
  box-sizing: border-box;
  border-radius: 4px;
}
.imget {
  position: absolute;
  top: 0;
  right: 0;
  width: 76px;
  height: 76px;
  background-image: url("../../assets/maptype.de0b032.jpg");
  background-repeat: no-repeat;
  background-size: 76px 152px;
  background-position: bottom;
  transition: transform 0.5s;
  border: 4px solid #fff;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
