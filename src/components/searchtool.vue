<template>
  <div class="query" v-clickoutside="handleClose">
    <div :class="{'query-picker':true,'active':isActive}" @click="toggle">
      ==查询条件==
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="query-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import clickoutside from '@/directives/clickoutside'
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    handleClose() {
      if(this.isActive){
          this.isActive = false
      }
    }
  },
  mounted() {
    // this.globalClick(this.close);
  },
//   directives: { clickoutside }
};
</script>

<style>
.query {
  position: relative;
}
.query-picker {
  width: 200px;
  border-radius: 3px;
  height: 30px;
  border: 1px solid #c9c9c9;
  background: #fff;
  font-size: 12px;
  padding: 0 16px;
  cursor: pointer;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  z-index: 11;
  line-height: 32px;
  display: flex;
}
.query-picker i {
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.query-picker i {
  margin-left: auto;
  line-height: 32px;
}
.query-picker.active i {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari å’Œ Chrome */
  -o-transform: rotate(180deg); /* Opera */
}
.query-picker.active {
  border-bottom: 1px solid #fff;
}
.query-content {
  position: absolute;
  top: 29px;
  left: 0;
  min-width: 500px;
  min-height: 180px;
  background: #fff;
  border: 1px solid #c9c9c9;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  display: none;
  z-index: 10;
  padding: 20px;
  box-shadow: 2px 2px 5px #ccc;
}
.query-picker.active + .query-content {
  display: block;
}
</style>