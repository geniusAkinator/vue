<template>
  <div class="container form">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="所属工厂" prop="factory.factoryId">
        <el-select v-model="form.factory.factoryId" placeholder="请选择所属工厂">
          <el-option
            v-for="item in coptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告标题" prop="noticeName">
        <el-input v-model="form.noticeName" placeholder="请输入公告标题"></el-input>
      </el-form-item>
      <el-form-item label="公告类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择公告类型">
          <el-option
            v-for="item in toptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告描述">
        <el-input v-model="form.description" placeholder="请输入公告描述"></el-input>
      </el-form-item>
      <el-form-item label="公告内容">
        <quill-editor
          v-model="form.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="附件" class="readonly">
        <el-input v-model="form.file" placeholder="请上传附件" :readonly="true">
          <template slot="append">
            <my-file-upload @sendFile="getFile"></my-file-upload>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="查询关键字" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入查询关键字"></el-input>
        <span class="help-block">用|分隔符隔开</span>
      </el-form-item>
      <div class="add-footer">
        <el-button size="small" type="primary" icon="el-icon-check" @click="handleSubmit('form')">提交</el-button>
        <el-button size="small" icon="el-icon-back" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/index";
import MyFileUpload from "@/components/fileupload";
export default {
  data() {
    return {
      limited: 1,
      form: {
        factory: {
          factoryId: ""
        },
        state: 0, //状态
        description: "", //描述
        content: "", //内容
        type: "",
        noticeName: "", //名称
        keyword: "",
        file: ""
      },
      editorOption: config.editorOption,
      isShow: false,
      rules: {
        "factory.factoryId": [
          { required: true, message: "请选择所属工厂", trigger: "change" }
        ],
        noticeName: [
          { required: true, message: "请输入公告标题", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择公告类型", trigger: "change" }
        ],
        keyword: [
          { required: true, message: "请选择查询关键字", trigger: "change" }
        ]
      },
      cform: {
        pageNum: 1,
        pageSize: 0
      },
      coptions: [],
      toptions: [
        {
          value: "1",
          label: "通知公告"
        },
        {
          value: "2",
          label: "综合信息"
        }
      ]
    };
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(valid => {
        //表单验证
        if (valid) {
          //通过
          //ajax提交
          api
            .addNoticeData(this.form)
            .then(res => {
              if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
                //添加成功
                this.$message({
                  showClose: true,
                  message: "添加成功",
                  type: "success"
                });
                this.$parent.initTable();
                this.closeDialog();
              } else {
                //添加失败
                this.$message({
                  showClose: true,
                  message: "添加失败",
                  type: "warning"
                });
              }
            })
            .catch(_ => {});
        } else {
          return false;
        }
      });
    },
    handleBack() {
      this.closeDialog();
    },
    closeDialog() {
      this.$parent.$layer.closeAll();
    },
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},
    initForm() {
      api
        .getFactoryData(this.cform)
        .then(res => {
          if (res.code == this.AJAX_HELP.CODE_RESPONSE_SUCCESS) {
            let _data = res.data;
            let content = _data.content;
            content.map((item, i) => {
              if (!item.state) {
                let temp = {};
                temp.label = item.factoryName;
                temp.value = item.factoryId;
                this.coptions.push(temp);
              }
            });
          }
        })
        .catch(_ => {});
    },
    getFile(e) {
      this.form.file = e;
    }
  },
  created() {},
  mounted() {
    this.initForm();
  },
  components: {
    MyFileUpload
  }
};
</script>

<style>
.readonly input[readonly="readonly"] {
  background: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
.readonly .el-input-group__append {
  background: #fff;
}
</style>