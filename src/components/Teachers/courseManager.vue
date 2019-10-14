<template>
  <div id="thome">
    <el-container>
      <!-- 头部 -->
      <el-header>
          <div>课程定制</div>
      </el-header>
      <div>
        <div v-for="(item,index) in list" :key="index">
            <div v-for="(item,index) in item.majorCustomAdapterList" :key="index">
                <div v-for="(item,index) in item.majorCustomItemTreeAdapterList" :key="index">
                  <div style="color:#f00">{{item.customId}}</div>
                  <!-- <div v-for="(item,index) in item.childList" :key="index"> -->
                    <!-- <div style="color:#00f">{{item.customId}}</div> -->
                    <div @click="masterSetting(item.customId)">课程定制</div>
                  <!-- </div> -->
                </div>
            </div>
        </div>
      </div>

      <!-- 页脚 -->
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import MasterSetting from './MasterSetting.vue';
export default {
  name: "courseManager",
  data() {
    return {
      list: []
    };
  },
  methods: {
    masterSetting(customId){//MasterSetting内容维护详情页
      // this.$router.push(`/MasterSetting/${customId}`);
      this.$router.push({
        path: '/teacher/MasterSetting',
        query:{
          customId: customId
        }
      })
    }
  },
  created() {
    //页面一开始显示的数据
    var app = this;
    this.$http.get('/product/majorType/listContainCustomList').then(function(res){
      console.log(res.data);
      app.list = res.data;
    })
    
  }
};
</script>
<style>

</style>
