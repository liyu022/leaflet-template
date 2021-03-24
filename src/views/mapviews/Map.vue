<template>
  <div>
    <div id="mapid"></div>
  </div>
</template>
<script>
import Vue from "vue/dist/vue.esm.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "proj4leaflet";
import "proj4";
import mapConfig from "../../components/maps/mapConfig";
import MapInt from "../../components/maps/MapInt";
import LayerUtils from "../../components/maps/LayerUtils";
import * as esri from "esri-leaflet";
import LoadLayer from "../../components/maps/LoadLayer";
import HeatmapOverlay from "heatmap.js/plugins/leaflet-heatmap";
import icon from "leaflet/src/images/marker.min.svg";
import shades from "leaflet/src/images/shadow.svg";
import MapPop from "./MapPop";
import HxMarker from "@/components/maplibs/HxMarker";
import MapMenu from "../mapviews/MapMenu";
import * as MapStation from "../atmosphere/MapStation";
export default {
  components: {
    MapPop,
    MapMenu
  },
  created() {},
  mounted() {
    this.setDeafultStyle();
    MapInt.domid = "mapid";
    MapInt.getInstance().fitBounds(
      L.latLngBounds(
        L.latLng(mapConfig.mapExtent.ymin, mapConfig.mapExtent.xmin),
        L.latLng(mapConfig.mapExtent.ymax, mapConfig.mapExtent.xmax)
      )
    );
    LayerUtils.addTileLayer(mapConfig.dtVector, 1);
    LayerUtils.addTileLayer(mapConfig.dtVectorL, 2);
    //加载空气质量点位图层
    MapStation.loadQxStationLayer("", "1");
    let that = this;
    MapInt.tempGroupLayer.on("click", function(evt) {
      that.setPopInfo(evt);
      MapInt.getInstance().flyTo(evt.latlng, 8);
      let pMapMenu = Vue.extend(MapMenu);
      new pMapMenu().$mount("#contentId");
      that.setSelecSys(evt.latlng);
    });
    MapInt.qxGroupLayer.on("click", function(evt) {
      that.setPopInfo(evt);
      MapInt.getInstance().flyTo(evt.latlng, 8);
      let pMapMenu = Vue.extend(MapMenu);
      new pMapMenu().$mount("#contentId");
      that.setSelecSys(evt.latlng);
    });
    MapInt.getInstance().on("popupclose", function() {
      MapInt.tempLayers.clearLayers();
    });
  },
  methods: {
    setDeafultStyle() {
      let picy = require("@/assets/良.png");
      let DefaultIcon = L.icon({
        iconUrl: picy,
        iconSize: [20, 20]
      });
      L.Marker.prototype.options.icon = DefaultIcon;
    },
    createData(gross, radius) {
      var max = 0; //单点最大值
      var points = []; //点集合
      for (; gross > 0; gross--) {
        var val = Math.floor(Math.random() * 100);
        max = Math.max(max, val);
        var point = {
          lat: Math.random() * 2.5 + 34, //经度
          lng: Math.random() * 2.5 + 108, //纬度
          count: val, //数据量大小
          radius: radius
        };
        points.push(point);
      }
      return { max: max, data: points };
    },
    setPopInfo(evt) {
      let popup = L.popup({
        minWidth: 110
      })
        .setLatLng(evt.latlng)
        .setContent("<div id='contentId'>sss</div>")
        .openOn(MapInt.getInstance());
    },
    setSelecSys(latLng) {
      MapInt.tempLayers.clearLayers();
      let pMarker = L.marker(latLng)
        .setIcon(
          L.icon({
            iconUrl: require("@/assets/map/矩形.png"),
            iconSize: [20, 20]
          })
        )
        .addTo(MapInt.tempLayers);
    }
  }
};
</script>

<style>
#mapid {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.myLable {
  background-color: #4c60f1;
  height: 40px !important;
  width: 40px !important;
  line-height: 40px !important;
  text-align: center;
  border-radius: 20px;
  color: white;
}
</style>
