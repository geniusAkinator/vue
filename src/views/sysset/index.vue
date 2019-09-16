<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sysset-tab">
      <el-tab-pane label="功能入口" name="first">
        <ul>
          <li>
            <a href="http://www.baidu.com">http://www.baidu.com</a>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="基本设置" name="second">
        <el-form ref="commonForm" :model="commonForm" :label-width="labelWidth">
          <el-form-item label="限制主体数量">
            <el-input v-model="commonForm.limitqty"></el-input>
            <span class="help-block">为0则不限制，默认为0，允许该公众号下建立主体数量</span>
          </el-form-item>
          <el-form-item label="wap支持">
            <el-input v-model="commonForm.isWap"></el-input>
            <span class="help-block">wap开启后，支持手机浏览器、微信、打包APP同时访问.</span>
          </el-form-item>
          <el-form-item label="运营类型">
            <el-radio-group v-model="commonForm.isoneregion">
              <el-radio label="0">多工厂</el-radio>
              <el-radio label="1">独立工厂</el-radio>
            </el-radio-group>
            <span class="help-block">独立工厂，只显示一个工厂.</span>
          </el-form-item>
          <el-form-item label="工厂列表">
            <el-radio-group v-model="commonForm.listtype">
              <el-radio label="0">按距离显示</el-radio>
              <el-radio label="1">按城市显示</el-radio>
            </el-radio-group>
            <span class="help-block">工厂列表显示方式.</span>
          </el-form-item>
          <el-form-item label="计划任务">
            <el-radio-group v-model="commonForm.isruntask">
              <el-radio label="0">启用</el-radio>
              <el-radio label="1">关闭</el-radio>
            </el-radio-group>
            <span class="help-block">启用后，系统可以支持计划执行任务</span>
          </el-form-item>
          <el-form-item label="后台消息推送地址">
            <el-input v-model="commonForm.workerurl">
              <template slot="prepend">URL</template>
            </el-input>
            <span class="help-block">消息服务器地址，可以http://或https://开头.</span>
          </el-form-item>
          <el-form-item label="图片压缩尺寸">
            <el-input v-model="commonForm.imgSize" type="number">
              <template slot="append">PX</template>
            </el-input>
            <span class="help-block">输入图片压缩宽度</span>
          </el-form-item>
          <el-form-item label="列表分页数量">
            <el-input v-model="commonForm.pagesize" type="number"></el-input>
            <span class="help-block">列表数据分页时，每页显示的最大数量，默认为10.</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="风格样式" name="third">
        <el-form ref="form" :model="styleForm" :label-width="labelWidth">
          <el-form-item label="手机模板">
            <el-select v-model="styleForm.style" placeholder="请选择手机模板">
              <el-option
                v-for="item in styleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="菜单颜色">
            <div class="color-picker">
              <el-input v-model="styleForm.menuColor"></el-input>
              <el-color-picker v-model="styleForm.menuColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block">菜单颜色</span>
          </el-form-item>
          <el-form-item label="背景颜色">
            <div class="color-picker">
              <el-input v-model="styleForm.bgColor"></el-input>
              <el-color-picker v-model="styleForm.bgColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block">背景颜色</span>
          </el-form-item>
          <el-form-item label="按钮颜色">
            <div class="color-picker">
              <el-input v-model="styleForm.btnColor"></el-input>
              <el-color-picker v-model="styleForm.btnColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block">按钮颜色</span>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input v-model="styleForm.menu"></el-input>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="首页显示">
            <el-input v-model="styleForm.spa"></el-input>
            <span class="help-block"></span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="通知模板" name="fourth">
        <el-form ref="form" :model="noticeForm" :label-width="labelWidth">
          <el-form-item label="模板标题颜色">
            <div class="color-picker">
              <el-input v-model="noticeForm.titleColor"></el-input>
              <el-color-picker v-model="noticeForm.titleColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="模板文本颜色">
            <div class="color-picker">
              <el-input v-model="noticeForm.textColor"></el-input>
              <el-color-picker v-model="styleForm.textColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="关键字颜色">
            <div class="color-picker">
              <el-input v-model="noticeForm.keyColor"></el-input>
              <el-color-picker v-model="noticeForm.keyColor" show-alpha></el-color-picker>
            </div>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="XXXX管理通知">
            <el-input v-model="noticeForm.noticelid"></el-input>
            <span class="help-block">编号：XXXXX 物业管理通知</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="短信设置" name="fifth">
        <el-form ref="form" :model="smsForm" :label-width="labelWidth">
          <el-form-item label="绑定验证">
            <el-radio-group v-model="smsForm.isbind">
              <el-radio label="0">验证</el-radio>
              <el-radio label="1">不验证</el-radio>
            </el-radio-group>
            <span class="help-block">验证为手机短信验证，请设置短信验证码模板.此处为总开关，工厂还需单独开启.</span>
          </el-form-item>
          <el-form-item label="邀请验证">
            <el-radio-group v-model="smsForm.isinvite">
              <el-radio label="0">验证</el-radio>
              <el-radio label="1">不验证</el-radio>
            </el-radio-group>
            <span class="help-block">验证为手机短信验证，请设置短信验证码模板.此处为总开关，工厂还需单独开启.</span>
          </el-form-item>
          <el-form-item label="短信服务商">
            <el-radio-group v-model="smsForm.smstype">
              <el-radio label="0">聚合数据</el-radio>
              <el-radio label="1">阿里云短信</el-radio>
              <el-radio label="2">阿里云通讯</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="smsForm.smstype=='0'">
            <el-form-item label="AppKey">
              <el-input v-model="smsForm.tplAppkey" placeholder="请输入AppKey"></el-input>
              <span class="help-block">请填写聚合数据AppKey 申请</span>
            </el-form-item>
          </template>
          <template v-if="smsForm.smstype=='1'">
            <el-form-item label="App code">
              <el-input v-model="smsForm.tplAppkey" placeholder="请输入AppKey"></el-input>
              <span class="help-block">请填写阿里云短信App code 申请</span>
            </el-form-item>
            <el-form-item label="签名">
              <el-input v-model="smsForm.tplAppkey" placeholder="请输入AppKey"></el-input>
              <span class="help-block">必须与阿里云短信申请的签名保持一致</span>
            </el-form-item>
          </template>
          <template v-if="smsForm.smstype=='2'">
            <el-form-item label="Access Key ID">
              <el-input v-model="smsForm.tplAppkey" placeholder="请输入AppKey"></el-input>
              <span class="help-block">请填写阿里云通信Access Key ID 申请</span>
            </el-form-item>
            <el-form-item label="Access Key Secret">
              <el-input v-model="smsForm.tplAppkey" placeholder="请输入AppKey"></el-input>
              <span class="help-block">请填写阿里云通信Access Key Secret 申请</span>
            </el-form-item>
            <el-form-item label="签名">
              <el-input v-model="smsForm.tplAppkey" placeholder="请输入AppKey"></el-input>
              <span class="help-block">必须与阿里云通信申请的签名保持一致</span>
            </el-form-item>
          </template>
          <el-form-item label="验证码模板">
            <el-input v-model="smsForm.codeTemplate" placeholder="请输入验证码模板"></el-input>
            <span class="help-block">短信验证码模板.例：XXXXXXXXXX</span>
          </el-form-item>
          <el-form-item label="报警通知模板">
            <el-input v-model="smsForm.quoteTemplate" placeholder="请输入报警通知模板"></el-input>
            <span class="help-block">报警通知模板.例：XXXXXXXXXX</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="微信小程序" name="sixth">
        <el-form ref="form" :model="wxForm" :label-width="labelWidth">
          <el-form-item label="APPID">
            <el-input v-model="wxForm.appid" placeholder="请输入APPID"></el-input>
            <span class="help-block">微信小程序APPID</span>
          </el-form-item>
          <el-form-item label="访问密钥">
            <el-input v-model="wxForm.appsecret" placeholder="请输入APPSERET"></el-input>
            <span class="help-block">微信小程序APPSERET</span>
          </el-form-item>
          <el-form-item label="商户号">
            <el-input v-model="wxForm.mchid" placeholder="请输入微信商户号"></el-input>
            <span class="help-block">对应的商户号</span>
          </el-form-item>
          <el-form-item label="商户支付密钥">
            <el-input v-model="wxForm.mchsecret">
              <template slot="append">
                <span class="pointer" @click="handleGenerate">生成秘钥</span>
              </template>
            </el-input>
            <span class="help-block">对应商户支付密钥</span>
          </el-form-item>
          <el-form-item label="小程序标题">
            <el-input v-model="wxForm.title" placeholder="请输入标题"></el-input>
            <span class="help-block">用于打包小程序进入页面的标题</span>
          </el-form-item>
          <el-form-item label="小程序跳转背景">
            <el-input v-model="wxForm.spa"></el-input>
            <span class="help-block">小程序跳转背景图片，可以为空</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="平台设置" name="seventh">
        <el-form ref="form" :model="platformForm" :label-width="labelWidth">
          <el-form-item label="平台状态">
            <el-radio-group v-model="platformForm.status">
              <el-radio label="0">开启</el-radio>
              <el-radio label="1">关闭</el-radio>
            </el-radio-group>
            <span class="help-block">平台状态</span>
          </el-form-item>
          <el-form-item label="平台服务电话">
            <el-input v-model="platformForm.tel"></el-input>
            <span class="help-block">平台服务电话</span>
          </el-form-item>
          <el-form-item label="平台看板密码">
            <el-input v-model="platformForm.pwd"></el-input>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="平台LOGO">
            <el-input v-model="platformForm.logo" :readonly="true"></el-input>
            <my-upload></my-upload>
            <span class="help-block"></span>
          </el-form-item>
          <el-form-item label="版权信息">
            <el-input v-model="platformForm.copyright" type="textarea"></el-input>
            <span class="help-block"></span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="API接口" name="eighth">
        <el-form ref="form" :model="apiForm" :label-width="labelWidth">
          <el-form-item label="API访问">
            <el-radio-group v-model="apiForm.status">
              <el-radio label="0">开启</el-radio>
              <el-radio label="1">关闭</el-radio>
            </el-radio-group>
            <span class="help-block">关闭后app和小程序都不可访问</span>
          </el-form-item>
          <el-form-item label="访问密钥">
            <el-input v-model="apiForm.appkey">
              <template slot="append">
                <span class="pointer" @click="handleGenerate">生成秘钥</span>
              </template>
            </el-input>
            <span class="help-block">第三方系统访问密钥</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="sysset-footer">
      <el-button type="primary" icon="el-icon-check" size="small">保存</el-button>
    </div>
  </div>
</template>

<script>
import MyUpload from "@/components/upload";
export default {
  data() {
    return {
      activeName: "first",
      commonForm: {
        limitqty: 0, //限制主体数量
        isWap: 0, //
        workerurl: "", //后台推送地址
        imgSize: 1024,
        pagesize: 10,
        isoneregion: "0",
        isruntask: "1", //计划任务
        listtype: "0"
      },
      styleForm: {
        style: "",
        menuColor: "",
        bgColor: "",
        btnColor: "",
        spa: ""
      },
      styleList: [
        {
          value: "0",
          label: "样式1"
        },
        {
          value: "1",
          label: "样式2"
        },
        {
          value: "2",
          label: "样式3"
        }
      ],
      wxForm: {
        appid: "",
        appsecret: "",
        mchid: "",
        mchsecret: "",
        title: "",
        spa: ""
      },
      noticeForm: {
        titleColor: "",
        textColor: "",
        keyColor: "",
        noticelid: ""
      },
      smsForm: {
        isbind: "0",
        isinvite: "0",
        smstype: "0",
        tplAppkey: "",
        codeTemplate: "",
        quoteTemplate: ""
      },
      apiForm: {
        status: "0",
        appkey: ""
      },
      platformForm: {
        status: "0",
        tel: "",
        pwd: "",
        logo: "",
        copyright: ""
      },
      labelWidth: "130px"
    };
  },
  methods: {
    handleClick() {},
    handleGenerate() {}
  },
  components: {
    MyUpload
  }
};
</script>

<style>
.sysset-footer {
  position: fixed;
  left: 200px;
  right: 0;
  bottom: 0;
  padding: 10px 20px;
  background: #f8f8f8;
  border-top: 1px solid #e7e7e7;
  display: flex;
  justify-content: flex-end;
}
.color-picker {
  display: flex;
}
.color-picker input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.color-picker .el-input {
  width: 217px;
}
.color-picker .el-color-picker__trigger {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
}
.el-tab-pane{
  padding-bottom: 20px;
}
</style>