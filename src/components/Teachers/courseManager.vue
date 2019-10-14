<template>
  <div>
    <el-row>
      <el-col :span="24" class="header">
        <div class="h-text">
          <p class="h-t-p1">课程管理</p>
          <p class="h-t-p2">贴合知识点 课程执行力 课程核心和主要内容</p>
        </div>
        <div class="h-img">
          <img src="../../images/back03.png" alt />
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane :label="item.name" v-for="(item,index) in arr" :key="index">
        <!-- 因为只有id为1的大前端课程下有学期及课程，所以在循环遍历时先判断一下 -->
        <div v-if="item.id == '1'" style="overflow: hidden;">
          <div v-for="(item,index) in item.majorCustomAdapterList" :key="index">
            <div v-if="item.id == '3'">
              <div v-for="(item,index) in item.majorCustomItemTreeAdapterList" :key="index">
                <div
                  style="width: 200px; text-align: center; height: 460px; line-height: 50px; float: left;"
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
            style="background-color: #f0f; width: 300px; height: 400px; float: right; margin-right: 40px;"
          >
            <div
              style="width: 300px; height: 150px; background: linear-gradient(60deg, #3a6bf1, #7ecff5);"
            >
              <i class="el-icon-edit" style="color: #fff; font-size: 25px; padding: 15px;"></i>
              <i
                class="el-icon-delete"
                style="color: #fff; font-size: 25px; padding: 15px; margin-left: 185px;"
              ></i>
            </div>
            <div style="width: 300px; height: 150px; background-color: #FFF68F;"></div>
            <div style="width: 300px; height: 100px; text-align: center; line-height: 100px;">
              <el-button type="primary" @click="hideOrShow" v-text="btnText"></el-button>
              <el-button type="primary" @click="whbtn">内容维护</el-button>
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
    handleClick(tab) {
      // console.log(tab);
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
    whbtn() {
      var app = this;
      app.$router.push(`/teacher/MasterSetting/${3}`);
    },
    // 添加课程
    clickAdd(customId, parentId) {
      this.$http
        .post("/product/majorCustomItem/insert", {
          customId: customId,
          parentId: parentId,
          name: this.name
        })
        .then(function(res) {
          console.log(res);
        });
    },
    // 删除课程
    clickClose(id) {
      console.log(id);
      this.$http
        .get(`/product/majorCustomItem/delete/${id}`)
        .then(function(res) {
          console.log(res.data);
        });
    }
  },
  created() {
    // 组件加载完成之后的生命回调函数,如果页面一加载就需要显示数据,数据就在此获取
    var app = this;
    this.$http
      .get("/product/majorType/listContainCustomList")
      .then(function(res) {
        console.log(res.data);
        app.arr = res.data;
      });
  }
};
</script>

<style scoped>
/* 标题部分 */
.header {
  min-height: 144px;
  background: linear-gradient(60deg, #f336aa, #f57ed7);
}
.h-text {
  float: left;
  margin-left: 180px;
  color: #ffffff;
}
.h-t-p1 {
  font-size: 26px;
  font-weight: 400;
}
.h-t-p2 {
  font-weight: 300;
  font-size: 16px;
}
.h-img {
  float: right;
  margin-right: 77px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
