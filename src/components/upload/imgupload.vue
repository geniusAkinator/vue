<!-- 图片上传 -->
<template>
  <div class="myUpload">
    <div class="images" v-viewer="{navbar: false,keyboard:false}">
      <div class="pre-img" v-for="(item,index) in fileUrl" :key="index">
        <el-image style="width:100%; height:100%" :src="item.url" :fit="fit"></el-image>
        <div class="cover">
          <i class="el-icon-zoom-in" @click="handleShow(index)"></i>
          <!-- <i class="el-icon-download" @click="handleDownload(index)"></i> -->
          <i class="el-icon-delete" @click="handleDelete(index)"></i>
        </div>
      </div>
      <div v-show="isShow">
        <el-progress :percentage="percentage" status="success"></el-progress>
      </div>
    </div>
    <div class="upload-btn" @click="handleUpload" v-if="this.limited>this.fileUrl.length">
      <i class="el-icon-plus"></i>
    </div>
    <input
      type="file"
      ref="imgFile"
      hidden
      @change="uploadFile"
      :multiple="this.limited>1?true:false"
      name="files"
      accept="image/png, image/jpeg, image/gif, image/jpg"
    />
    <!-- <transition name="el-fade-in-linear">
      <div v-show="isShow">
        <template v-if="isLoading">
          <el-progress :percentage="percentage"></el-progress>
        </template>
        <template v-if="!isLoading&&!isFail">
          <el-progress :percentage="percentage" status="success"></el-progress>
        </template>
        <template v-if="isFail">
          <el-progress :percentage="percentage" status="exception"></el-progress>
        </template>
      </div>
    </transition>-->
  </div>
</template>
<script>
import http from "@/utils/http";
import { Message } from "element-ui";
export default {
  data() {
    return {
      fileUrl: [],
      fit: "cover",
      isFail: false,
      isLoading: true,
      isShow: false,
      percentage: 0
    };
  },
  props: {
    limited: {
      type: Number,
      default: 9
    },
    image: {
      type: Array
    }
  },
  watch: {
    image() {
      this.fileUrl = this.image;
    }
  },
  methods: {
    handleUpload() {
      this.$refs.imgFile.click();
    },
    handleDelete(index) {
      this.fileUrl.splice(index, 1);
      this.isShow = false;
      this.$emit("sendDelIndex", index);
    },
    handleDownload(index) {
    },
    uploadFile() {
      let _this = this;
      let files = _this.$refs.imgFile.files;
      _this.percentage = 0;
      if (files.length == 0) {
        //非空
        _this.$message.error("上传文件不能为空");
        return;
      }
      for (let i = 0; i < files.length; i++) {
        let title = files[i].name;
        if (files[i].size > 5 * 1024 * 1024) {
          //上传文件大小限制
          _this.$message.error("上传文件不能大于5M");
          return;
        }
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          let item = {};
          item.url = reader.result;
          item.title = title;
          if (_this.fileUrl.length > _this.limited - 1) {
            _this.$message.error("上传文件不能超过九个");
            return;
          }
          _this.fileUrl.push(item);
        });
        reader.readAsDataURL(files[i]);

        _this.isShow = true;

        if (_this.limited == 1) {
          let fd = new FormData();
          fd.append("file", files[0]);
          http
            .getRequestUpload("/common/uploadImage", fd, res => {
              let loaded = res.loaded;
              let total = res.total;
              _this.percentage = (loaded / total) * 100;
            })
            .then(res => {
              // _this.isFail = false;
              // _this.isLoading = false;
              // console.log(res);
              if (res.code == _this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                let _data = res.data;
                _this.$emit("sendImage", _data);
              }
            })
            .catch(_ => {
              Message({
                showClose: true,
                message: "上传错误",
                type: "error"
              });
              // _this.isLoading = false;
              // _this.isFail = true;
            });
          _this.$refs.imgFile.value = "";
        }
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
  margin-left: 1px;
}
.pre-img {
  width: 110px;
  height: 110px;
  float: left;
  border: 1px solid #409eff;
  border-radius: 3px;
  position: relative;
  margin: 0 8px 8px 0;
  z-index: 99;
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
.pre-img i:hover {
  color: #409eff;
}
.images {
  overflow: hidden;
  float: left;
}
</style>