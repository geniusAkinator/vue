<template>
  <div class="container">
    <el-input placeholder="请输入查询关键词"></el-input>
    <ul class="main-list">
      <li class="main-item">
        <el-image :src="src">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <span class="name">阿米华晟</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    };
  }
};
</script>

<style>
.main-item {
  list-style-type: none;
  width: 200px;
  height: 200px;
  background: #efefef;
  border-radius: 5px;
  cursor: pointer;
}
.main-item span {
  width: 100%;
  display: block;
  text-align: center;
  font-weight: bold;
}
</style>