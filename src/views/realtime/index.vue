<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <div class="realtime-aside">
          <el-input size="mini" v-model="filterText"></el-input>
          <el-tree
            class="building-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="monitor-content">
          <el-col :span="8" v-for="index of 9" :key="index">
            <div class="monitor-item" @click="jump"></div>
          </el-col>
        </el-row>
        <el-pagination class="monitor-paing" background layout="prev, pager, next" :total="1000"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from "@/api/index";
export default {
  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    jump() {
      this.$router.push({
        name: "实时监控详情"
      });
    }
  },
  mounted() {},
  components: {}
};
</script>

<style>
.monitor-item {
  width: 100%;
  height: 150px;
  border: 1px solid #efefef;
  margin-top: 20px;
  cursor: pointer;
}
.monitor-content > .el-col:nth-child(-n + 3) > .monitor-item {
  margin-top: 0;
}
.monitor-paing {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.realtime-aside {
  background: #f5f7fa;
  overflow: hidden;
  padding: 20px;
  margin-right: 20px;
}
.building-tree {
  margin-top: 20px;
  background: #f5f7fa;
}
</style>