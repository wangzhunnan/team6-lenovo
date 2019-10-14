<template>
  <div>
    <h2>MasterSetting内容维护详情页</h2>
    <el-row>
      <el-col :span="8">
        <el-collapse v-for="(item,index) in leftTerm" :key="index" accordion>
          <el-collapse-item :title="item.name" name="1">
            <div v-for="(item,index) in item.childList" :key="index">
              <div @click="CourseDetails(item.id)">{{item.name}}</div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="16">
        <div>
          <div>
            <el-button @click="addCourse()">添加课程</el-button>
            <!-- <el-button @click="deleteCourse()">删除课程</el-button> -->
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <span v-for="(item,index) in multipleSelection" :key="index">
              <!-- <el-button @click="deleteCourse(item.id)">删除课程</el-button> -->
              <el-button size="mini" type="danger" @click="handleDelete(item.$index, item.row)">删除</el-button>
            </span>
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
              <el-button size="small">上传资源</el-button>
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
      showEdit: [],
      row: "",
      index: "",
      showBtn: [],
      multipleSelection: []
    };
  },
  methods: {
    CourseDetails(itemId) {
      console.log(itemId);
      var app = this;
      this.$http
        .get(`/product/majorCustomCourse/getListByItemId/${itemId}`)
        .then(function(res) {
          console.log(res.data);
          app.tableData = res.data;
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // indexMethod(index) {
    //   //序号列
    //   return index + 1;
    // },
    addCourse() {
      //添加课程
      var list = {
        name: this.name,
        createTime: this.createTime,
        updateTime: this.updateTime
      };
      this.tableData.push(list);
      console.log(this.tableData);
    },
    handleEdit(index, row) {
      //当为编辑框的时候
      console.log(index); //当前行的下标
      console.log(row); //当前行的数据
      console.log(row.id); //当前行的数据 undefined
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
      // console.log(row);//
      console.log(row.id);
      this.showEdit[index] = false;
      this.showBtn[row.id] = false;
      this.saveCustomCourse(row.name, row.id);
    },
    saveCustomCourse(name, id) {
      //保存课程，就是当点击对号按钮符号时触发
      console.log(name);
      console.log(id);
      console.log(this.$data.tableData);
      var itemId = this.$data.tableData[0].itemId;
      console.log(itemId);
      var app = this;
      this.$http
        .post("/product/majorCustomCourse/save", {
          itemId,
          name,
          id
        })
        .then(function(res) {
          // console.log(res.data);
          if (res.data) {
            console.log("保存课程资源成功!");
            // alert("课程创建成功，请重新刷新页面！");
          }
        });
    },
    // deleteCourse() {
    //   //删除课程
    //   console.log(this.multipleSelection);
    //   var delCurrent = this.multipleSelection;
    //   // console.log(id);
    //   this.$http
    //     .post("/product/majorCustomCourse/deletes", delCurrent)
    //     .then(function(res) {
    //       console.log(res);
    //       if (res.data == true) {
    //         console.log("课程删除成功!");
    //       }
    //     });
    // }
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
      
    }
  },
  created() {
    // console.log(this);
    var app = this;
    // console.log(this.$route.query.customId);
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