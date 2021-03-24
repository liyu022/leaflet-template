import L from 'leaflet';
 export default class HxMarker extends L.Marker{
    _customAttr={}
    setAttr(options){
        Object.assign(this._customAttr,options)
    }
    getAttr(){
        return this._customAttr;
    }   
}

