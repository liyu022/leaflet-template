<template>
  <div id="maptools">
    <el-row>
      <el-button
        v-on:click="startPoint"
        type="primary"
        icon="el-icon-edit"
        circle
      ></el-button>
      <el-button
        v-on:click="startDrawPolygon"
        type="success"
        icon="el-icon-check"
        circle
      ></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button
        v-on:click="clearGrahics"
        type="danger"
        icon="el-icon-delete"
        circle
      ></el-button>
    </el-row>
  </div>
</template>

<script>
import MapInt from "../../components/maps/MapInt";
export default {
  data() {
    return {
      DRAWING: false, //是否正在绘制
      DRAWLAYERS: [],
      BarDRAWLAYERS: [],
      ISMEASURE: true, //是否是量距
      MEASURETOOLTIP: null, //量距提示
      MEASUREAREATOOLTIP: null, //量面提示
      MEASURERESULT: 0, //测量结果

      DRAWPOLYLINE: null, //绘制的折线
      DRAWMOVEPOLYLINE: null, //绘制过程中的折线
      DRAWPOLYLINEPOINTS: [], //绘制的折线的节点集

      DRAWPOLYGON: null, //绘制的面
      DRAWMOVEPOLYGON: null, //绘制过程中的面
      DRAWPOLYGONPOINTS: [], //绘制的面的节点集
      layerGroups: null,
      //设置点的样式二
      marker: null,
      shapeOptions: {
        color: "#F54124",
        weight: 3,
        opacity: 0.8,
        fill: false,
        clickable: true,
      },
    };
  },
  created() {},
  mounted() {
    this.layerGroups = new L.layerGroup();
    MapInt.getInstance().addLayer(this.layerGroups);
  },
  methods: {
    startPoint() {
      MapInt.getInstance().getContainer().style.cursor = "crosshair";
      this.MEASURERESULT = 0;
      this.ISMEASURE = true;
      this.DRAWPOLYLINE = new L.Polyline([], this.shapeOptions); //绘制的折线
      MapInt.getInstance().addLayer(this.DRAWPOLYLINE);
      if (this.ISMEASURE) {
        //是否是量距
        this.MEASURETOOLTIP = new L.Tooltip(MapInt.getInstance()); //量距提示
      }
      MapInt.getInstance().on("mousedown", this.onClick);
      MapInt.getInstance().on("dblclick", this.onDoubleClick);
    },
    onClick(e) {
      this.DRAWING = true; //是否正在绘制
      this.DRAWPOLYLINEPOINTS.push(e.latlng); //绘制的折线的节点集
      if (this.DRAWPOLYLINEPOINTS.length > 1 && this.ISMEASURE) {
        //是否是量距
        this.MEASURERESULT += e.latlng.distanceTo(
          this.DRAWPOLYLINEPOINTS[this.DRAWPOLYLINEPOINTS.length - 2]
        );
      }
      this.DRAWPOLYLINE.addLatLng(e.latlng); //绘制的折线
      MapInt.getInstance().on("mousemove", this.onMove);
    },
    onMove(e) {
      if (this.DRAWING) {
        //是否正在绘制
        if (
          this.DRAWMOVEPOLYLINE != undefined &&
          this.DRAWMOVEPOLYLINE != null
        ) {
          //绘制过程中的折线
          MapInt.getInstance().removeLayer(this.DRAWMOVEPOLYLINE);
        }
        let prevPoint = this.DRAWPOLYLINEPOINTS[
          this.DRAWPOLYLINEPOINTS.length - 1
        ];
        this.DRAWMOVEPOLYLINE = new L.Polyline(
          [prevPoint, e.latlng],
          this.shapeOptions
        );
        MapInt.getInstance().addLayer(this.DRAWMOVEPOLYLINE);
      }
    },
    onDoubleClick(e) {
      MapInt.getInstance().getContainer().style.cursor = "";
      /*显示两点距离*/
      let distance =
        this.MEASURERESULT +
        e.latlng.distanceTo(
          this.DRAWPOLYLINEPOINTS[this.DRAWPOLYLINEPOINTS.length - 1]
        );
      this.marker = new L.marker(e.latlng, {
        icon: L.icon({
          iconUrl: "../assets/point.png",
          iconSize: [25, 30],
        }),
      });
      console.log(this.MEASURERESULT);
      this.layerGroups.addLayer(this.marker);
      this.marker.bindPopup((distance / 1000).toFixed(2) + "公里").openPopup();
      if (this.DRAWING) {
        if (
          this.DRAWMOVEPOLYLINE != undefined &&
          this.DRAWMOVEPOLYLINE != null
        ) {
          MapInt.getInstance().removeLayer(this.DRAWMOVEPOLYLINE);
          this.DRAWMOVEPOLYLINE = null;
        }
        this.BarDRAWLAYERS.push(this.DRAWPOLYLINE);
        this.DRAWPOLYLINEPOINTS = [];
        this.DRAWING = false;
        this.ISMEASURE = false;
        MapInt.getInstance().off("mousedown");
        MapInt.getInstance().off("mousemove");
        MapInt.getInstance().off("dblclick");
      }
    },
    clearGrahics() {
      if (this.BarDRAWLAYERS.length) {
        for (var i = 0; i < this.BarDRAWLAYERS.length; i++) {
          MapInt.getInstance().removeLayer(this.BarDRAWLAYERS[i]);
        }
      }
      this.BarDRAWLAYERS = [];
      if (this.layerGroups) {
        this.layerGroups.clearLayers();
      }
    },
    startDrawPolygon(func) {
      this.MEASURERESULT = 0;
      MapInt.getInstance().getContainer().style.cursor = "crosshair";
      MapInt.getInstance().on("mousedown", (e) => {
        this.DRAWING = true;
        this.DRAWPOLYGONPOINTS.push(e.latlng);
        this.DRAWPOLYGON.addLatLng(e.latlng);
      });
      MapInt.getInstance().on("mousemove", (e) => {
        if (this.DRAWING) {
          if (
            this.DRAWMOVEPOLYGON != undefined &&
            this.DRAWMOVEPOLYGON != null
          ) {
            MapInt.getInstance().removeLayer(this.DRAWMOVEPOLYGON);
          }
          let prevPoint = this.DRAWPOLYGONPOINTS[
            this.DRAWPOLYGONPOINTS.length - 1
          ];
          let firstPoint = this.DRAWPOLYGONPOINTS[0];
          this.DRAWMOVEPOLYGON = new L.Polygon(
            [firstPoint, prevPoint, e.latlng],
            this.shapeOptions
          );
          MapInt.getInstance().addLayer(this.DRAWMOVEPOLYGON);
        }
      });
      MapInt.getInstance().on("dblclick", (e) => {
        alert();
        MapInt.getInstance().getContainer().style.cursor = "";
        let tempPoints = [];
        for (var i = 0; i < this.DRAWPOLYGONPOINTS.length; i++) {
          tempPoints.push(this.DRAWPOLYGONPOINTS[i]);
        }
        tempPoints.push(e.latlng);
        let distance = this.CalArea(tempPoints);
        this.marker = new L.marker(e.latlng, {
          icon: L.icon({
            iconUrl: "../assets/point.png",
            iconSize: [25, 30],
          }),
        });
        this.layerGroups.addLayer(this.marker);
        this.marker
          .bindPopup("总面积：" + (distance / 1000000).toFixed(3) + "平方公里")
          .openPopup();
        if (this.DRAWING) {
          if (
            this.DRAWMOVEPOLYGON != undefined &&
            this.DRAWMOVEPOLYGON != null
          ) {
            MapInt.getInstance().removeLayer(this.DRAWMOVEPOLYGON);
            this.DRAWMOVEPOLYGON = null;
          }
          this.BarDRAWLAYERS.push(this.DRAWPOLYGON);

          this.DRAWPOLYGONPOINTS = [];
          this.DRAWING = false;
          this.ISMEASURE = false;
          MapInt.getInstance().off("mousedown");
          MapInt.getInstance().off("mousemove");
          MapInt.getInstance().off("dblclick");
        }
      });
      let shapeOptions = {
        color: "#F54124",
        weight: 3,
        opacity: 0.8,
        fill: true,
        fillColor: null,
        fillOpacity: 0.2,
        clickable: true,
      };
      this.DRAWPOLYGON = new L.Polygon([], shapeOptions);
      MapInt.getInstance().addLayer(this.DRAWPOLYGON);
    },
    CalArea(latLngs) {
      let pointsCount = latLngs.length;
      let area = 0.0;
      let d2r = Math.PI / 180;
      let p1, p2;
      if (pointsCount > 2) {
        for (var i = 0; i < pointsCount; i++) {
          p1 = latLngs[i];
          p2 = latLngs[(i + 1) % pointsCount];
          area +=
            (p2.lng - p1.lng) *
            d2r *
            (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
        }
        area = (area * 6378137.0 * 6378137.0) / 2.0;
      }
      return Math.abs(area);
    },
  },
};
</script>

<style>
#maptools {
  position: absolute;
  width: 230px;
  height: 50px;
  top: 50px;
  right: 20px;
  background-color: #fefefd;
  z-index: 100000;
  line-height: 50px;
  text-align: center;
  border: 1px solid #f3f1f7;
  border-radius: 5px;
}
</style>
