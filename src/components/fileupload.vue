<template>
  <div>
    <el-button type="primary" @click="handleUpload">上传文件</el-button>
    <input type="file" ref="file" hidden @change="uploadFile" name="files" />
  </div>
</template>

<script>
import http from "@/utils/http";
import { Message } from "element-ui";
export default {
  data() {
    return {};
  },
  methods: {
    handleUpload() {
      this.$refs.file.click();
    },
    uploadFile() {
      let files = this.$refs.file.files;
      if (files.length == 0) {
        //非空
        this.$message.error("上传文件不能为空");
        return;
      }
      if (files.size > 5 * 1024 * 1024) {
        //上传文件大小限制
        this.$message.error("上传文件不能大于5M");
        return;
      }
      let fd = new FormData();
      fd.append("file", files[0]);
      http
        .getRequestUpload("/common/uploadImage", fd, res => {
          console.log(res);
        })
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            console.log(res);
            let _data = res.data;
            this.$emit("sendFile", _data);
          }
        })
        .catch(_ => {
          Message({
            showClose: true,
            message: "上传错误",
            type: "error"
          });
        });
      console.log(files);
    }
  }
};
</script>

<style>
</style>