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

      <el-col :span="24">
        <div class="mbox">
          <p class="mb-p">问题库</p>

          <template>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="已回复提问" name="first">
                <template>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                    <el-table-column prop="caozuo" label="详情"></el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane label="未回复提问" name="second">
                <template>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                    <el-table-column prop="caozuo" label="详情"></el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>

          <el-divider></el-divider>

          <p class="mb-p">意见反馈</p>

          <template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="意见" width="180"></el-table-column>
              <el-table-column prop="name" label="意见类型" width="180"></el-table-column>
              <el-table-column prop="address" label="发起时间"></el-table-column>
              <el-table-column prop="caozuo" label="操作"></el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "OnlineAnswer",
        data: function() {
            return {
                activeName: "first",
                tableData: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄",
                        caozuo: "详情"
                    }
                ],
                page: 1,
                pageSize: 3,
                arr: [],
                arr1: [],
                arr2: []
            };
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            }
        },
        created() {
            // 组件加载完成之后的生命回调函数,如果页面一加载就需要显示数据,数据就在此获取
            var app = this;
            app.$http
                .post("/business/studentQuestion/page", {
                    page: this.page,
                    pageSize: this.pageSize
                })
                .then(function(res) {
                    // console.log(res);
                    app.arr = res.data.data;
                    console.log(app.arr);
                    for(var i=0;i<app.arr.length;i++){
                        if(app.arr[i].isSolution === "N"){
                            console.log('aa');
                            app.arr1 = app.arr[i];
                        }else{
                            app.arr2 = app.arr[i];
                        }
                    }
                    console.log("我是arr1："+app.arr1);
                    console.log("我是arr2："+app.arr2);
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
</style>
