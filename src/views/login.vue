<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="form" class="login-container">
        <div class="title">平台登录</div>
        <el-form-item>
          <el-input v-model="form.account" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item class="verity">
          <el-input v-model="form.vcode" placeholder="验证码" maxlength="4"></el-input>
          <my-verify-code @sendCode="getCode"></my-verify-code>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="logining" :disabled="isActive">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember" class="remember">保持登录</el-checkbox>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>&copy; COPYRIGHT AMHSZG.COM - ALL RIGHTS RESERVED.</el-footer>
    <script id="2d-fragment-shader" type="x-shader/x-fragment">
  // <![CDATA[
    #ifdef GL_ES
    precision mediump float;
    #endif

    #define PI 3.14159265359;

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_xpos;
    uniform float u_ypos;

  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x) {
       return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  float snoise(vec3 v)
    {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vec3 color1 = vec3(234.0/255.0,242.0/255.0,227.0/255.0);
      vec3 color2 = vec3(97.0/255.0,232.0/255.0,225.0/255.0);
      vec3 color3 = vec3(242.0/255.0,87.0/255.0,87.0/255.0);
      vec3 color4 = vec3(242.0/255.0,232.0/255.0,99.0/255.0);
      vec3 color5 = vec3(242.0/255.0,205.0/255.0,96.0/255.0);
      vec3 color6 = vec3(255.0/255.0,255.0/255.0,255.0/255.0);
      vec2 lt = vec2(gl_FragCoord.x + u_xpos, gl_FragCoord.y + u_ypos);
      vec2 st = lt.xy/u_resolution.xy;
      st.x *= u_resolution.x/u_resolution.y;
      vec3 color = vec3(0.0);
      vec2 pos = vec2(st*0.6);
      float DF = 0.0;
      float a = 0.0;
      vec2 vel = vec2(u_time*.1);
      st.xy *= 0.4;
      float r = snoise(vec3(st.x,st.y,u_time * 0.1));
      if(r >= -1.0 && r < -0.6){
        color = color1;
      } else if(r >= -0.6 && r < -0.2){
  	 color = color2;
      } else if(r >= -0.2 && r < 0.2){
        color = color3;
      } else if(r >= 0.2 && r < 0.6){
      	 color = color4;
      } else {
        color = color5;
      }
      gl_FragColor = vec4(color,1.0);
    }
  // ]]>
    </script>
    <script id="2d-vertex-shader" type="x-shader/x-vertex">
  // <![CDATA[
  	attribute vec2 a_position;
  	void main() {
  		gl_Position = vec4(a_position, 0, 1);
  	}
  	// ]]>
    </script>

    <canvas id="glscreen"></canvas>
  </el-container>
</template>
<script>
import api from "@/api/index";
import baseURL from "@/utils/baseUrl";
import MyVerifyCode from "@/components/main/verifyCode";
export default {
  data() {
    return {
      logining: false,
      form: {
        account: "",
        password: "",
        vcode: ""
      },
      remember: true,
      code: "",
      isActive: true
    };
  },
  watch: {
    form: {
      handler(nVal, oVal) {
        let form = {
          account: "",
          password: "",
          vcode: ""
        };
        form = nVal;
        if (form.account != "" && form.password != "" && form.vcode != "") {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getCode(e) {
      this.code = e;
    },
    handleLogin() {
      this.verityForm();
    },
    verityForm() {
      if (this.form.vcode.toUpperCase() != this.code) {
        this.$message({
          showClose: true,
          message: "验证码错误",
          type: "error"
        });
        return;
      }
      api
        .login(this.form)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let token = _data.token;
            let userInfo = _data.userInfo;
            this.logining = true;
            this.clearCookies();
            if (this.remember) {
              this.setCookies();
            }
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.$store.dispatch("user/setUserInfo", userInfo);
            this.$router.push("/", () => {});
          } else if (res.code == this.AJAX_HELP.CODE_RESPONSE_FAILURE) {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(_ => {
          console.log(_);
        });
    },
    setCookies() {
      let exDays = 60; //60days
      let cipherAccount = this.CryptoJS.AES.encrypt(
        this.form.account + "",
        "secretKey"
      ).toString();
      let cipherPassword = this.CryptoJS.AES.encrypt(
        this.form.password + "",
        "secretKey"
      ).toString();
      let exDate = new Date(); // 获取时间
      exDate.setTime(exDate.getTime() + 24 * 60 * 60 * 1000 * exDays); // 保存的天数
      this.$cookies.config(exDate);
      this.$cookies.set("currentAccount", cipherAccount);
      this.$cookies.set("currentPassword", cipherPassword);
    },
    getCookies() {
      let cipherAccount = this.$cookies.get(`currentAccount`);
      let cipherPassword = this.$cookies.get(`currentPassword`);
      if (cipherAccount != null) {
        let decryptAccount = "";
        decryptAccount = this.CryptoJS.AES.decrypt(
          cipherAccount,
          `secretKey`
        ).toString(this.CryptoJS.enc.Utf8);
        this.form.account = decryptAccount;
      }
      if (cipherPassword != null) {
        let decryptPwd = this.CryptoJS.AES.decrypt(
          cipherPassword,
          `secretKey`
        ).toString(this.CryptoJS.enc.Utf8);
        this.form.password = decryptPwd;
      }
    },
    clearCookies() {
      this.$cookies.remove(`currentAccount`);
      this.$cookies.remove(`currentPassword`);
    }
  },
  destroyed() {},
  mounted() {
    this.$store.dispatch("home/clearAside");
    this.$nextTick(() => {
      this.getCookies();
      var canvas, gl; // canvas and webgl context
      var shaderScript;
      var shaderSource;
      var vertexShader; // Vertex shader.  Not much happens in that shader, it just creates the vertex's to be drawn on
      var fragmentShader; // this shader is where the magic happens. Fragment = pixel.  Vertex = kind of like "faces" on a 3d model.
      var buffer;
      var locationOfTime;
      var locationOfResolution;
      var startTime = new Date().getTime(); // Get start time for animating
      var currentTime = 0;
      var program = {};
      function init() {
        canvas = document.getElementById("glscreen");
        gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([
            -1.0,
            -1.0,
            1.0,
            -1.0,
            -1.0,
            1.0,
            -1.0,
            1.0,
            1.0,
            -1.0,
            1.0,
            1.0
          ]),
          gl.STATIC_DRAW
        );
        shaderScript = document.getElementById("2d-vertex-shader");
        shaderSource = shaderScript.text;
        vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, shaderSource);
        gl.compileShader(vertexShader);
        shaderScript = document.getElementById("2d-fragment-shader");
        shaderSource = shaderScript.text;
        fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, shaderSource);
        gl.compileShader(fragmentShader);
        program = gl.createProgram(); // create the WebGL program.  This variable will be used to inject our javascript variables into the program.
        gl.attachShader(program, vertexShader); // add the shaders to the program
        gl.attachShader(program, fragmentShader); // ^^
        gl.linkProgram(program); // Tell our WebGL application to use the program
        gl.useProgram(program); // ^^ yep, but now literally use it.
        locationOfResolution = gl.getUniformLocation(program, "u_resolution");
        locationOfTime = gl.getUniformLocation(program, "u_time");
        gl.uniform2f(locationOfResolution, canvas.width, canvas.height);
        gl.uniform1f(locationOfTime, currentTime);
        render();
      }
      function render() {
        var now = new Date().getTime();
        currentTime = (now - startTime) / 1000; // update the current time for animations
        gl.uniform1f(locationOfTime, currentTime); // update the time uniform in our shader
        window.requestAnimationFrame(render, canvas); // request the next frame
        var positionLocation = gl.getAttribLocation(program, "a_position"); // do stuff for those vertex's
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      init();
      window.addEventListener("resize", function(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        locationOfResolution = gl.getUniformLocation(program, "u_resolution");
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("home/initTab");
    this.$store.dispatch("home/initBreadcrumb");
    this.$store.dispatch("home/initAside");
    next();
  },
  components: {
    MyVerifyCode
  }
};
</script>

<style scoped>
.el-footer {
  color: #fff;
  text-align: center;
  line-height: 60px;
}
canvas {
  width: 100%;
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.login-container {
  width: 320px;
}
.el-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* background: url("../assets/bg.jpg") no-repeat center; */
}
.el-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
}
.login-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-header {
  height: 30px;
}
.el-button {
  width: 100%;
}
.title {
  width: 100%;
  height: 80px;
  float: left;
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  line-height: 60px;
}
.login-container {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  padding: 20px;
}
.el-checkbox {
  color: #d3dce6 !important;
}
</style>