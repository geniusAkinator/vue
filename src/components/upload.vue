<template>
  <div class="myUpload">
    <div class="images" v-viewer="{movable: false,navbar: false,}">
      <div class="pre-img" v-for="(item,index) in fileUrl" :key="index">
        <el-image style="width:100%; height:100%" :src="item.url" :fit="fit"></el-image>
        <div class="cover">
          <i class="el-icon-zoom-in" @click="handleShow(index)"></i>
          <i class="el-icon-download"></i>
          <i class="el-icon-delete" @click="handleDelete(index)"></i>
        </div>
      </div>
    </div>
    <div class="upload-btn" @click="handleUpload">
      <i class="el-icon-plus"></i>
    </div>
    <input
      type="file"
      ref="file"
      hidden
      @change="uploadFile"
      multiple
      accept="image/png, image/jpeg, image/gif, image/jpg"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileUrl: [],
      fit: "cover"
    };
  },
  methods: {
    handleUpload() {
      this.$refs.file.click();
    },
    handleDelete(index) {
      this.fileUrl.splice(index);
    },
    uploadFile() {
      let files = this.$refs.file.files;
      console.log(files);
      if (files.length == 0) {
        this.$message.error("上传文件不能大于5M");
        return;
      }
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 5 * 1024 * 1024) {
          this.$message.error("上传文件不能大于5M");
          return;
        }
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          let item = {};
          item.url = reader.result;
          item.title = files[i].name;
          this.fileUrl.push(item);
        });
        reader.readAsDataURL(files[i]);
      }
    },
    handleShow(index) {
      const viewer = this.$el.querySelector(".images").$viewer;
      viewer.show();
      viewer.view(index);
    }
  }
};
</script>

<style>
.upload-btn {
  width: 110px;
  height: 110px;
  border: 1px dashed #409eff;
  color: #409eff;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  float: left;
}
.pre-img {
  width: 110px;
  height: 110px;
  float: left;
  border: 1px solid #409eff;
  border-radius: 3px;
  position: relative;
  margin: 0 8px 8px 0;
}
.myUpload {
  overflow: hidden;
}
.pre-img > .cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: none;
  justify-content: space-around;
  align-items: center;
}
.pre-img:hover > .cover {
  display: flex;
}
.pre-img i {
  cursor: pointer;
  font-size: 20px;
}
</style>