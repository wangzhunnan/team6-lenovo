<template>
  <div class style="background: #eee9e9">
    <el-row class="top">
      <el-col :span="10" :offset="3">
        <div style="margin-top:30px">
          <div style="font-size:25px;color:#fff">welcome，MasterSetting内容维护界面</div>
          <div style="font-size:14px;color:#fff;padding-top:15px">贴合知识点 课程执行力 课程核心和主要内容</div>
        </div>
      </el-col>
      <el-col :span="4" :offset="4">
        <img src="../../images/back03.png" alt />
      </el-col>
    </el-row>
    <!-- -------------------------------- -->

    <!-- -------------------------------- -->
    <el-divider></el-divider>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="5" :offset="1">
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
            <el-table-column prop="createTime" label="创建时间" width="140" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="updateTime" label="最后更新时间" width="140" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="sc" label show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="dialogTableVisible = true">
                  <span @click="uploadResources(scope.row.id)">上传资源</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 上传资源dialog -->
          <el-dialog title="新增课程资源" :visible.sync="dialogTableVisible" width="70%">
            <el-table :data="gridData">
              <el-table-column property="num" type="index" label="序号" width="80"></el-table-column>
              <el-table-column property="typeId" label="文件类型" width="100"></el-table-column>
              <el-table-column property="fileName" label="文件名称"></el-table-column>
              <el-table-column property="fileAuthor" label="作者" width="80"></el-table-column>
              <el-table-column
                property="updateTime"
                label="最后更新时间"
                width="160"
                :formatter="dateFormat"
              ></el-table-column>
              <!-- <el-table-column property="updateTime" label="最后更新时间" width="160"></el-table-column> -->
              <el-table-column property="userName" label="上传人姓名"></el-table-column>
              <el-table-column property="opration" label="操作">
                <template slot-scope="scope">
                  <span @click="attributeHandle(scope.row)">
                    <el-button type="text" size="small" @click="dialogAttributeVisible = true">属性</el-button>
                  </span> |
                  <span>
                    <el-button type="text" size="small" @click="deleteAttribute(scope.row.id)">删除</el-button>
                  </span> |
                  <el-button type="text" size="small" @click="downloadAttribute(scope.row.id)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <span>资源类型：</span>
              <el-radio-group v-model="typeId" v-for="(item,index) in resourceType" :key="index">
                <el-radio :label="item.id">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
            <div>
              <span>上传文件：</span>
              <input type="file" @change="fileUpload($event)" />
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogTableVisible = false">
                <span @click="resourceSubmit">确 定</span>
              </el-button>
            </span>
          </el-dialog>
          <!-- 上传资源中的每条属性dialog -->
          <el-dialog title="编辑属性" :visible.sync="dialogAttributeVisible" width="30%">
            <div>
              作者：
              <input
                type="text"
                style="width:100%"
                :placeholder="attributeObj.fileAuthor"
                v-model="fileAuthor"
              />
            </div>
            <div style="margin-top:20px">
              描述：
              <textarea
                name
                id
                cols="55"
                rows="8"
                :placeholder="attributeObj.shortDescribe"
                v-model="shortDescVal"
              ></textarea>
            </div>
            <div style="margin-top:20px">
              内容：
              <textarea
                name
                id
                cols="55"
                rows="8"
                :placeholder="attributeObj.content"
                v-model="content"
              ></textarea>
            </div>
            <div style="margin-top:20px">
              上传图片：
              <input type="file" @change="fileImgUpload($event)" />
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogAttributeVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogAttributeVisible = false">
                <span @click="attributeUpdate">更 新</span>
              </el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <div style="height: 300px"></div>
  </div>
</template>
<script>
export default {
  name: "MasterSetting",
  data() {
    return {
      isCollapse: true,
      leftTerm: [], //页面加载时存放的左右侧数据
      tableData: [
        //右侧数据存储
        {
          id: "",
          name: "",
          createTime: "",
          updateTime: ""
        }
      ],
      itemId: 248, //存储左侧课程点击时传递来的id
      //编辑框
      showEdit: [], //展示显示name的
      row: "",
      index: "",
      showBtn: [], //展示显示编辑或者对号符号的
      multipleSelection: [],
      delCurrent: [], //存储删除课程资源的id
      gridData: [
        //上传资源
        {
          num: "",
          typeId: "", //资源类型
          fileName: "",
          fileAuthor: "",
          updateTime: "",
          userName: "",
          opration: ""
        }
      ],
      dialogTableVisible: false, //上传资源dialog
      dialogAttributeVisible: false, //上传资源中的属性dialog
      resourceType: [], //资源类型
      typeId: "", //显示资源类型
      customCourseId: "", //保存customCourseId：右边table当前行的id
      file: "", //存放上传视频的路径url
      fileImg: "", //存放上传图片的路径url
      attributeObj: {}, //每一行属性对象
      fileAuthor: "", //属性的作者
      shortDescVal: "", //属性的描述
      content: "", //属性的内容
    };
  },
  methods: {
    //获取左侧全部数据
    getAllList() {
      var app = this;
      // console.log(this.$route);
      var customId = this.$route.query.customId;
      this.$http
        .get(`/product/majorCustomItem/listByCustomIdForAble/${customId}`)
        .then(function(res) {
          // console.log(res.data);
          app.leftTerm = res.data;
          // console.log(app.leftTerm[0].childList[0].id);
          app.itemId = app.leftTerm[0].childList[0].id;
          console.log(app.itemId);//248 课程01的id
        });
    },
    //时间格式处理
    dateFormat: function(row, column) {
      // console.log(row);
      // console.log(column);
      var date = row[column.property];
      // console.log(date)
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD");
    },
    //点击每一个课程显示右边具体内容
    CourseDetails(itemIdChild) {
      // console.log(itemIdChild);
      this.itemId = itemIdChild;//将当前的id赋值给itemId
      this.tableDetails();
    },
    //获取左边栏的全部信息
    tableDetails() {
      // console.log(this.itemId);
      var app = this;
      this.$http
        .get(`/product/majorCustomCourse/getListByItemId/${this.itemId}`)
        .then(function(res) {
          // console.log(res.data);
          app.tableData = res.data;
          // console.log(app.tableData);
        });
    },
    //右侧table表格在切换每一行时会传入val值
    handleSelectionChange(val) {
      // console.log(val);
      //map函数是进行筛选每一行的id,并将获取到的id放入delCurrent数组中
      app.multipleSelection = val.map(item => {
        this.delCurrent.push(item.id);
      });
    },
    //添加空的一行课程
    addCourse() {
      var list = {
        name: this.name,
        createTime: this.createTime,
        updateTime: this.updateTime
      };
      this.tableData.push(list);
    },
    //当为编辑框的时候
    handleEdit(index, row) {
      // console.log(index); //当前行的下标
      // console.log(row); //当前行的数据
      this.row = row;
      this.index = index;
      this.showEdit[index] = true; //修改数组
      this.$set(this.showEdit, index, true); //修改vue内的数据
      this.showBtn[row.id] = true;
      this.$set(this.showBtn, row.id, true);
    },
    //当取消选框的时候,就是保存数据的时候
    handelCancel(index, row) {
      // console.log(index);//5
      // console.log(row);
      this.showEdit[index] = false;
      this.showBtn[row.id] = false;
      this.saveCustomCourse(row.name, row.id);
    },
    //保存课程，就是当点击对号按钮符号时触发
    saveCustomCourse(name, id) {
      // console.log(name);
      // console.log(id);
      // console.log(this);
      var itemId = this.itemId;
      var app = this;
      this.$http
        .post("/product/majorCustomCourse/save", {
          itemId,
          name,
          id
        })
        .then(function(res) {
          // console.log(res);
          if (res.data == "") {
            console.log("保存课程资源成功!");
            // alert("课程创建成功，请重新刷新页面！");
            app.$message.success("课程创建成功!");

            //再次获取table列表，实现更新
            app.tableDetails(app.itemId);
          } else {
            alert("失败的保存");
          }
        });
    },
    //删除课程
    deleteCourse() {
      // console.log(this.delCurrent);//这里删除的是每一条数据的id所组成的数组
      var app = this;
      if (confirm("确认要删除所选课程吗？")) {
        this.$http
          .post("/product/majorCustomCourse/deletes", this.delCurrent)
          .then(function(res) {
            // console.log(res);
            if (res.data == true) {
              app.$message.success("课程删除成功！");
              //再次获取table列表，实现更新
              app.tableDetails(app.itemId);
            }
          });
      }
    },
    //上传资源
    uploadResources(customCourseIdChild) {
      // console.log(customCourseId);
      this.customCourseId = customCourseIdChild; //保存右边table当前行数据id
      this.resourceList(customCourseIdChild);
    },
    //获取新增资源列表
    resourceList(customCourseId) {
      var app = this;
      //已有资源列表
      this.$http
        .get(`/product/customMaterial/getListByCourseId/${customCourseId}`)
        .then(function(res) {
          // console.log(res.data);
          app.gridData = res.data;
          // console.log(app.gridData);
        });
      //资源类型
      this.$http.get("/product/materialType/listForAble").then(function(res) {
        // console.log(res.data);
        app.resourceType = res.data;
      });
    },
    //资源提交中上传文件的选择文件 视频类
    fileUpload(event) {
      // console.log(event);
      // console.log(event.target.files[0]);
      this.file = event.target.files[0];
    },
    //资源提交
    resourceSubmit() {
      // console.log(this.customCourseId);
      // console.log(this.typeId);
      // console.log(this.file);
      var app = this;
      var FormData = new window.FormData();
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      FormData.append("file", this.file);
      this.$http
        .post(
          `/product/customMaterial/uploadFile?customCourseId=${this.customCourseId}&typeId=${this.typeId}`,
          FormData,
          config
        )
        .then(function(res) {
          // console.log(res.data);
          if (res.data == "") {
            app.$message.success("成功添加一条！");
            //再次调用获取接口函数，重新刷新列表
            var customCourseId = app.customCourseId;
            app.resourceList(customCourseId);
          } else {
            alert("添加失败");
          }
        });
    },
    //上传的图片类选择
    fileImgUpload(e) {
      // console.log(e);
      this.fileImg = event.target.files[0];
    },
    //点击每条资源的属性
    attributeHandle(row) {
      var app = this;
      // console.log(row);
      this.attributeObj = row;
      // console.log(this.attributeObj);
    },
    //提交写入的属性数据
    attributeUpdate() {
      var app = this;
      var detailId = this.attributeObj.id;
      // console.log(detailId);
      // console.log(this.fileAuthor);
      // console.log(this.shortDescVal);
      // console.log(this.content);
      var FormData = new window.FormData();
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      FormData.append("file", this.fileImg);
      this.$http
        .post(
          `/product/customMaterial/update?id=${detailId}&fileAuthor=${this.fileAuthor}&shortDescribe=${this.shortDescVal}&content=${this.content}`,
          FormData,
          config
        )
        .then(function(res) {
          // console.log(res);
          // console.log(res.data);
          if (res.data == "") {
            app.$message.success("更新成功！");
            app.fileAuthor = "";
            app.shortDescVal = "";
            app.content = "";
            //再次调用获取接口函数，重新刷新列表
            var customCourseId = app.customCourseId;
            app.resourceList(customCourseId);
          } else {
            app.$message.error("更新失败!");
          }
        });
    },
    //删除新增课程资源中的当前条
    deleteAttribute(id) {
      // console.log(id);
      var app = this;
      if (confirm("确认要删除此条数据吗？")) {
        this.$http
          .get(`/product/customMaterial/delete/${id}`)
          .then(function(res) {
            // console.log(res.data);
            if (res.data == "") {
              app.$message.success("删除成功");
              //再次调用获取接口函数，重新刷新列表
              var customCourseId = app.customCourseId;
              app.resourceList(customCourseId);
            } else {
              app.$message.error("删除失败");
            }
          });
      }
    },
    //下载新增课程资源中的当前条
    downloadAttribute(id) {
      var app = this;
      this.$http
        .get(`/product/customMaterial/downLoadFile/${id}`)
        .then(function(res) {
          console.log(res);
          // console.log(res.data);
          if (res.data == "") {
            app.$message.success("下载成功");
          } else {
            app.$message.error("下载失败");
          }
        });
    }
  },

  created() {
    this.getAllList();//获取左侧全部的数据

    this.tableDetails();//页面加载就显示第一学期下课程01内容

  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.top {
  background:linear-gradient(60deg, #36f3a4, #066b24);
}
</style>