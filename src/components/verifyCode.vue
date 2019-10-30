<template>
  <div>
    <canvas class="verifyCode" id="canvas" @click="handleClick()"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ""
    };
  },
  methods: {
    draw() {
      this.code = "";
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      canvas.width = 120;
      canvas.height = 40;
      context.strokeRect(0, 0, 120, 40);
      var aCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,1,2,3,4,5,6,7,8,9";
      var aLength = aCode.split(",").length;
      for (var i = 0; i <= 3; i++) {
        var x = 20 + i * 20;
        var y = 20 + Math.random() * 10;
        var j = Math.floor(Math.random() * aLength);
        var deg = (Math.random() * 90 * Math.PI) / 180; //随机弧度
        var txt = aCode.split(",")[j];
        context.fillStyle = this.randomRgbColor();
        context.font = "bold 20px 微软雅黑";
        //修改坐标原点和旋转角度
        context.translate(x, y);
        context.rotate(deg);
        context.fillText(txt, 0, 0);
        //恢复坐标原点和旋转角度
        context.rotate(-deg);
        context.translate(-x, -y);
        this.code = this.code + txt;
      }
      this.$emit("sendCode", this.code);
      //干扰线
      for (var i = 0; i < 8; i++) {
        context.strokeStyle = this.randomRgbColor();
        context.beginPath();
        context.moveTo(Math.random() * 120, Math.random() * 40);
        context.lineTo(Math.random() * 120, Math.random() * 40);
        context.stroke();
      }
      /**绘制干扰点**/
      for (var i = 0; i < 20; i++) {
        context.fillStyle = this.randomRgbColor();
        context.beginPath();
        context.arc(Math.random() * 120, Math.random() * 40, 1, 0, 2 * Math.PI);
        context.fill();
      }
    },
    randomRgbColor() {
      //随机生成RGB颜色
      var r = Math.floor(Math.random() * 256); //随机生成256以内r值
      var g = Math.floor(Math.random() * 256); //随机生成256以内g值
      var b = Math.floor(Math.random() * 256); //随机生成256以内b值
      return "rgb(" + r + "," + g + "," + b + ")"; //返回rgb(r,g,b)格式颜色
    },
    handleClick() {
      this.draw();
    }
  },
  mounted() {
    this.draw();
  }
};
</script>

<style>
.verifyCode {
  background: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 0;
}
</style>