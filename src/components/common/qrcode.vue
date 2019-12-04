<template>
  <div>
    <div :id="id" class="qrcode"></div>
    <!-- 创建一个div，并设置id为qrcode -->
  </div>
</template>
<script>
import QRCode from "qrcodejs2"; // 引入qrcode
export default {
  data() {
    return {};
  },
  props: {
    url: "",
    id:""
  },
  methods: {
    qrcode() {
      let qrcode = new QRCode(this.id, {
        width: 132,
        height: 132,
        text: this.url, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    }
  },
  mounted() {
    this.qrcode();
  }
};
</script>
<style>
.qrcode {
  display: inline-block;
}
.qrcode img {
  width: 132px;
  height: 132px;
  background-color: #fff;
  padding: 6px;
}
</style>