<!--  -->
<template>
  <el-header class="home-header">
    <div class="back">
      <a href="javascript:void(0)">
        <img src="@/assets/image/largelist.png" alt />
      </a>
    </div>
    <div class="logo">
      <a>数据可视化工具</a>
      <img src="@/assets/image/titleBg.png" />
    </div>
    <!-- <slot name="menu"></slot> -->
    <div class="menu-list">
      <ul>
        <li :class="{current : activeStatus('/project-manage')}">
          <router-link class="menu" :to="{name:'projectManage'}">
            <i class="el-icon-menu"></i>
            <span>项目管理</span>
          </router-link>
        </li>
        <!-- <li :class="{current : activeStatus('/myhome')}">
          <router-link class="menu" :to="{name:'myhome'}">
            <i class="icon"></i>
            <span>可视化管理</span>
          </router-link>
        </li> -->
        <template v-if="activeStatus('/datasource')">
          <li :class="{current : activeStatus('/datasource')}">
            <el-dropdown trigger="hover" placement="bottom-start" @command="handleCommand">
              <a href="javascript:void(0)" class="menu">
                <i class="icon"></i>
                <span>数据源管理</span>
              </a>
              <el-dropdown-menu slot="dropdown" class="header-menu-dropdown">
                <el-dropdown-item
                  command="file"
                  :class="[{'is-active-menu': menuType === 'file'}]"
                >文件</el-dropdown-item>
                <el-dropdown-item
                  command="database"
                  :class="[{'is-active-menu': menuType === 'database'}]"
                >数据库</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </template>
        <template v-else>
          <li :class="{current : activeStatus('/datasource')}">
            <router-link class="menu" :to="{name:'datasource'}">
              <i class="icon"></i>
              <span>数据源管理</span>
            </router-link>
          </li>
        </template>
        <!-- <li :class="{current : activeStatus('/data-set-manage')}">
          <router-link class="menu" :to="{name:'dataSetManage'}">
            <i class="icon"></i>
            <span>数据集管理</span>
          </router-link>
        </li> -->
      </ul>
    </div>
    <div class="user-info">
      <span class="user-name">用户ID</span>
      <el-dropdown class="user-setting">
        <span class="el-dropdown-link">
          <img src="@/assets/image/icon_setting.png" alt />
        </span>
        <el-dropdown-menu slot="dropdown" class="home-header-dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>
            <i class="icon iconfont icon-tuichu"></i>退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <a href="javascript:void(0)" class="logout">
        <img src="@/assets/image/icon_logout.png" alt />
      </a>
    </div>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      menuType: "database",
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleCommand(type) {
      this.menuType = type;
      this.$emit("dataTypeChange", type);
    },
    activeStatus(b) {
      //console.log("activeStatus", this.$route)
      let status = this.$route.path == b ? true : false;
      return status;
    },
  },
};
</script>
<style lang='stylus' scoped>
@import '~@/assets/stylus/menu.styl';

.el-header {
  padding: 0;
}

.home-header {
  min-width: 1120px;
  background-image: linear-gradient(to bottom, rgb(254, 254, 254), rgb(248, 248, 248));
  box-shadow: 0 1px 5px 1px rgba(100, 100, 100, 0.7);
  margin-bottom: 1px;
  white-space: nowrap;

  .back {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    background-image: linear-gradient(to bottom right, rgb(85, 155, 255), rgb(105, 189, 255)) !important;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #fff;
    }
  }

  .logo {
    width: auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    position: relative;

    a {
      position: absolute;
      margin: auto;
      font-weight: bold;
      color: #76aaff;
      font-family: 'Microsoft YaHei', serif;
    }
  }

  .user-info {
    float: right;
    padding-right: 20px;
    display: flex;
    align-items: center;
    height: 60px;
    color: #B1BCCB;

    .user-name {
      font-size: 12px;
      color: #ABB7C8;
      font-weight: 600;
    }

    .el-dropdown-link {
      width: 60px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        display: block;
        margin: 0 auto;
      }
    }

    .logout {
      img {
        display: block;
        width: 18px;
      }
    }
  }
}
</style>
<style lang="stylus">
.header-menu-dropdown {
  width: 80px;
  margin: 0 !important;
  padding: 0;
  background-image: linear-gradient(0deg, #3987fd 0%, #5297ff 100%), linear-gradient(#58cdab, #58cdab);
  box-shadow: 0px 1px 5px 0px rgba(51, 90, 149, 0.8);
  color: #fff;
  border: 1px solid #4780D6;

  .popper__arrow {
    display: none;
  }

  .el-dropdown-menu__item {
    padding: 0;
    height: 36px;
    line-height: 36px;
    background-color: #4C93FF;
    color: #fff;
    font-size: 14px;
    border-bottom: 1px solid rgba(222, 222, 222, 0.3);
    text-align: center;
    cursor: pointer;
    color: #fff;

    &:last-child {
      border: 0;
    }

    &.is-active-menu {
      background-color: #66A3FF;
    }

    &:hover {
      background-color: #66A3FF;
      color: #fff;
    }
  }
}

.el-dropdown {
  height: 100%;
}
</style>