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
          <el-tab-pane label="已回复提问">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="problem" label="问题" width="180">
                <!-- <div v-for="(item, index) in unanswer" :key="index">{{item.subject}}</div> -->
                <div v-for="(item, index) in unanswer" :key="index">
                  <span v-if="item.isSolution == 'Y'">{{item.subject}}</span>
                </div>
              </el-table-column>
              <el-table-column prop="time" label="发起时间" width="180">
                <div v-for="(item, index) in unanswer" :key="index">
                  <span v-if="item.isSolution == 'Y'">{{item.proposeTime}}</span>
                </div>
                <!-- <div v-for="(item, index) in unanswer" :key="index">{{item.proposeTime}}</div> -->
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <div v-for="(item, index) in unanswer" :key="index">
                  <span v-if="item.isSolution == 'Y'">已解答</span>
                </div>
              </el-table-column>
              <el-table-column prop="opration" label="操作">
                <div v-for="(item, index) in unanswer" :key="index">
                  <span v-if="item.isSolution == 'Y'" @click="dialogVisible = true">详情</span>
                </div>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="未回复提问">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="problem" label="问题" width="180">
                <div v-for="(item, index) in unanswer" :key="index">
                  <span v-if="item.isSolution == 'N'">{{item.subject}}</span>
                </div>
              </el-table-column>
              <el-table-column prop="time" label="发起时间" width="180">
                <div v-for="(item, index) in unanswer" :key="index">
                  <span v-if="item.isSolution == 'N'">{{item.proposeTime}}</span>
                </div>
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <div v-for="(item, index) in unanswer" :key="index">
                  <span v-if="item.isSolution == 'N'">未解答</span>
                </div>
              </el-table-column>
              <el-table-column prop="opration" label="操作">
                <div v-for="(item, index) in unanswer" :key="index">
                  <span v-if="item.isSolution == 'N'" @click="dialogVisible = true" class="answers">
                    <span @click="answerClick(item.id)">回复</span>
                  </span>
                </div>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!-- 提示框dialog -->
        <el-dialog
          :visible.sync="dialogVisible"
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
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              <span @click="submitAnswer(recovered.id,textarea)">提 交</span>
            </el-button>
          </span>
        </el-dialog>
      </div>
      <div class="mbox">
        <p>意见反馈</p>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="problem" label="意见" width="180">
            <div v-for="(item,index) in opinionList" :key="index">
              <span>{{item.subject}}</span>
            </div>
          </el-table-column>
          <el-table-column prop="problemType" label="意见类型" width="180">
            <div v-for="(item,index) in opinionList" :key="index">
              <span>{{item.typeName}}</span>
            </div>
          </el-table-column>
          <el-table-column prop="time" label="发起时间">
            <div v-for="(item,index) in opinionList" :key="index">
              <span>{{item.commitTime}}</span>
            </div>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <div v-for="(item,index) in opinionList" :key="index">
              <span v-if="item.isHandle == 'Y'">已处理</span>
              <span v-if="item.isHandle == 'N'" style="color:#f00">未处理</span>
            </div>
          </el-table-column>
          <el-table-column prop="opration" label="操作">
            <div v-for="(item, index) in opinionList" :key="index" class="answers">
              <span v-if="item.isHandle == 'Y'" @click="dialogVisible02 = true">
                <span @click="opinionSee(item.id)">查看</span>
              </span>
              <span v-if="item.isHandle == 'N'" @click="dialogVisible03 = true">
                <span style="color:#f00">处理</span>
              </span>
            </div>
          </el-table-column>
        </el-table>
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
            <textarea name id cols="30" rows="4" placeholder="" disabled>{{opinionDetails.handleResult}}</textarea>
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
            <textarea name id cols="30" rows="4" placeholder="输入反馈内容" v-model="textarea"></textarea>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible03 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible03 = false">
            <span @click="opinionHandle(opinionDetails.id,textarea)">提 交</span>
            <!-- <span>提交</span> -->
          </el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "myAnswer",
  data: function() {
    return {
      page: 1,
      pageSize: 10,
      tableData: [
        {
          problem: "",
          problemType: "",
          time: "",
          status: "",
          opration: ""
        }
      ],
      unanswer: [], //未回复列表
      recovered: {}, //回复列表
      opinionList: [], //意见列表
      opinionDetails: {}, //意见反馈处理详情
      dialogVisible: false,
      dialogVisible02: false,
      dialogVisible03: false,
      textarea: ""
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    answerClick(id) {
      // console.log(id);
      var app = this;
      this.$http
        .get("/business/studentQuestion/detail/" + id)
        .then(function(res) {
          app.recovered = res.data;
          console.log(app.recovered);
        });
    },
    submitAnswer(id, explanation) {
      console.log(id);
      var app = this;
      this.$http
        .post("/business/studentQuestion/explainQuestion", {
          id,
          explanation
        })
        .then(function(res) {
          console.log(res.data);
          if (res.data == "") {
            app.textarea = "";
            console.log("提交成功");
          }
        });
    },
    //反馈意见查看
    opinionSee(id) {
      var app = this;
      console.log(id);
      this.$http
        .get(`/business/opinionsSuggestions/detail/${id}`)
        .then(function(res) {
          console.log(res.data);
          app.opinionDetails = res.data;
          console.log(app.opinionDetails);
        });
    },
    //反馈意见处理提交
    opinionHandle(id,handleResult) {
      var app = this;
      console.log(id);
      this.$http
        .post('/business/opinionsSuggestions/examineComments',{
          id,
          handleResult
        })
        .then(function(res) {
          console.log(res);
          console.log(res.data);
          if (res.data == "") {
            app.textarea = "";
            console.log("提交成功");
          }
        });
    }
  },
  created() {
    //页面一开始显示的数据
    var app = this;
    this.$http
      .post("/business/studentQuestion/page", {
        page: this.page,
        pageSize: this.pageSize
      })
      .then(function(res) {
        app.unanswer = res.data.data;
        console.log(app.unanswer);
      });
    app.$http
      .post("/business/opinionsSuggestions/pageAll", {
        page: this.page,
        pageSize: this.pageSize
      })
      .then(function(res) {
        // console.log(res.data.data);
        app.opinionList = res.data.data;
        console.log(app.opinionList);
      });
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
