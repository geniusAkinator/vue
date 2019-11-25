<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="140px">
      <el-form-item label="误报故障自动处理">
        <el-switch v-model="form.isAutomate"></el-switch>
        <div v-if="form.isAutomate">
          <el-input-number v-model="num" @change="handleChange" :min="1" label="描述文字" size="mini"></el-input-number>
          <span>分钟内不再重复上报，故障自动设置为误报。</span>
        </div>
      </el-form-item>
      <el-form-item label="故障处理超时设置">
        <el-switch v-model="form.isOvertime"></el-switch>
        <div v-if="form.isOvertime">
          <el-input-number v-model="num" @change="handleChange" :min="1" label="描述文字" size="mini"></el-input-number>
          <span>分钟内不再重复上报，故障自动设置为超时。</span>
        </div>
      </el-form-item>
      <el-form-item label="故障处理通知超时">
        <el-switch v-model="form.isNotify"></el-switch>
        <div v-if="form.isNotify">
          <el-button
            size="mini"
            icon="el-icon-plus"
            round
            @click="handleNotifyClick"
            ref="notifyBtn"
          ></el-button>
        </div>
      </el-form-item>
      <el-form-item label="隐患处理超时设置">
        <el-switch v-model="form.isOvertimeHazard"></el-switch>
        <div v-if="form.isOvertimeHazard">
          <el-input-number v-model="num" @change="handleChange" :min="1" label="描述文字" size="mini"></el-input-number>
          <span>分钟内不再重复上报，隐患自动设置为超时。</span>
        </div>
      </el-form-item>
      <el-form-item label="隐患处理通知超时">
        <el-switch v-model="form.isNotifyHazard"></el-switch>
        <div v-if="form.isNotifyHazard">
          <el-button size="mini" icon="el-icon-plus" round></el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="sysset-footer">
      <el-button type="primary" icon="el-icon-check" size="small">保存</el-button>
    </div>
    <div class="picker-content">
      <transition name="myFadeRight" mode="out-in">
        <my-member-picker v-show="show" v-clickoutside="handleClose"></my-member-picker>
      </transition>
    </div>
  </div>
</template>

<script>
import MyMemberPicker from "@/components/memberpicker";
export default {
  data() {
    return {
      form: {
        isAutomate: false,
        isOvertime: false,
        isNotify: false,
        isOvertimeHazard: false,
        isNotifyHazard: false
      },
      num: 1,
      show: false
    };
  },
  methods: {
    handleChange() {},
    handleNotifyClick() {
      this.show = true;
    },
    handleClose(e) {
      console.log(e.target);
      console.log(this.$refs.notifyBtn)
      //   this.show = false;
    }
  },
  components: {
    MyMemberPicker
  }
};
</script>

<style>
.picker-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 53px;
  width: 300px;
  z-index: 999;
}
.sysset-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 20px;
  background: #f8f8f8;
  border-top: 1px solid #e7e7e7;
  display: flex;
  justify-content: flex-end;
  z-index: 10;
}
.myFadeRight-enter-active,
.myFadeRight-leave-active {
  transition: all 0.3s ease-in-out;
}
.myFadeRight-enter, .myFadeRight-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(300px);
}
</style>