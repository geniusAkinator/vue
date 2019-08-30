<template>
  <div class="map-picker">
    <baidu-map :center="{lng: 116.403765, lat: 39.914850}" :zoom="11" :ak="ak">
      <bm-view class="map"></bm-view>
      <bm-control>
        <bm-auto-complete
          v-model="keyword"
          :sugStyle="{zIndex: 1}"
          @confirm="handleConfirm"
          @searchcomplete="handleComplete"
        >
          <input class="map-search" type="text" placeholder="请输入关键字" />
          <!-- 这里指代一个自定义搜索框组件 -->
        </bm-auto-complete>
      </bm-control>
      <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true"></bm-marker>
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
      keyword: ""
    };
  },
  methods: {
    handleConfirm({ type, target, item }) {
      console.log(type, target, item);
    },
    handleComplete(AutocompleteResult) {
      // console.log(AutocompleteResult)
    }
  },
  components: {
    BaiduMap,
    BmLocalSearch,
    BmControl,
    BmAutoComplete,
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