<template>
  <div class="city-picker">
    <el-row>
      <el-col :span="6">
        <el-select v-model="pvalue" placeholder="请选择省" @change="selectProvince">
          <el-option
            v-for="item in poptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="cvalue" placeholder="请选择市" @change="selectCity">
          <el-option
            v-for="item in coptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="dvalue" placeholder="请选择区/县" @change="selectDistrict">
          <el-option
            v-for="item in doptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      pvalue: "",
      cvalue: "",
      dvalue: "",
      poptions: [],
      coptions: [],
      doptions: []
    };
  },
  watch: {},
  methods: {
    selectProvince(e) {
      //省改变
      this.cvalue = "";
      this.coptions = [];
      this.dvalue = "";
      this.doptions = [];
      this.getNode(e, this.coptions);
    },
    selectCity(e) {
      //市改变
      this.dvalue = "";
      this.doptions = [];
      this.getNode(e, this.doptions);
    },
    selectDistrict(e) {
      //区县改变
      let pval = this.getNodeValue(this.pvalue, this.poptions);
      let cval = this.getNodeValue(this.cvalue, this.coptions);
      let dval = this.getNodeValue(this.dvalue, this.doptions);
      this.$emit("sendPCD", `${pval},${cval},${dval}`);
    },
    getNode(id, node) {
      //根据pId查询值，并且赋值到对应option下
      api
        .getPCD({ pId: id })
        .then(res => {
          if (res.code === this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            _data.map((item, i) => {
              let temp = {};
              temp.value = item.id;
              temp.label = item.name;
              node.push(temp);
            });
          }
        })
        .catch(_ => {});
    },
    getNodeValue(id, option) {
      let nName = "";
      option.map((item, i) => {
        if (item.value == id) {
          nName = item.label;
        }
      });
      return nName;
    }
  },
  mounted() {
    this.poptions = [];
    this.getNode(0, this.poptions);
  }
};
</script>

<style>
.city-picker .el-col:nth-child(2),
.city-picker .el-col:nth-child(3) {
  margin-left: 20px;
}
</style>