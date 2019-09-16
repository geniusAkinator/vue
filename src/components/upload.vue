<template>
  <div class="myUpload">
    <div class="pre-img" v-for="(item,index) in fileUrl" :key="index">
      <el-image style="width:100%; height:100%" :src="item" :fit="fit"></el-image>
      <div class="cover">
        <i class="el-icon-zoom-in"></i>
        <i class="el-icon-download"></i>
        <i class="el-icon-delete" @click="handleDelete(index)"></i>
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
      console.log(this.$refs.file.files);
      let files = this.$refs.file.files;
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          console.log(reader.result);
          this.fileUrl.push(reader.result);
        });
        reader.readAsDataURL(files[i]);
      }
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