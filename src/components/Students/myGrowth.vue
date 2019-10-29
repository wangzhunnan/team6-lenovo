<template>
  <div style="background: #fff;">
    <div class="header">
      <el-row>
        <el-col :span="5" :offset="3">
          <div style="margin-top:40px">
            <div style="font-size:25px;color:#fff">联想9要素</div>
            <div style="font-size:14px;color:#fff;padding-top:15px">行动3要求 品德5要求 结果1要求</div>
          </div>
        </el-col>
        <el-col :span="4" :offset="9">
          <img src="../../images/back03.png" alt />
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-row :gutter="10" style="margin-top: 25px;">
        <el-col :span="12">
          <el-row style="border: 1px solid #ccc;border-radius:5px">
            <el-col :span="5" style="background:#d3d3d3;text-align:center">驻场评语</el-col>
            <el-col :span="19" style="background:#fff">
                <span>&nbsp;&nbsp;&nbsp;</span>想睡觉
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row style="border: 1px solid #ccc;border-radius:5px">
            <el-col :span="5" style="background:#d3d3d3;text-align:center">讲师评语</el-col>
            <el-col :span="19" style="background:#fff">
                <span>&nbsp;&nbsp;&nbsp;</span>暂无评语
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <table>
          <tr>
            <td>序号</td>
            <td>课程名称</td>
            <td>考试时间</td>
            <td>考试成绩</td>
            <td>班级排名</td>
            <td>查看试卷</td>
          </tr>
          <tr>
            <td>1</td>
            <td>WEB前端基础(HTML+CSS)</td>
            <td>2019-10-25</td>
            <td>68</td>
            <td>1</td>
            <td>查看试卷</td>
          </tr>
          <tr>
            <td>2</td>
            <td>WEB前端基础(HTML+CSS)</td>
            <td>2019-10-25</td>
            <td>缺考</td>
            <td>--</td>
            <td>查看试卷</td>
          </tr>
          <tr>
            <td>3</td>
            <td>WEB前端基础(HTML+CSS)</td>
            <td>2019-10-25</td>
            <td>缺考</td>
            <td>--</td>
            <td>查看试卷</td>
          </tr>
        </table>
      </el-row>
      <el-row style="margin-top: 25px;" :gutter="60">
        <el-col :span="11" :offset="1">
          <el-row style="color:#fff;font-size:14px;">
            <el-col :span="8" style="background:#ff69b4;text-align:center">联想班学生奖励 9要点</el-col>
            <el-col :span="16" style="background:pink;">
              <span>&nbsp;&nbsp;</span>
              奖励共
              <span></span>次
              共
              <span></span>分
            </el-col>
          </el-row>
          <el-row style="margin-top: 25px;">
            <div class="block">
              <el-timeline v-for="(item,index) in listPrize" :key="index">
                <el-timeline-item :timestamp="item.createTime" placement="top" color="#0f0">
                  <el-card>
                    <p>奖励项目：{{item.factorName}}</p>
                    <div>
                      加分：
                      <span style="color:#0f0">+2分</span>
                    </div>
                    <p>备注：{{item.fractionDesc}}</p>
                    <div>
                      <span>提交人：{{item.userName}}</span>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <span>提交于：{{item.rewardPenaltyTime}}</span>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-row>
        </el-col>
        <el-col :span="11">
          <el-row style="color:#fff;font-size:14px;">
            <el-col :span="8" style="background:#00bfff;text-align:center">联想班学生处罚 9要点</el-col>
            <el-col :span="16" style="background:#87cefa;">
              <span>&nbsp;&nbsp;</span>
              处罚共
              <span></span>次
              共
              <span></span>分
            </el-col>
          </el-row>
          <el-row style="margin-top: 25px;">
            <div class="block">
              <el-timeline v-for="(item,index) in listPenalty" :key="index">
                <el-timeline-item :timestamp="item.createTime" placement="top" color="#f00">
                  <el-card>
                    <p>奖励项目：{{item.factorName}}</p>
                    <div>
                      加分：
                      <span style="color:#f00">-2分</span>
                    </div>
                    <p>备注：{{item.fractionDesc}}</p>
                    <div>
                      <span>提交人：{{item.userName}}</span>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <span>提交于：{{item.rewardPenaltyTime}}</span>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "myGrowth",
  data() {
    return {
      recodeType: 1,
      listPrize: [],//奖励
      listPenalty: []//处罚
    };
  },
  methods: {},
  created() {
    //页面一开始显示的数据
    //获取联想9要素-奖励和待改进1、联想9要素-奖励和待改进数据
    var app = this;
    this.$http
      .post(
        `/business/nineEssentialFactor/getExcitationListBySemesterOrRecodeType?recodeType=${this.recodeType}`
      )
      .then(function(res) {
        console.log(res);
        // app.list = res.data;
        var list = res.data;
        for (var i = 0; i < list.length; i++) {
          if (list[i].fraction == 2) {
            //奖励
            app.listPrize.push(list[i]);
          } else {
            list[i].fraction == -2; //处罚
            app.listPenalty.push(list[i]);
          }
        }
      });
  }
};
</script>
<style>
.header {
  background: #808000;
}
.content {
  width: 80%;
  margin-left: 10%;
}
table tr td {
  border: 1px solid #000;
  text-align: center;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 25px;
}
</style>