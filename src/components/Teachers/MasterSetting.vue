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
                <el-button @click="dialogTableVisible = true">
                  <span size="small" @click="uploadResources(scope.row.id)">上传资源</span>
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
              <el-table-column property="updateTime" label="最后更新时间" width="160"></el-table-column>
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
    <div style="height: 500px"></div>
  </div>
</template>
<script>
export default {
  name: "MasterSetting",
  data() {
    return {
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
      //编辑框
      showEdit: [], //展示显示name的
      row: "",
      index: "",
      showBtn: [], //展示显示编辑或者对号符号的
      multipleSelection: [],
      delCurrent: [], //存储删除课程资源的id
      insertId: "", // 课程id
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
      typeId: "1", //默认显示资源类型
      customCourseId: "", //保存customCourseId：右边table当前行的id
      file: "", //存放上传视频的路径url
      fileImg: "", //存放上传图片的路径url
      attributeObj: {}, //每一行属性对象
      fileAuthor: "", //属性的作者
      shortDescVal: "", //属性的描述
      content: "" //属性的内容
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
      // console.log(name);
      // console.log(id);
      // console.log(this);
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
          // console.log(res);
          if (res.data == "") {
            console.log("保存课程资源成功!");
            alert("课程创建成功，请重新刷新页面！");
          } else {
            // console.log("失败的保存");
            alert("失败的保存");
          }
        });
    },
    deleteCourse() {
      //删除课程
      // console.log(this.multipleSelection);
      // this.delCurrent.push(id);
      // console.log(this.delCurrent);
      var app = this;
      if (confirm("确认要删除所选课程吗？")) {
        this.$http
          .post("/product/majorCustomCourse/deletes", this.delCurrent)
          .then(function(res) {
            // console.log(res);
            if (res.data == true) {
              // console.log("课程删除成功!");
              alert("课程删除成功，请重新刷新页面！");
            } else {
              app.$message.error("删除失败");
            }
          });
      }
    },
    uploadResources(customCourseId) {
      //上传资源
      // console.log(customCourseId);
      this.customCourseId = customCourseId; //保存右边table当前行数据id
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
    fileUpload(event) {
      //上传文件的选择文件
      // console.log(event);
      // console.log(event.target.files[0]);
      this.file = event.target.files[0];
    },
    resourceSubmit() {
      //资源提交
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
            // app.uploadResources();//再次调用上传资源函数，重新加载数据
            // this.$options.methods.函数名字();
          } else {
            alert("添加失败");
          }
        });
    },
    fileImgUpload(e) {
      //上传的图片选择
      // console.log(e);
      this.fileImg = event.target.files[0];
    },
    attributeHandle(row) {
      //点击每条资源的属性
      var app = this;
      // console.log(row);
      this.attributeObj = row;
      // console.log(this.attributeObj);
    },
    attributeUpdate() {
      //提交写入的属性数据
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
            // app.uploadResources();//再次调用上传资源函数，重新加载数据 报错未修改
            // app.$options.methods.uploadResources();
          } else {
            app.$message.error("更新失败!");
          }
        });
    },
    deleteAttribute(id) {
      //删除新增课程资源中的当前条
      // console.log(id);
      var app = this;
      if (confirm("确认要删除此条数据吗？")) {
        this.$http
          .get(`/product/customMaterial/delete/${id}`)
          .then(function(res) {
            // console.log(res.data);
            if (res.data == "") {
              app.$message.success("删除成功");
              // app.$options.methods.uploadResources();
            } else {
              app.$message.error("删除失败");
            }
          });
      }
    },
    downloadAttribute(id){
      //下载新增课程资源中的当前条
      var app = this;
      this.$http.get(`/product/customMaterial/downLoadFile/${id}`).then(function(res){
        console.log(res);
        // console.log(res.data);
        if(res.data == ""){
          app.$message.success("下载成功");
        }else{
          app.$message.error("下载失败");
        }
      })
    }
  },
  created() {
    // console.log(this);
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