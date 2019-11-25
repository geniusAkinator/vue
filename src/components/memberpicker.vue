<template>
  <div class="member-picker">
    <el-input v-model="keyword" placeholder="请输入内容" size="mini"></el-input>
    <ul class="teamer_list">
      <template v-for="(item,index) in teamerList">
        <li
          :class="item.isCollapsed?'teamer_item collapsed':'teamer_item expanded'"
          :key="index"
          @click="handleClick(index)"
        >
          <div>
            <i class="el-icon-plus"></i>
            <i class="el-icon-minus"></i>
            <span class="teamer_name">{{item.label}}</span>
          </div>
          <el-collapse-transition>
            <ul class="member_list" v-show="item.isCollapsed">
              <li
                class="member_item"
                v-for="(mitem,idx) in item.children"
                :key="idx"
                @click.stop="handleSubClick"
              >
                <span class="member_name">{{mitem.label}}</span>
                <el-tag type="info">{{mitem.duty}}</el-tag>
              </li>
            </ul>
          </el-collapse-transition>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      keyword: "",
      tform: {
        pageNum: 1,
        pageSize: 0
      },
      eform: {
        pageNum: 1,
        pageSize: 0,
        departmentId: 0
      },
      teamerList: []
    };
  },
  methods: {
    handleClick(index) {
      this.eform.departmentId = this.teamerList[index].id;
      api
        .getEmployeeData(this.eform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            console.log(_data.content);
            if (_data.content.length) {
              let arr = [];
              _data.content.map((item, i) => {
                let temp = {};
                temp.id = item.employeeId;
                temp.label = item.name;
                temp.duty = item.duty;
                arr.push(temp);
              });
              this.$set(this.teamerList[index], "children", arr);
              this.$set(
                this.teamerList[index],
                "isCollapsed",
                !this.teamerList[index].isCollapsed
              );
            }
          }
        })
        .catch(_ => {});
    },
    handleSubClick() {}
  },
  mounted() {
    api
      .getTeamerData(this.tform)
      .then(res => {
        if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
          let _data = res.data;
          this.teamerList = _data.content;
          this.teamerList.map((item, i) => {
            this.$set(this.teamerList[i], "label", item.departmentName);
            this.$set(this.teamerList[i], "id", item.departmentId);
            this.$set(this.teamerList[i], "isCollapsed", false);
          });
        }
      })
      .catch(_ => {});
  }
};
</script>

<style>
.member-picker {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #87cebb;
  padding: 10px;
  overflow: hidden;
  overflow-y: scroll;
  border-left: 1px solid #e7e7e7;
  background-image: url("../assets/texture.png");
  color: #fff;
}
.teamer_list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.teamer_list > li {
  display: block;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.teamer_item.expanded i.el-icon-minus {
  display: none;
}
.teamer_item.expanded i.el-icon-plus {
  display: inline-block;
}
.teamer_item.collapsed i.el-icon-minus {
  display: inline-block;
}
.teamer_item.collapsed i.el-icon-plus {
  display: none;
}
.member_list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.member_list li {
  display: block;
  cursor: pointer;
  padding: 5px;
  padding-left: 40px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  margin-top: 10px;
}
.teamer_name{
    font-weight: bold;
}
</style>