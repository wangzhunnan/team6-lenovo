<template>
  <div class="content">

    <div class="search_bg">
      <div class="search">
        <el-input v-model="input" placeholder="Java 最核心的基础是什么" style="width: 450px;"></el-input>
        <button class="sousuo" type="button">搜答案</button>
        <button type="button">我的提问</button>
      </div>
    </div>

    <div class="ask_bg">
      <div class="my_ask">我要提问</div>
      <div class="my_problem">
        <p>
          <span>*</span>问题
        </p>
        <el-input v-model="question" placeholder="请在这里输入你的问题 (120个字符内)" style="width: 390px;"></el-input>
        <p>
          <span>*</span>问题说明
        </p>
        <el-input type="textarea" :rows="8" placeholder="请对你的问题进行详细描述" v-model="subject"></el-input>
        <p>问题标签</p>
        <el-input v-model="typeName" placeholder="java,html,sql" style="width: 390px;"></el-input>
        <span>* 用逗号分开，不超过五个，且每个标签长度不超过九个字符</span>
        <p>当前标签</p>
        <button type="button" @click="ask">提交问题</button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "myAnswer",
        data: function() {
            return {
                input: "",
                typeName: "",
                subject: "",
                question: ""
            };
        },
        methods: {
            //当前组件用到的函数
            ask: function() {
                // console.log(this.question);
                this.$http
                    .post("/business/studentQuestion/submitQuestion", {
                        typeName: this.typeName,
                        subject: this.subject,
                        question: this.question
                    })
                    .then(function(res) {
                        console.log(res);
                    });
            }
        },
        created() {
            //组件加载完成后的生命回调
        }
    };
</script>

<style scoped>
  /* 主体部分content */
  /* .content{
      width: 100%;
      height: 800px;
  } */
  .content .search_bg {
    /* width: 100%; */
    height: 80px;
    background: #62a1f4;
    border: 1px solid #62a1f4;
  }
  .search {
    margin-top: 20px;
    margin-left: 440px;
  }
  .search button {
    width: 120px;
    height: 40px;
    color: #fff;
    border: none;
  }
  .search .sousuo {
    margin-left: -5px;
    height: 40px;
    width: 120px;
  }
  .search button {
    background: rgba(255, 255, 255, 0.26);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.6);
  }
  .content .ask_bg {
    width: 55%;
    height: 558px;
    margin-left: 400px;
    /* background: #ccc; */
    /* border: 1px solid #000; */
  }
  .content .ask_bg .my_ask {
    width: 80px;
    height: 25px;
    /* background: #f00; */
    line-height: 25px;
    text-align: center;
    border-left: 3px solid #62a1f4;
    margin: 20px 0;
  }
  .content .ask_bg .my_problem {
    /* width: 780px; */
    /* background: #0f0; */
    margin-left: 10px;
    font-size: 13px;
    color: #999;
  }
  .content .ask_bg .my_problem p {
    margin: 10px 0;
    font-size: 14px;
    color: #606060;
  }
  .content .ask_bg .my_problem input {
    width: 750px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .content .ask_bg .my_problem .tag {
    width: 400px;
  }
  .content .ask_bg .my_problem span {
    color: #ff6a01;
    font-size: 12px;
    padding-left: 10px;
    width: 160px;
  }
  .content .ask_bg .my_problem button {
    width: 105px;
    height: 35px;
    background: #4abfe0;
    color: #fff;
    border: none;
  }
</style>
