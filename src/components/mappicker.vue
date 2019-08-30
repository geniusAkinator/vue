<template>
  <div class="map-picker">
    <baidu-map
      :center="{lng: mapConf.center.lng, lat: mapConf.center.lat}"
      :zoom="11"
      :ak="ak"
      @click="handleClick"
    >
      <bm-view class="map"></bm-view>
      <bm-marker :position="{lng: marker.lng, lat: marker.lat}" :dragging="false"></bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmControl from "vue-baidu-map/components/controls/Control";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch";
import BmAutoComplete from "vue-baidu-map/components/others/AutoComplete";
import BmView from "vue-baidu-map/components/map/MapView";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
export default {
  data() {
    return {
      ak: config.baiduMap.ak,
      keyword: "",
      mapConf: {
        center: {
          lng: "116.297334",
          lat: "40.048286"
        }
      },
      marker: {
        lng: "116.297334",
        lat: "40.048286"
      }
    };
  },
  methods: {
    handleConfirm() {
      
    },
    handleComplete(AutocompleteResult) {
      // console.log(AutocompleteResult)
    },
    handleClick(e) {
      this.marker.lng = e.point.lng;
      this.marker.lat = e.point.lat;
    }
  },
  components: {
    BaiduMap,
    BmView,
    BmMarker
  }
};
</script>

<style>
.map-picker {
  width: 100%;
  height: 100%;
  position: relative;
}
.map-picker .map {
  height: 200px;
  cursor: crosshair;
}
.tangram-suggestion-main {
  z-index: 9999999999 !important;
}
.map-search {
  height: 28px;
  width: 308px;
}
.tangram-suggestion-main table {
  width: 100%;
}
.tangram-suggestion {
  overflow: hidden;
  width: 100% !important;
}
.tangram-suggestion-main tr td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.BMap_mask {
  cursor: crosshair;
}
</style>