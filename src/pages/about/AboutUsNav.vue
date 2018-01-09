<template>
    <div class="about-container"> 
        <div style="padding-left:200px;position:relative;">
            <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            style="width: 200px;min-height:700px;display:inline-block;position:absolute;left:0;">
                <el-menu-item index="about">
                    <i class="el-icon-menu"></i>
                    <span slot="title">关于我们</span>
                </el-menu-item>
                <el-menu-item index="contact">
                    <i class="el-icon-service"></i>
                    <span slot="title">联系方式</span>
                </el-menu-item>
                <el-menu-item index="message">
                    <i class="el-icon-message"></i>
                    <span slot="title">意见反馈</span>
                </el-menu-item>
                <el-menu-item index="friend">
                    <i class="el-icon-share"></i>
                    <span slot="title">友情链接</span>
                </el-menu-item>
            </el-menu>
            <router-view/>
        </div>
        
    </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function() {
      let breadcumb = {
        "/index/AboutUsNav/AboutUsPage": "about",
        "/index/AboutUsNav/ContactUs": "contact",
        "/index/AboutUsNav/FeedBack": "message",
        "/index/AboutUsNav/FriendLink": "friend",
      };
      let curPath = this.$route.path;
      return breadcumb[curPath];
    }
  },
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === "about") {
        this.$router.push({ path: "/index/AboutUsNav/AboutUsPage" });
      } else if (key === "contact") {
        this.$router.push({ path: "/index/AboutUsNav/ContactUs" });
      } else if (key === "message") {
        this.$router.push({ path: "/index/AboutUsNav/FeedBack" });
      } else if (key === "friend") {
        this.$router.push({ path: "/index/AboutUsNav/FriendLink" });
      }
    }
  }
};
</script>

<style scoped>
.about-container {
  max-width: 1000px;
  min-height: 750px;
  margin: 20px auto;
}
</style>
