import Vue from "vue";
import L from "leaflet";
import "proj4leaflet";
import "proj4";
import mapConfig from "./mapConfig";
export default class MapInt {
  static maps: L.Map;
  static domid: string;
  static layersArr: any[] = [];
  static getInstance = (): L.Map => {
    if (!MapInt.maps) {
      MapInt.maps = MapInt.IntMap(MapInt.domid);
    }
    MapInt.maps.addLayer(MapInt.pGroupLayers);
    MapInt.maps.addLayer(MapInt.tempGroupLayer);
    MapInt.maps.addLayer(MapInt.qxGroupLayer);
    MapInt.maps.addLayer(MapInt.tempLayers);
    return MapInt.maps;
  };
  static getLayerById = (id: string): any => {
    let pLayer = MapInt.layersArr.filter((x) => {
      return x.id === id;
    });
    if (pLayer.length === 1) {
      return pLayer[0].player;
    } else {
      return;
    }
  };
  static setLayerInfo = (layerid: string, layr: L.Layer) => {
    if (MapInt.getLayerById(layerid)) {
      MapInt.removeLayerByid(layerid);
    }
    let layerInf = {
      id: layerid,
      player: layr,
    };
    MapInt.layersArr.push(layerInf);
  };
  static removeLayerByid = (lyrid: string) => {
    let pLayer = MapInt.getLayerById(lyrid);
    if (pLayer) {
      if (MapInt.getInstance().hasLayer(pLayer)) {
        MapInt.getInstance().removeLayer(pLayer);
      }
    }
    MapInt.layersArr.splice(
      MapInt.layersArr.findIndex((item) => item.id === lyrid),
      1
    );
  };
  static pGroupLayers: L.LayerGroup = L.layerGroup();
  static tempGroupLayer: L.LayerGroup = L.featureGroup();
  static qxGroupLayer: L.LayerGroup = L.featureGroup();
  static tempLayers: L.LayerGroup = L.layerGroup();
  static IntMap = (divId: string): L.Map => {
    return L.map(divId, {
      minZoom: 3,
      maxZoom: 14,
      center: [34.27, 108.95],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
      crs: L.CRS.EPSG4326,
    });
  };
}
