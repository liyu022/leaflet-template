
L.HxMarker = L.Marker.extend({
    _customAttr:{},
    setAttr(options){
        Object.assign(this._customAttr,options)
    },
    getAttr(){
        return this._customAttr;
    },
    setDeafultStyle(options) {
      let picy = require("@/assets/良.png");
      let DefaultIcon = L.icon({
        iconUrl: picy,
        iconSize: [20, 20],
      });
      L.Marker.prototype.options.icon = DefaultIcon;
    }
});
L.hxMarker=function(latlon){
    return new L.HxMarker(latlon);
}
