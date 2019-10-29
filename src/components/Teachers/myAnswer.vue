<template>
  <div id="OnlineAnswer">
    <el-row>
      <el-col :span="24" class="header">
        <div class="h-text">
          <p class="h-t-p1">在线解答</p>
          <p class="h-t-p2">记录问题数据 知识点问答 在线问题答疑</p>
        </div>
        <div class="h-img">
          <img src="../../images/back03.png" alt />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="mbox">
        <p>问题库</p>
        <el-tabs type="border-card">
          <!-- 已回复部分 -->
          <el-tab-pane label="已回复提问">
            <el-table
              :data="dataNewsY.slice((currentPageNewsY-1)*pageSizeNewsY,currentPageNewsY*pageSizeNewsY)"
              style="width: 100%"
            >
              <!--slice(a,b):从下标a开始，到下标b结束，含头不含尾。
              第一页：(0,6)；第二页：(6,12)计算：当前页-1乘每页显示数，当前页乘每页显示数-->
              <el-table-column prop="subject" label="问题" width="180"></el-table-column>
              <el-table-column prop="proposeTime" label="发起时间" width="180"></el-table-column>
              <el-table-column prop="isSolution" label="状态">已解答</el-table-column>
              <el-table-column prop="opration" label="操作">
                <template slot-scope="scope">
                  <div @click="dialogNewsY = true" class="answers">
                    <span @click="answerClick(scope.row.id)">详情</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 已回复分页部分 -->
            <div class="block">
              <el-pagination
                @size-change="sizeChangeNewsY"
                @current-change="currentChangeNewsY"
                :current-page="currentPageNewsY"
                :page-size="pageSizeNewsY"
                layout="total, prev, pager, next, jumper"
                :total="this.dataNewsY.length"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <!-- 未回复部分 -->
          <el-tab-pane label="未回复提问">
            <el-table
              :data="dataNewsN.slice((currentPageNewsN-1)*pageSizeNewsN,currentPageNewsN*pageSizeNewsN)"
              style="width: 100%"
            >
              <!--slice(a,b):从下标a开始，到下标b结束，含头不含尾。
              第一页：(0,6)；第二页：(6,12)计算：当前页-1乘每页显示数，当前页乘每页显示数-->
              <el-table-column prop="subject" label="问题" width="180"></el-table-column>
              <el-table-column prop="proposeTime" label="发起时间" width="180"></el-table-column>
              <el-table-column prop="isSolution" label="状态">未解答</el-table-column>
              <el-table-column prop="opration" label="操作">
                <template slot-scope="{$index,row}">
                  <div @click="dialogNewsN = true" class="answers">
                    <span @click="answerClick(row.id,$index)">回复</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 未回复分页部分 -->
            <div class="block">
              <el-pagination
                @size-change="sizeChangeNewsN"
                @current-change="currentChangeNewsN"
                :current-page="currentPageNewsN"
                :page-size="pageSizeNewsN"
                layout="total, prev, pager, next, jumper"
                :total="this.dataNewsN.length"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- 已回复dialog -->
        <el-dialog
          :visible.sync="dialogNewsY"
          width="50%"
          :before-close="handleClose"
          title="在线提问详情"
        >
          <div>
            <div>问题：{{recovered.subject}}</div>
            <div>问题说明：{{recovered.question}}</div>
            <div>
              提问人：{{recovered.proposeStudentId}}
              <span>提问时间：{{recovered.proposeTime}}</span>
            </div>
            <div>问题标签：{{recovered.typeName}}</div>
            <div>回复答案：{{recovered.explanation}}</div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogNewsY = false">取 消</el-button>
            <el-button type="primary" @click="dialogNewsY = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 未回复dialog -->
        <el-dialog
          :visible.sync="dialogNewsN"
          width="50%"
          :before-close="handleClose"
          title="回复在线提问"
        >
          <div>
            <div>问题：{{recovered.subject}}</div>
            <div>问题说明：{{recovered.question}}</div>
            <div>
              提问人：{{recovered.proposeStudentId}}
              <span>提问时间：{{recovered.proposeTime}}</span>
            </div>
            <div>问题标签：{{recovered.typeName}}</div>
            <div>
              回复答案：
              <textarea name id cols="30" rows="4" v-model="textarea"></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogNewsN = false">取 消</el-button>
            <el-button type="primary" @click="dialogNewsN = false">
              <span @click="submitAnswer(recovered.id,textarea)">提 交</span>
            </el-button>
          </span>
        </el-dialog>
      </div>
      <div class="mbox">
        <p>意见反馈</p>
        <el-table
          :data="tableDataOpinion.slice((opinionCurrentPage-1)*opinionPageSize,opinionCurrentPage*opinionPageSize)"
          style="width: 100%"
        >
          <el-table-column prop="subject" label="意见" width="180"></el-table-column>
          <el-table-column prop="typeName" label="意见类型" width="180"></el-table-column>
          <el-table-column prop="commitTime" label="发起时间"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isHandle == 'Y'">已处理</span>
              <span v-if="scope.row.isHandle == 'N'" style="color:#f00">未处理</span>
            </template>
          </el-table-column>
          <el-table-column prop="opration" label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.isHandle == 'Y'" @click="dialogVisible02 = true" class="answers">
                <span @click="opinionSee(scope.row.id)">查看</span>
              </div>
              <div v-if="scope.row.isHandle == 'N'" @click="dialogVisible03 = true" class="answers">
                <span style="color:#f00" @click="opinionSee(scope.row.id)">处理</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 意见反馈分页部分 -->
        <div style="text-align:center;margin-top:40px;margin-bottom:10px;">
          <el-pagination
            background
            @size-change="opinionSizeChange"
            @current-change="opinionCurrentChange"
            :current-page="opinionCurrentPage"
            :page-size="opinionPageSize"
            layout="total, prev, pager, next, jumper"
            :total="this.tableDataOpinion.length"
          ></el-pagination>
        </div>
        <!-- 查看意见反馈处理 -->
        <el-dialog
          :visible.sync="dialogVisible02"
          width="50%"
          :before-close="handleClose"
          title="意见反馈详情"
        >
          <div>
            <div>意见：{{opinionDetails.subject}}</div>
            <div>意见说明：{{opinionDetails.content}}</div>
            <div>
              反馈人：{{opinionDetails.handleUserName}}
              <span>反馈时间：{{opinionDetails.handleTime}}</span>
            </div>
            <div>意见类型：{{opinionDetails.typeName}}</div>
            <div>
              反馈处理：
              <textarea
                name
                id
                cols="30"
                rows="4"
                :placeholder="opinionDetails.handleResult"
                disabled
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible02 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible02 = false">
              <span>确 定</span>
            </el-button>
          </span>
        </el-dialog>
        <!-- 处理意见处理 -->
        <el-dialog
          :visible.sync="dialogVisible03"
          width="50%"
          :before-close="handleClose"
          title="意见反馈处理"
        >
          <div>
            <div>意见：{{opinionDetails.subject}}</div>
            <div>意见说明：{{opinionDetails.content}}</div>
            <div>
              反馈人：{{opinionDetails.handleUserName}}
              <span>反馈时间：{{opinionDetails.handleTime}}</span>
            </div>
            <div>意见类型：{{opinionDetails.typeName}}</div>
            <div>
              反馈处理：
              <textarea
                name
                id
                cols="30"
                rows="4"
                placeholder="输入反馈内容"
                v-model="textareaFeedback"
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible03 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible03 = false">
              <span @click="opinionHandle(opinionDetails.id,textareaFeedback)">提 交</span>
              <!-- <span>提交</span> -->
            </el-button>
          </span>
        </el-dialog>
      </div>
      <div style="height:200px"></div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "myAnswer",
  data: function() {
    return {
      page: 1, //请求页数
      pageSize: 100, //请求总条数（最大化去请求，把全部都请求到）
      dataNewsY: [], //已回复
      currentPageNewsY: 1, //当前页
      pageSizeNewsY: 5, //每页显示数
      dataNewsN: [], //未回复
      currentPageNewsN: 1, //当前页
      pageSizeNewsN: 6, //每页显示数
      dialogNewsY: false, //已回复
      dialogNewsN: false, //未回复
      recovered: {}, //回复点入中的详情
      textarea: "", //回复的内容
      index: "", //回复当前项的index
      tableDataOpinion: [], //意见反馈列表
      opinionCurrentPage: 1, //意见默认显示页
      opinionPageSize: 4, // 意见默认每页显示的条数
      opinionDetails: {}, //意见反馈处理详情
      dialogVisible02: false, //查看意见反馈处理dialog
      dialogVisible03: false, //处理意见处理dialog
      textareaFeedback: "", //反馈意见内容
      tableDataNews:[]
    };
  },
  methods: {
    //弹出框的关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //获取问题库消息列表
    getNewList() {
      this.tableDataNews = [];
      this.dataNewsY = [];
      this.dataNewsN=[];
      var app = this;
      this.$http
        .post("/business/studentQuestion/page", {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(function(res) {
          // console.log(res.data);
          app.tableDataNews = res.data.data;
          for (var i = 0; i < app.tableDataNews.length; i++) {
            if (app.tableDataNews[i].explanation == null) {
              //未回复
              app.dataNewsN.push(app.tableDataNews[i]);
            } else {
              //已回复
              app.tableDataNews[i].isSolution == "Y";
              app.dataNewsY.push(app.tableDataNews[i]);
            }
          }
          // console.log(app.dataNewsY); //已回复
          // console.log(app.dataNewsN); //未回复
        });
    },
    //未回复的分页
    sizeChangeNewsN(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSizeNewsN = val;
    },
    currentChangeNewsN(val) {
      // console.log(`当前页: ${val}`);
      this.currentPageNewsN = val;
    },
    // 已回复的分页
    sizeChangeNewsY(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSizeNewsY = val;
    },
    currentChangeNewsY(val) {
      // console.log(`当前页: ${val}`);
      this.currentPageNewsY = val;
    },
    //回复详情
    answerClick(id, index) {
      // console.log(id);
      // console.log(index);
      this.index = index; //保存当前数据的index
      var app = this;
      this.$http
        .get("/business/studentQuestion/detail/" + id)
        .then(function(res) {
          app.recovered = res.data;
          // console.log(app.recovered);
        });
    },
    //提交回复内容
    submitAnswer(id, explanation) {
      // console.log(id);
      var app = this;
      this.$http
        .post("/business/studentQuestion/explainQuestion", {
          id,
          explanation
        })
        .then(function(res) {
          // console.log(res.data);
          if (res.data == "") {
            app.textarea = ""; //清空输入框
            // console.log("提交成功");
            app.$message.success("提交回复成功");
            // console.log(app.index);
            // console.log(app.dataNewsN);
            // console.log(app.dataNewsN[app.index]);
            // app.dataNewsN[app.index].isSolution = "Y"; //修改是否为回复的状态
            // app.$set(app.dataNewsN[app.index], "isSolution", "Y"); //修改vue中的回复的状态
            app.getNewList(); //重新调用获取消息列表函数

          }
        });
    },
    //获取意见反馈列表
    getOpinionList() {
      var app = this;
      this.$http
        .post("/business/opinionsSuggestions/pageAll", {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(function(res) {
          // console.log(res.data);
          app.tableDataOpinion = res.data.data;
          // console.log(app.tableDataOpinion);
        });
    },
    //问题反馈分页
    opinionSizeChange(val) {
      this.opinionPageSize = val;
    },
    opinionCurrentChange(val) {
      this.opinionCurrentPage = val;
    },
    //反馈意见查看
    opinionSee(id) {
      var app = this;
      // console.log(id);
      this.$http
        .get(`/business/opinionsSuggestions/detail/${id}`)
        .then(function(res) {
          // console.log(res.data);
          app.opinionDetails = res.data;
          // console.log(app.opinionDetails);
        });
    },
    //反馈意见处理提交
    opinionHandle(id, handleResult) {
      var app = this;
      // console.log(id);
      console.log(handleResult);
      this.$http
        .post("/business/opinionsSuggestions/examineComments", {
          id,
          handleResult
        })
        .then(function(res) {
          // console.log(res);
          console.log(res.data);
          if (res.data == "") {
            app.textareaFeedback = ""; //清空输入框
            app.$message.success("提交成功");

            app.getOpinionList(); //重新调用获取意见反馈列表
          } else {
            app.$message.error("提交失败");
          }
        });
    }
  },
  created() {
    //页面一开始显示的数据
    this.getNewList(); //调用获取消息列表函数
    this.getOpinionList(); //调用获取意见反馈列表函数
  }
};
</script>

<style>
/* 标题部分 */
.header {
  min-height: 144px;
  background: linear-gradient(60deg, #6cc4ce, #65f1ce);
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

/* 主要内容 */
.mbox {
  margin-right: 100px;
  margin-left: 100px;
  margin-top: 50px;
}
.mb-p {
  height: 18px;
  line-height: 18px;
  font-size: 16px;
  border-left: 4px solid rgb(74, 192, 224);
  padding-left: 10px;
}
.answers span:hover {
  cursor: pointer;
}
</style>
