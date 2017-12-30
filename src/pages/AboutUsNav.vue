<template>
    <div class="about-container"> 
        <div style="padding-left:200px;position:relative;">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            style="width: 200px;min-height:700px;display:inline-block;position:absolute;left:0;">
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">关于我们</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-setting"></i>
                    <span slot="title">联系方式</span>
                </el-menu-item>
            </el-menu>
            <router-view/>
        </div>
        
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
