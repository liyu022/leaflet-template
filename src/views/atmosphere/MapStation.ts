import MapInt from "../../components/maps/MapInt";
import axios from "../../server/axios";
import HxMarker from "../../components/maplibs/HxMarker";
import L from "leaflet";
//加载空气质量站点
export const loadAirStationLayer = (code: string, type: string) => {
  axios
    .get("/api/gis/aqi/initGkSkandshikData", {
      cityCode: code,
      stationattris: type,
    })
    .then((res: any) => {
      let pic1 = require("@/assets/map/gas/优.png");
      let pic2 = require("@/assets/map/gas/良.png");
      let pic3 = require("@/assets/map/gas/轻度污染.png");
      let pic4 = require("@/assets/map/gas/中度污染.png");
      let pic5 = require("@/assets/map/gas/重度污染.png");
      let pic6 = require("@/assets/map/gas/严重污染.png");
      let datas: Array<any> = res.data;
      if (datas) {
        MapInt.tempGroupLayer.clearLayers();
        datas.forEach((item) => {
          if (item.LATITUDE && item.LONGITUDE) {
            let hxMarker = new HxMarker([
              Number.parseFloat(item.LATITUDE),
              Number.parseFloat(item.LONGITUDE),
            ]).addTo(MapInt.tempGroupLayer);
            hxMarker.setAttr(item);
            let value = item.AQI;
            if (value >= 0 && value < 50) {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic1,
                })
              );
            } else if (value >= 50 && value < 100) {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic2,
                })
              );
            } else if (value >= 100 && value < 150) {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic3,
                })
              );
            } else if (value >= 150 && value < 200) {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic4,
                })
              );
            } else if (value >= 200 && value < 300) {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic5,
                })
              );
            } else if (value >= 300 && value < 500) {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic6,
                })
              );
            } else if (value >= 500) {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic6,
                })
              );
            } else {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic1,
                })
              );
            }
          }
        });
      }
    });
};
//加载气象站点
export const loadQxStationLayer = (code: string, type: string) => {
  axios
    .get("/api/gis/gis/getWetherLiveData", {
      cityCode: code,
      stationattris: type,
    })
    .then((res: any) => {
      let pic1 = require("@/assets/map/qxz/yb.png");
      let pic2 = require("@/assets/map/qxz/jb.png");
      let pic3 = require("@/assets/map/qxz/jz.png");
      let datas: Array<any> = res.data;
      if (datas) {
        MapInt.qxGroupLayer.clearLayers();
        datas.forEach((item) => {
          if (item.latitude && item.longitude) {
            let hxMarker = new HxMarker([
              Number.parseFloat(item.latitude),
              Number.parseFloat(item.longitude),
            ]).addTo(MapInt.qxGroupLayer);
            hxMarker.setAttr(item);
            let value = item.grade;
            if (value === "一般站") {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic1,
                })
              );
            } else if (value === "基础站") {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic2,
                })
              );
            } else if (value === "基准站") {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic3,
                })
              );
            } else {
              hxMarker.setIcon(
                L.icon({
                  iconUrl: pic1,
                })
              );
            }
          }
        });
      }
    });
};
