<template>
    <div class="list-container" v-loading="isLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff">
        <div class="box-card" v-for="(item,index) in meiwenList" :key="item.index">
            <div class="box-header" style="display:flex;">
                <img :src="item.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;cursor:pointer;" @click="gotoUserPage(item.userId)">
                <div style="padding-left:10px;">
                    <div style="padding-bottom:3px;">
                        <span class="item-username">{{item.username}}</span>
                    </div>
                    <span style="color:#aaa;">{{item.createTimeShow}}</span>
                </div>
            </div>
            <div class="item-content" @click="gotoDetail(item.meiwenId)">
                <div style="padding:20px;margin-right:200px">
                    <h2 style="margin-top:0;">{{item.title}}</h2>
                    <div>{{item.summary}}</div>
                </div>
                <img :src="item.coverImgUrl" alt="" class="item-img">
            </div>
            <div style="" class="box-footer">
                <el-tag :type="item.itemTagClass" class="item-tag">{{item.typeShow}}</el-tag>
                <span :class="{'clicked': item.isCollect}" class="glyphicon glyphicon-star-empty" style="float:right;cursor:pointer;" @click="collectClick(item)">
                    <span style="padding:0 10px;">{{item.collectCount}}</span>
                </span>
                <span class="glyphicon glyphicon-comment" style="float:right;padding-right:10px;cursor:pointer;" @click="gotoDetail(item.meiwenId)">
                    <span style="padding:0 10px;">{{item.commentCount}}</span>
                </span>
                <span class="glyphicon glyphicon-eye-open" style="float:right;padding-right:10px;cursor:pointer;">
                    <span style="padding:0 10px;">{{item.browseCount}}</span>
                </span>
            </div>
        </div>

        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="searchParams.pageIndex"
            :page-size="searchParams.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total" class="pagination">
        </el-pagination>

    </div>
</template>

<script>
import JinjuInterface from "@/interface/JinjuInterface";
import MeiwenInterface from "@/interface/MeiwenInterface";
import scrollFunc from "@/common/js/scrollFunc";
import formatTime from "@/common/js/formatTime";

let timer = null;

export default {
  data() {
    return {
      searchParams: {
        pageIndex: 1,
        pageSize: 15
      },
      isLoading: false,
      meiwenList: [],
      total: 0,
      typeEnum: {
        1: "搞笑",
        2: "情感",
        3: "热点"
      },
      tagClass: {
        1: "",
        2: "success",
        3: "danger"
      }
    };
  },
  mounted() {
    this.getMeiwenList(1);
  },
  methods: {
    //获取美文列表
    getMeiwenList(page) {
      this.searchParams.pageIndex = page;
      this.isLoading = true;
      MeiwenInterface.getMeiwenList(this.searchParams).then(data => {
        this.isLoading = false;
        this.meiwenList = data.list.map(item => {
          item.typeShow = this.typeEnum[item.type];
          item.itemTagClass = this.tagClass[item.type];
          item.createTimeShow = formatTime.getFormatTime(item.createTime);
          return item;
        });
        this.total = data.total;
      });
    },

    //切换页数
    handleCurrentChange(page) {
      this.getMeiwenList(page);
      scrollFunc.gotoTop();
    },

    //进入金句详情
    gotoDetail(id) {
      this.$router.push({ path: "/index/articleDetail/" + id });
    },

    //点击收藏
    collectClick(item) {
      let type = item.isCollect ? 2 : 1; //1收藏，2取消
      JinjuInterface.collect(item.jinjuId, type)
        .then(data => {
          this.$message.success(data);
          if (type === 1) {
            item.collectCount += 1;
            item.isCollect = true;
          } else if (type === 2) {
            item.collectCount -= 1;
            item.isCollect = false;
          }
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //进入用户个人主页
    gotoUserPage(id) {
      this.$router.push({ path: "/index/userPage/" + id });
    }
  }
};
</script>

<style scoped>
.list-container {
  min-height: 750px;
  max-width: 1000px;
  margin: 20px auto;
}

.box-card {
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e6ebf5;
}

.box-header {
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}

.box-footer {
  color: #999;
  padding: 10px;
}

.item-username {
  font-size: 16px;
  font-weight: bold;
  color: #f90;
}

.item-content {
  margin: 10px 0;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  position: relative;
  min-height: 160px;
}

.item-img {
  position: absolute;
  right: 20px;
  top: 0;
  width: 160px;
  height: 160px;
  border-radius: 4px;
}

.item-tag {
  padding: 0 15px;
  line-height: 26px;
  height: 28px;
}

.pagination {
  text-align: center;
  margin: 20px;
  width: 100%;
}

.clicked {
  color: #fa5555;
}
</style>


