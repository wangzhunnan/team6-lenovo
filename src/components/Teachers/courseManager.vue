<template>
  <div id="thome">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <nav-menus></nav-menus>
      </el-header>

      <!-- 主题 -->
      <el-main>
        <div>
          <el-row>
            <el-col :span="3">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple-light">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="height:500px">
                  <el-tab-pane label="大前端" name="first">
                    <div>
                      <el-col :span="6" style="margin-left:6px;">
                        <el-card :body-style="{ padding: '0px',margin:'0px' }">
                          <img src="../../images/06denglu.jpg" alt style="width:100%;height:50%;" />
                          <div style="padding: 14px;">
                            <li style="list-style:none">NVB</li>
                            <br />
                            <li style="list-style:none">vcv</li>
                            <br />
                            <li style="list-style:none">13门课,57个小时,567所学校定制</li>
                            <div class="bottom clearfix" style="text-align:center">
                              <el-button size="small" @click="addTab(editableTabsValue)">课程定制</el-button>
                              <el-button type="text" class="button">内容维护</el-button>
                            </div>
                          </div>
                        </el-card>
                      </el-col>

                      <el-col span="12">
                        <ul style="margin-left:50px;float:left">
                          第一学期
                          <li>前端001</li>
                          <li>前端导论</li>
                          <el-tabs
                            v-model="editableTabsValue"
                            type="card"
                            closable
                            @tab-remove="removeTab"
                          >
                            <el-tab-pane
                              v-for="(item, index) in editableTabs"
                              :key="item.name"
                              :label="item.title"
                              :name="item.name"
                            ><li>{{item.content}}</li></el-tab-pane>
                          </el-tabs>
                        </ul>
                        <ul style="margin-left:50px;float:left">
                          第二学期
                          <li>前端002</li>
                        </ul>
                        <ul style="margin-left:50px;float:left">
                          第三学期
                          <li>php基础</li>
                        </ul>
                        <ul style="margin-left:50px;float:left"></ul>
                      </el-col>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="移动互联" name="second"></el-tab-pane>
                  <el-tab-pane label="软件开发" name="third"></el-tab-pane>
                  <el-tab-pane label="云计算" name="fourth"></el-tab-pane>
                  <el-tab-pane label="大数据" name="fifth"></el-tab-pane>
                  <el-tab-pane label="人工智能" name="sixth"></el-tab-pane>
                </el-tabs>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
        </div>

        <div style="display:none">
          <el-row>
            <el-col :span="3">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple-light">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="height:500px">
                  <el-col :span="5">
                    <el-menu
                      default-active="2"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                    >
                      <el-submenu index="1">
                        <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>第一学期</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item index="1-1">前端001</el-menu-item>
                          <el-menu-item index="1-2">前端导论</el-menu-item>
                        </el-menu-item-group>
                      </el-submenu>

                      <el-submenu index="2">
                        <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>第二学期</span>
                        </template>
                        <el-menu-item-group></el-menu-item-group>
                      </el-submenu>

                      <el-submenu index="3">
                        <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>第三学期</span>
                        </template>
                        <el-menu-item-group></el-menu-item-group>
                      </el-submenu>
                    </el-menu>
                  </el-col>
                </el-tabs>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
        </div>
      </el-main>

      <!-- 页脚 -->
      <el-footer>
        <copy-right></copy-right>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "courseManager",
  data() {
    return {
      activeName: "first",
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  created() {
    //页面一开始显示的数据
  }
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
  /* height: 500px; */
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

/* .bg-purple-light {
  background: #e5e9f2;
} */

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
