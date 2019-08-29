<template>
  <div class="my-card">
    <div class="my-card-header">
      <div class="my-card-title">
        <slot name="title"></slot>
      </div>
      <div class="my-card-others">
        <slot name="others"></slot>
      </div>
    </div>
    <div class="my-card-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
}
.my-card-title {
  background: rgb(12, 157, 255);
  color: #fff;
  display: inline-block;
  padding: 10px;
  
}
.my-card-header{
    overflow: hidden;
}
.my-card-header,.my-card-content{
    width: 100%;
}
.my-card-content{
    min-height: 60px;
    position: relative;
    border: 1px solid #EBEEF5
}
.my-card-content::before{
    content: '';
    display: block;
    left: 0;
    right: 0;
    height: 2px;
    background: rgb(12, 157, 255);
}

</style>