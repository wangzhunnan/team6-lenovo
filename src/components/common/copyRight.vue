<template>
  <div id="copyRight" class="footer">
    <div class="z-footerWarp">
      <div class="z-footer1">
        <span class="z-uplogo">
          <img src="../../images/logo.png" alt />
        </span>
        <span>|</span>
        &nbsp;
        培养能力 塑造人才
      </div>
      <div class="z-footer2">
        <span><a href="#">联系我们</a></span>
        <span><a href="#">意见反馈</a></span>
        <span><a href="#">名师风采</a></span>
      </div>
      <div class="z-jp">
        <span>Copyright 2017 联想 (北京) 有限公司 京ICP备11035381 | 京公网安备110108007970号</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "copyRight",
  data: function() {
    return {};
  }
};
</script>
<style>
.footer {
  width: 100%;
  background: url(../../images/ditu.jpg) no-repeat;
  background-size: 100%;
  padding-top: 30px;
  /* margin-top: 30px; */
  bottom: 0;
  height: 94px;
}

.z-footerWrap {
  width: 600px;
  margin: 0 auto;
}

.z-footer1 {
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: #afb0b2;
  margin-bottom: 8px;
  font-size: 16px;
}

.z-footer1 span {
  color: #6c7177;
  font-weight: 100;
  margin-left: 10px;
}

.z-footer2 {
  width: 100%;
  height: 25px;
  text-align: center;
  margin-top: 10px;
}
.z-footer2 span{
    display:inline-block;
    width: 125px;
}
.z-footer2 span a:hover{
    color: #fff;
}


.z-jp {
  height: 30px;
  line-height: 30px;
  color: #6f7376;
  text-align: center;
  font-size: 12px;
}

</style>