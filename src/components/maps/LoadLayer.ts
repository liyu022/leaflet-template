import MapInt from "./MapInt";
import * as esri from "esri-leaflet";
import HeatmapOverlay from "../../../node_modules/heatmap.js/plugins/leaflet-heatmap";
import mapConfig from "./mapConfig";
import L from "leaflet";
import markercluster from "leaflet.markercluster/dist/leaflet.markercluster-src";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import HxMarker from "@/components/maplibs/HxMarker"
const echarts = require("echarts");
export default class LoadLayer {
  //加载arcgis要素图层
  public loadPointLayer = (): any => {
    let picy = require("@/assets/point.png");
    let pFlayer = esri.featureLayer({
      url: mapConfig.fliyu,
      pointToLayer: function(geojson, latlng) {
        return new HxMarker(latlng).setIcon(L.icon({
          iconUrl: picy,
          iconSize: [20, 20],
        })).setAttr({
          "name1": "liyu"
        })
        // return L.marker(latlng, {
        //   icon: L.icon({
        //     iconUrl: picy,
        //     iconSize: [20, 20],
        //   }),
        // });
      },
    });
    MapInt.setLayerInfo("sxqxid", pFlayer);
    MapInt.getInstance().addLayer(pFlayer);
    pFlayer.on("click",function(res){
      console.log(res)
    })
    return pFlayer;
  };
  //设置热力图配置
  public setHeatConfig = (): any => {
    return {
      radius: "radius", //设置每一个热力点的半径
      maxOpacity: 0.5, //设置最大的不透明度
      minOpacity: 0.3, //设置最小的不透明度
      scaleRadius: true, //设置热力点是否平滑过渡
      blur: 0.95, //系数越高，渐变越平滑，默认是0.85,
      //滤镜系数将应用于所有热点数据。
      useLocalExtrema: true, //使用局部极值
      latField: "lat", //纬度
      lngField: "lng", //经度
      valueField: "value", //热力点的值
      gradient: {
        "0.99": "rgba(255,0,0,1)",
        "0.9": "rgba(255,255,0,1)",
        "0.8": "rgba(0,255,0,1)",
        "0.5": "rgba(0,255,255,1)",
        "0": "rgba(0,0,255,1)",
      },
    };
  };
  public createData = (gross, radius) => {
    let max = 0; //单点最大值
    let points: any[] = []; //点集合
    for (; gross > 0; gross--) {
      var val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      let point: any = {
        lat: Math.random() * 2.5 + 34, //经度
        lng: Math.random() * 2.5 + 108, //纬度
        count: val, //数据量大小
        radius: radius,
      };
      points.push(point);
    }
    return { max: max, data: points };
  };
  //加载热力图
  public addHeatMapLayer = () => {
    let heatmap_layer = new HeatmapOverlay(this.setHeatConfig());
    MapInt.setLayerInfo("rltid", heatmap_layer);
    MapInt.getInstance().addLayer(heatmap_layer);
    let data = this.createData(10000, 0.05);
    heatmap_layer.setData(data);
    return heatmap_layer;
  };
  //加载统计图
  public staticLayer = () => {
    let plableLayer = esri.featureLayer({
      url: mapConfig.cszxd,
      pointToLayer: function(geojson, latlng) {
        return L.marker(latlng, {
          icon: L.divIcon({
            html: "40",
            className: "myLable",
          }),
        });
      },
    });
    MapInt.setLayerInfo("sxtjid", plableLayer);
    MapInt.getInstance().addLayer(plableLayer);
    return plableLayer;
  };
  public loadEchartLayer = () => {
    let pGroupLayer = L.layerGroup();
    let pLayer = MapInt.getLayerById("sxtjid");
    if (pLayer) {
      MapInt.getInstance().removeLayer(pLayer);
    }
    MapInt.setLayerInfo("echartid", pGroupLayer);
    MapInt.getInstance().addLayer(pGroupLayer);
    let that = this;
    esri
      .featureLayer({
        url: mapConfig.cszxd,
      })
      .query()
      .run(function(error, featureCollection) {
        if (featureCollection.features) {
          featureCollection.features.forEach((ele) => {
            let echartId: string = "echart" + ele.properties.FID;
            let html =
              "<div id=echart" +
              ele.properties.FID +
              " style='width:90px;height:90px;position:relative;background-color:transparent;'><div>";
            pGroupLayer.addLayer(
              L.marker(
                [ele.geometry.coordinates[1], ele.geometry.coordinates[0]],
                {
                  icon: L.divIcon({
                    className: "leaflet-echart-icon",
                    iconSize: [90, 90],
                    html: html,
                  }),
                }
              )
            );

            that.setEchart(echartId);
          });
        }
      });
  };
  public setEchart = (id: any) => {
    let myChart = echarts.init(document.getElementById(id) as any);
    let option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
        axisTick: {
          //y轴刻度线
          show: false,
        },
        axisLine: {
          //y轴
          show: false,
        },
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)",
          },
        },
      ],
    };
    myChart.setOption(option);
  };
  public loadClusterLayer = () => {
    let markArr: any = [];
    let clusterPic = require("../../assets/良.png");
    let markClusters = new markercluster().MarkerClusterGroup({
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      chunkedLoading: true,
      maxClusterRadius: 80, //默认80
      // iconCreateFunction: function(cluster) {
      //   return L.divIcon({ html: "<b>" + cluster.getChildCount() + "</b>" });
      // },
    });
    esri
      .featureLayer({
        url: mapConfig.fsqy,
      })
      .query()
      .run(function(error, featureCollection) {
        featureCollection.features.forEach((ele) => {
          let marks = L.marker(
            [ele.geometry.coordinates[1], ele.geometry.coordinates[0]],
            {
              icon: L.icon({
                iconUrl: clusterPic,
                iconSize: [20, 20],
              }),
            }
          );
          markArr.push(marks);
        });
        markClusters.addLayers(markArr);
        MapInt.setLayerInfo("clusetrId", markClusters);
        MapInt.getInstance().addLayer(markClusters);
      });
  };
}
