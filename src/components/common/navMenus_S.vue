<template>
  <div id="navMenus">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <div class="sidebar">
            <div class="lenovo_logo">
              <img src="../../images/lenovo-learning.png" alt />
            </div>
            <div style="color:#fff">WEB前端开发</div>
            <div class="semester">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  第五学期本学期
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>全部学期</el-dropdown-item>
                  <el-dropdown-item>第一学期</el-dropdown-item>
                  <el-dropdown-item>第二学期</el-dropdown-item>
                  <el-dropdown-item>第三学期</el-dropdown-item>
                  <el-dropdown-item>第四学期</el-dropdown-item>
                  <el-dropdown-item>第五学期(本学期)</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-conten bg-purple">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            
          >
            <el-menu-item index="1" style="height:45px;line-height:45px">我的专业</el-menu-item>
            <el-menu-item index="2" style="height:45px;line-height:45px">我的课程</el-menu-item>
            <el-menu-item index="3" style="height:45px;line-height:45px">我的成长</el-menu-item>
            <el-menu-item index="4" style="height:45px;line-height:45px">我的参与</el-menu-item>
            <el-menu-item index="5" style="height:45px;line-height:45px">我的考试</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <ul class="loginUser">
            <li>
              <span style="cursor:pointer;color:#a3a3a4;font-size:14px" @click="Mine">王准男</span>
              <span class="ask_title" @click="myQuestions()">在线提问</span>
              <span style="cursor:pointer;color:#a3a3a4;font-size:14px;margin-left:15px">退出</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "navMenus",
  data: function() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key) {
      console.log(key);
      if(key == "1"){
        this.$router.push('/student/myMajor');
      }else if(key == "2"){
        this.$router.push('/student/myCourse');
      }else if(key == "3"){
        this.$router.push('/student/myGrowth');
      }else if(key == "4"){
        this.$router.push('/student/myPar');
      }else if(key == "5"){
        this.$router.push('/student/myExam');
      }
    },
    myQuestions(){//在线提问
      this.$router.push('/student/myQuestion')
    },
    Mine(){//我
      this.$router.push('/student/mine')
    }
  }
};
</script>
<style>
a {
  color: #6c6868;
  font-size: 12px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  padding-left: 0 !important;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  position: relative;
}

.grid-content img {
  height: 46px;
  display: block;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.loginUser {
  overflow: hidden;
}
.loginUser li {
  float: left;
  margin-left: 20px;
}
.logoutSvg {
  opacity: 0.1;
}
.ask_title {
  background: #49c0e0;
  font-size: 14px;
  color: white;
  padding: 15px 5px;
}
.ask_title:hover {
  cursor: pointer;
}
#navMenus .el-badge__content.is-fixed {
  top: 11px;
  line-height: 13px;
  padding: 0px 3px;
  height: 13px;
}
/* sidebar */
.semester{
  width: 100%;
  border: 1px solid #ccc;
 }
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.sidebar{
    position: absolute;
    height: 970px;
    width: 100%;
    background: #293039;
    text-align: center;
}
.sidebar .lenovo_logo{
    margin-left: 32px;
}
</style>