<template>
  <div>
    <el-row class="header">
      <el-col :span="5" :offset="3">
        <div style="margin-top:40px">
          <div style="font-size:25px;color:#fff">课程管理</div>
          <div style="font-size:14px;color:#fff;padding-top:15px">贴合知识点 课程执行力 课程核心和主要内容</div>
        </div>
      </el-col>
      <el-col :span="4" :offset="9">
        <img src="../../images/back03.png" alt />
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane :label="item.name" v-for="(item,index) in arr" :key="index">
        <!-- 因为只有id为1的大前端课程下有学期及课程，所以在循环遍历时先判断一下 -->
        <div v-if="item.id == '1'" style="overflow: hidden;">
          <div v-for="(item,index) in item.majorCustomAdapterList" :key="index">
            <div v-if="item.id == '3'">
              <div v-for="(item,index) in item.majorCustomItemTreeAdapterList" :key="index">
                <div
                  style="width: 200px; text-align: center; height: 460px; line-height: 50px; float: left;background:#FAFAFA;margin-left:10px;"
                >
                  <!-- 学期 -->
                  <el-tag closable @close="clickClose(item.id)">{{ item.name }}</el-tag>
                  <!-- 课程 -->
                  <div v-for="(item,index) in item.childList" :key="index">
                    <el-tag closable @close="clickClose(item.id)">{{ item.name }}</el-tag>
                  </div>
                  <!-- 添加课程按钮框 -->
                  <template>
                    <div style="overflow: hidden; width: 160px; margin: 0 auto;" v-if="isShow">
                      <el-input class="input-new-tag" v-model="name" style="float: left;"></el-input>
                      <el-button
                        style="float: left; margin-top: 5px;"
                        type="primary"
                        plain
                        @click="clickAdd(item.customId,item.id)"
                      >添加</el-button>
                    </div>
                  </template>
                </div>
              </div>
              <template>
                <!-- 添加学期按钮框 -->
                <div style="float: left;" v-if="isShow">
                  <el-input class="input-new-tag" v-model="name"></el-input>
                  <el-button type="primary" plain @click="clickAdd(item.id,0,name)">添加</el-button>
                </div>
              </template>
            </div>
          </div>
          <div
            style="background-color: #3ff; width: 300px; height: 400px; float: right; margin-right: -10px;"
          >
            <div
              style="width: 300px; height: 150px; background: linear-gradient(60deg, #36f3a4, #409EFF);"
            >
              <i class="el-icon-edit" style="color: #fff; font-size: 25px; padding: 15px;"></i>
              <i
                class="el-icon-delete"
                style="color: #fff; font-size: 25px; padding: 15px; margin-left: 185px;"
              ></i>
            </div>
            <div style="width: 300px; height: 150px; background: #9ff;"></div>
            <div style="width: 300px; height: 100px; text-align: center; line-height: 100px;">
              <el-button type="primary" @click="hideOrShow" v-text="btnText"></el-button>
              <el-button type="primary" @click="masterSetting">内容维护</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "CourseManagement",
  data: function() {
    return {
      tableData: [],
      activeName: 0,
      dynamicTags: [],
      name: "",
      customId: "",
      id: "",
      arr: [],
      isShow: false,
      btnText: "课程定制"
    };
  },
  methods: {
    //获取全部数据
    getAllList() {
      var app = this;
      this.$http
        .get("/product/majorType/listContainCustomList")
        .then(function(res) {
          // console.log(res.data);
          app.arr = res.data;
        });
    },
    hideOrShow() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.btnText = "保存修改";
      } else {
        this.btnText = "课程定制";
      }
    },
    //点击内容维护跳转至页面
    masterSetting() {
      this.$router.push({
        path: "/teacher/MasterSetting",
        query: {
          customId: 3
        }
      });
    },
    // 添加课程
    clickAdd(customId, parentId) {
      var app = this;
      this.$http
        .post("/product/majorCustomItem/insert", {
          customId: customId,
          parentId: parentId,
          name: this.name
        })
        .then(function(res) {
          // console.log(res);
          app.$message.success("添加成功!");
          app.name = ""; //清空输入框
          app.getAllList(); //重新调用获取全部数据函数
        });
    },
    // 删除课程
    clickClose(id) {
      // console.log(id);
      var app = this;
      if (confirm("确认要删除所选课程吗？")) {
        this.$http
          .get(`/product/majorCustomItem/delete/${id}`)
          .then(function(res) {
            // console.log(res.data);
            app.$message.success("删除成功!");
            app.getAllList(); //重新调用获取全部数据函数
          });
      }
    }
  },
  created() {
    // 组件加载完成之后的生命回调函数,如果页面一加载就需要显示数据,数据就在此获取
    this.getAllList();
  }
};
</script>

<style scoped>
/* 标题部分 */
.header {
  background: linear-gradient(60deg, #36f3a4, #409EFF);
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  display: inline-block;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 80px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-input__inner {
  height: 30px;
}

.el-button + .el-button {
  margin-left: 40px;
}
</style>
