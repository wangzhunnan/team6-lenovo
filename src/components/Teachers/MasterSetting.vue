<template>
  <div class style="background: #eee9e9">
    <h2>MasterSetting内容维护详情页</h2>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="5" :offset="1">
        <!-- <el-collapse v-for="(item,index) in leftTerm" :key="index" accordion style="text-align:center">
          <el-collapse-item :title="item.name" name="1">
            <div v-for="(item,index) in item.childList" :key="index">
              <div @click="CourseDetails(item.id)">{{item.name}}</div>
            </div>
          </el-collapse-item>
        </el-collapse>-->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          v-for="(item,index) in leftTerm"
          :key="index"
          :title="item.name"
        >
          <!-- 学期 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu" style="color:#49c0e0"></i>
              <span>{{item.name}}</span>
            </template>
            <!-- 课程 -->
            <el-menu-item-group>
              <el-menu-item
                index="'1-'+index"
                v-for="(item,index) in item.childList"
                :key="index"
                :title="item.name"
                @click="CourseDetails(item.id)"
              >{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16" :offset="1">
        <div>
          <div>
            <el-button @click="addCourse()">添加课程</el-button>
            <el-button @click="deleteCourse()">删除课程</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="序号" width="120" type="index"></el-table-column>
            <el-table-column prop="name" label="课程名称" width="200">
              <template slot-scope="{$index,row}">
                <div style="display:inline-block;width:90%">
                  <span v-if="showEdit[$index]">
                    <el-input
                      required
                      v-model="row.name"
                      placeholder="输入课程名称"
                      @keyup.enter.native="saveCustomCourse(row.name,row.id)"
                    ></el-input>
                  </span>
                  <span v-if="!showEdit[$index]">{{row.name}}</span>
                </div>
                <div style="display:inline-block">
                  <i
                    id="edit"
                    class="el-icon-edit"
                    @click="handleEdit($index,row)"
                    v-if="!showBtn[row.id]"
                  ></i>
                  <i
                    id="check"
                    class="el-icon-check"
                    @click="handelCancel($index,row)"
                    v-if="showBtn[row.id]"
                  ></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="最后更新时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sc" label show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="small" @click="uploadResources(scope.row.id)">上传资源</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div style="height: 500px"></div>
  </div>
</template>
<script>
export default {
  name: "MasterSetting",
  data() {
    return {
      leftTerm: [],
      tableData: [
        {
          id: "",
          name: "",
          createTime: "",
          updateTime: ""
        }
      ],
      //编辑框
      showEdit: [], //展示显示name的
      row: "",
      index: "",
      showBtn: [], //展示显示编辑或者对号符号的
      multipleSelection: [],
      delCurrent: [], //存储删除课程资源的id
      insertId: "" // 课程id
    };
  },
  methods: {
    CourseDetails(itemId) {
      this.insertId = itemId; //课程id
      //获取左边栏的全部信息
      // console.log(itemId);
      var app = this;
      this.$http
        .get(`/product/majorCustomCourse/getListByItemId/${itemId}`)
        .then(function(res) {
          // console.log(res.data);
          app.tableData = res.data;
        });
    },
    handleSelectionChange(val) {
      // console.log(val);
      //map函数是进行筛选每一行的id,并将获取到的id放入delCurrent数组中
      app.multipleSelection = val.map(item => {
        this.delCurrent.push(item.id);
      });
    },
    addCourse() {
      //添加课程
      var list = {
        name: this.name,
        createTime: this.createTime,
        updateTime: this.updateTime
      };
      this.tableData.push(list);
      // console.log(this.tableData);
    },
    handleEdit(index, row) {
      //当为编辑框的时候
      // console.log(index); //当前行的下标
      // console.log(row); //当前行的数据
      this.row = row;
      this.index = index;
      this.showEdit[index] = true; //修改数组
      this.$set(this.showEdit, index, true); //修改vue内的数据
      this.showBtn[row.id] = true;
      this.$set(this.showBtn, row.id, true);
    },
    handelCancel(index, row) {
      //当取消选框的时候,就是保存数据的时候
      // console.log(index);//5
      // console.log(row);
      this.showEdit[index] = false;
      this.showBtn[row.id] = false;
      this.saveCustomCourse(row.name, row.id);
    },
    saveCustomCourse(name, id) {
      //保存课程，就是当点击对号按钮符号时触发
      console.log(name);
      console.log(id);
      console.log(this);
      // console.log(this.insertId);//课程id
      var itemId = this.insertId;
      var app = this;
      this.$http
        .post("/product/majorCustomCourse/save", {
          itemId,
          name,
          id
        })
        .then(function(res) {
          console.log(res);
          if (res.data == "") {
            console.log("保存课程资源成功!");
            alert("课程创建成功，请重新刷新页面！");
          } else {
            console.log("失败的保存");
          }
        });
    },
    deleteCourse() {
      //删除课程
      console.log(this.multipleSelection);
      // this.delCurrent.push(id);
      console.log(this.delCurrent);
      var app = this;
      if (confirm("确认要删除所选课程吗？")) {
        this.$http
          .post("/product/majorCustomCourse/deletes", this.delCurrent)
          .then(function(res) {
            console.log(res);
            if (res.data == true) {
              console.log("课程删除成功!");
              alert("课程删除成功，请重新刷新页面！");
            } else {
              app.$message.error("删除失败");
            }
          });
      }
    },
    uploadResources(customCourseId) {
      //上传资源
      console.log(customCourseId);
      this.$http
        .get(`/product/customMaterial/getListByCourseId/${customCourseId}`)
        .then(function(res) {
          console.log(res.data);
        });
    }
  },
  created() {
    console.log(this);
    var app = this;
    // console.log(this.$route);
    var customId = this.$route.query.customId;
    this.$http
      .get(`/product/majorCustomItem/listByCustomIdForAble/${customId}`)
      .then(function(res) {
        // console.log(res.data);
        app.leftTerm = res.data;
      });
  }
};
</script>
<style>
</style>