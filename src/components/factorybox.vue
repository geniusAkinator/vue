<template>
  <div id="desktop_factory">
    <div>
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
      >
        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.address }}</span>
        </template>
      </el-autocomplete>
      <ul class="factory_list">
        <li>阿斯蒂芬撒旦</li>
        <li>盈盛汽车配件有限公司智慧用电项目</li>
        <li>盈盛汽车配件有限公司智慧用电项目</li>
        <li>盈盛汽车配件有限公司智慧用电项目</li>
        <li>盈盛汽车配件有限公司智慧用电项目</li>
      </ul>
    </div>
    <div>
      <h3>盈盛汽车配件有限公司智慧用电项目</h3>
      <ul>
        <li>项目识别号：</li>
        <li>所属客户：</li>
        <li>地址：</li>
        <li>建筑面积：</li>
        <li>消防设施：</li>
        <li>安全责任人：</li>
        <li>联系电话</li>
        <li>设备数量：</li>
        <li>探测器数量：</li>
        <li>在线设备数量：</li>
        <li>失联设备数量：</li>
        <li>故障探测器数量：</li>
        <li>未处理隐患数量：</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>
<style scoped>
.factory_list {
  color: #557386;
  display: block;
  font-size: 14px;
  padding: 8px 10px;
  margin-bottom: 1px;
  list-style-type: none;
  cursor: pointer;
}
.factory_list li {
  margin-bottom: 5px;
  background: #f0f6fa;
  border-left: solid 2px #c4d5df;
  padding: 10px;
}
#desktop_factory {
  display: flex;
}
ul {
  list-style-type: none;
}
</style>