<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="14">
        <my-card>
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            探测器基本信息
          </template>
          <template slot="content">ddddddddd</template>
        </my-card>
      </el-col>
      <el-col :span="10">
        <my-card>
          <template slot="title">
            <i class="el-icon-switch-button"></i>
            探测器基本信息
          </template>
          <template slot="content">d</template>
        </my-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <my-card>
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            数据监控
          </template>
          <template slot="content">ddddddddd</template>
        </my-card>
      </el-col>
    </el-row>
  </div>
</template>
       

<script>
import MyCard from "@/components/card";
export default {
  data() {
    return {};
  },
  components: {
    MyCard
  }
};
</script>

<style scoped>
.el-row+.el-row{
  margin-top:20px 
}
</style>