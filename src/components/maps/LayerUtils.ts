import MapInt from "./MapInt";
import L from "leaflet";
import HxMark from "../maplibs/HxMarker"
export default class LayerUtils {
  static attrib: string = "&copy xx";
  static addTileLayer = (url: string, index: number): L.TileLayer => {
    let basemap = L.tileLayer(url + "/tile/{z}/{y}/{x}", {
      tileSize: 256,
      attribution: LayerUtils.attrib,
    });
    if (MapInt.pGroupLayers.hasLayer(basemap)) {
      basemap.remove();
    }
    MapInt.pGroupLayers.addLayer(basemap).setZIndex(index);
    return basemap;
  };
}
