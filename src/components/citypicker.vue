<template>
  <div>
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
        <el-select v-model="dvalue" placeholder="请选择区/县">
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
    handleChange(e) {},
    handleExpandChange(e) {
      this.nList = e;
    },
    selectProvince(e) {
      this.cvalue = "";
      this.coptions = [];
      this.getNode(e, this.coptions);
      setTimeout(() => {
        this.cvalue = this.coptions[0].value;
        this.selectCity(this.cvalue);
      }, 300);
    },
    selectCity(e) {
      this.dvalue = "";
      this.doptions = [];
      this.getNode(e, this.doptions);
      setTimeout(() => {
        this.dvalue = this.doptions[0].value;
      }, 600);
    },
    getNode(id, node) {
      api
        .getPCD({ pId: id })
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
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
    }
  },
  mounted() {
    this.poptions = [];
    this.getNode(0, this.poptions);
  }
};
</script>

<style>
</style>