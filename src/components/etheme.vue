<template>
  <div id="theme">
    <span>Theme:</span>
    <el-popover
      placement="top-start"
      width="200"
      trigger="hover"
      v-for="(item,index) in list"
      :key="index"
    >
      <div>
        <span>{{item.name}}</span>
        <ul class="color-list" v-for="(color,idx) in item.color" :key="idx">
          <li class="color-item" :style="{background:color}"></li>
        </ul>
      </div>
      <div class="theme" slot="reference" :class="nowIndex == index?'current':''">
        <span
          class="theme-item"
          :style="{background:`linear-gradient(135deg,${item.color[0]} 0%, ${item.color[0]} 50%,${item.color[item.color.length-1]} 51%,${item.color[item.color.length-1]} 100%)`}"
        ></span>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "复古",
          color: [
            "#0780cf",
            "#765005",
            "#fa6d1d",
            "#0e2c82",
            "#b6b51f",
            "#da1f18",
            "#701866",
            "#f47a75",
            "#009db2",
            "#024b51",
            "#0780cf",
            "#765005"
          ]
        },
        {
          name: "新特性",
          color: [
            "#63b2ee",
            "#76da91",
            "#f8cb7f",
            "#f89588",
            "#7cd6cf",
            "#9192ab",
            "#7898e1",
            "#efa666",
            "#eddd86",
            "#9987ce",
            "#63b2ee",
            "#76da91"
          ]
        },
        {
          name: "渐变",
          color: [
            "#71ae46",
            "#96b744",
            "#c4cc38",
            "#ebe12a",
            "#eab026",
            "#e3852b",
            "#d85d2a",
            "#ce2626",
            "#ac2026",
            "#71ae46",
            "#96b744",
            "#c4cc38"
          ]
        },
        {
          name: "清新",
          color: [
            "#00a8e1",
            "#99cc00",
            "#e30039",
            "#fcd300",
            "#800080",
            "#00994e",
            "#ff6600",
            "#808000",
            "#db00c2",
            "#008080",
            "#0000ff",
            "#c8cc00"
          ]
        },
        {
          name: "科技",
          color: [
            "#05f8d6",
            "#0082fc",
            "#fdd845",
            "#22ed7c",
            "#09b0d3",
            "#1d27c9",
            "#f9e264",
            "#f47a75",
            "#009db2",
            "#024b51",
            "#0780cf",
            "#765005"
          ]
        }
      ],
      nowIndex: 0
    };
  },
  mounted() {
    let a = "";
    let arr = a.replace(/\s+/g, "").split("-");
    let temp = arr.map((value, index, array) => {
      return (value = "#" + value);
    });
    console.log(temp);
  }
};
</script>

<style>
#theme {
  padding: 4px 10px;
  background: #fff;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #aaa;
  height: 42px;
  line-height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#theme > span {
  font-weight: bold;
  color: #666;
}
.theme.current {
  border: 1px solid #e43c59;
}
.theme {
  width: 30px;
  height: 30px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}
.theme span {
  display: block;
  width: 26px;
  height: 26px;
}
.color-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.color-item {
  width: 26px;
  height: 26px;
  float: left;
  margin: 0 4px 4px 0;
}
</style>