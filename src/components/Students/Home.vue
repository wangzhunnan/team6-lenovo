<template>
  <div id="stuHome">
    <el-container>
      <el-header>
        <nav-menus_S></nav-menus_S>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <copy-right></copy-right>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import navMenus_S from "../common/navMenus_S.vue";
import copyRight from "../common/copyRight.vue";
export default {
  name: "stuHome",
  data() {
    return {};
  },
  components: {
    navMenus_S, //在当前组件注册navMenus组件，只有注册才能使用
    copyRight
  }
};
</script>
<style>
a {
  text-decoration: none;
}
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  padding: 0;
}
.el-header {
  width: 1100px;
  margin: auto;
  line-height: 45px;
  height: 46px !important;
  padding-left: 10px !important;
}
#thome ul.el-menu-demo > li {
  height: 45px !important;
  line-height: 45px !important;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 45px !important;
  line-height: 45px !important;
}
.el-main {
  background-color: #E9EEF3;
  padding: 0;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>