<template>
  <div class="floor" style="height:100%">
    <el-row style="height:100%">
      <el-col :span="4" style="position:relative;height:50%">
        <div class="floor-picker">
          <!-- <i class="el-icon-arrow-up" id="floor-button-next" @click="handleNext"></i>
          <i class="el-icon-arrow-down" id="floor-button-prev" @click="handlePrev"></i>-->
          <div
            class="floor-picker-inner"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <div class="floor-picker-rule"></div>
            <ul
              class="floor-list"
              :style="`transform: perspective(1000px) rotateY(0deg) rotateX(${index*20}deg);`"
            >
              <li
                v-for="(item,idx) in floorList"
                :key="idx"
                :class="idx==index?'floor-item center':'floor-item'"
                :style="`transform-origin: center center -90px; transform: translateZ(90px) rotateX(-${idx*20}deg);`"
                @click="handleClick(item,idx)"
              >{{item.floorName}}</li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="info-box">
          <ul class="building-info">
            <li class="info-item">
              <span>建筑面积</span>
              <span>
                400m
                <sup>2</sup>
              </span>
            </li>
            <li class="info-item">
              <span>建造高度</span>
              <span>100m</span>
            </li>
            <li class="info-item">
              <span>地上层数</span>
              <span>20层</span>
            </li>
            <li class="info-item">
              <span>地下层数</span>
              <span>0</span>
            </li>
          </ul>
          <el-image class="floor_img" :src="src" :fit="'scale-down'" :style="{height:`${height}px`}"></el-image>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      index: 0,
      floorList: [
        {
          floorName: "1F"
        },
        {
          floorName: "2F"
        },
        {
          floorName: "3F"
        },
        {
          floorName: "4F"
        },
        {
          floorName: "5F"
        },
        {
          floorName: "6F"
        },
        {
          floorName: "7F"
        },
        {
          floorName: "8F"
        }
      ],
      isEnter: false,
      src:
        "http://192.168.10.65:8888/images/0a2967e6-53ef-4630-9a47-0bd055ad25fe.jpg"
    };
  },
  props: {
    height: ""
  },
  computed: {
    len: function() {
      return this.floorList.length;
    }
  },
  watch: {
    isEnter(nVal, oVal) {
      console.log(nVal);
    }
  },
  methods: {
    handleMouseEnter() {
      this.isEnter = true;
    },
    handleMouseLeave() {
      this.isEnter = false;
    },
    handlePrev() {
      if (this.index) this.index = this.index - 1;
    },
    handleNext() {
      if (this.index < this.len - 1) this.index = this.index + 1;
    },
    handleClick(item, idx) {
      this.index = idx;
    },
    handleScroll(e) {
      let _this = this;
      e = e || window.event;
      if (e.wheelDelta) {
        //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) {
          _this.handlePrev();
        }
        if (e.wheelDelta < 0) {
          _this.handleNext();
        }
      } else if (e.detail) {
        //Firefox滑轮事件
        if (e.detail > 0) {
          _this.handlePrev();
        }
        if (e.detail < 0) {
          _this.handleNext();
        }
      }
    }
  },
  mounted() {
    let picker = document.querySelector(".floor-picker-inner");
    if (picker.addEventListener) {
      picker.addEventListener("DOMMouseScroll", this.handleScroll, false);
    }
    //滚动滑轮触发scrollFunc方法
    picker.onmousewheel = this.handleScroll;
  }
};
</script>

<style>
.floor-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 150px;
  box-sizing: border-box;
  padding: 0;
  margin: -18px 0 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 50%;
  left: 0;
  transform-style: preserve-3d;
  transition: all 100ms ease-out 0s;
}
.building-info {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.floor-item {
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  vertical-align: middle;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  -webkit-text-overflow: ellipsis;
  text-overflow: ellipsis;
  cursor: default;
}
.floor-item.center {
  color: #fff;
  font-size: 16px;
}
.building-info {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.info-item {
  display: block;
  padding: 10px;
  border-radius: 4px;
}
.info-item span {
  display: block;
  text-align: center;
}
.info-item span:first-child {
  font-weight: bold;
  font-size: 20px;
}
.info-item span:last-child {
  font-size: 20px;
}
.floor-picker-inner {
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
  height: 200px;
  position: relative;
  -webkit-mask-box-image: -webkit-linear-gradient(
    bottom,
    transparent,
    transparent 5%,
    #fff 20%,
    #fff 80%,
    transparent 95%,
    transparent
  );
  -webkit-mask-box-image: linear-gradient(
    top,
    transparent,
    transparent 5%,
    #fff 20%,
    #fff 80%,
    transparent 95%,
    transparent
  );
}
/* .floor-seleter i {
  display: block;
  margin: auto;
  font-size: 30px;
  cursor: pointer;
} */
.floor-picker {
  position: absolute;
  background: #0942a1;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  top: 50%;
  left: 20px;
  right: 20px;
  border-radius: 4px;
}
.floor-picker-rule {
  box-sizing: border-box;
  padding: 0;
  margin: -18px 0 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 2;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.2);
}
#floor-button-prev {
  cursor: pointer;
  position: absolute;
  bottom: -30px;
  font-size: 30px;
  z-index: 99;
  left: 50%;
  margin-left: -15px;
}
#floor-button-next {
  cursor: pointer;
  position: absolute;
  top: -30px;
  font-size: 30px;
  z-index: 99;
  left: 50%;
  margin-left: -15px;
}
.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.floor_img {
  width: 100%;
  background-color: initial;
}
.floor_img .el-image__error {
  background: initial;
}
.floor_img .el-image__inner{
  height: auto !important
}
</style>