<template>
  <div class="detail-container">
        <el-card class="box-card">
            <div slot="header">
                <img :src="jinjuDetail.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;">
                <span class="item-username">{{jinjuDetail.username}}</span>
            </div>
            <div class="item-content">
                {{jinjuDetail.content}}
            </div>
            <div>
                <el-tag :type="jinjuDetail.itemTagClass" class="item-tag">{{jinjuDetail.typeShow}}</el-tag>
                <span :class="{'clicked': jinjuDetail.isCollect}" class="glyphicon glyphicon-star" style="float:right;cursor:pointer;" @click="collectClick(jinjuDetail.jinjuId)">
                    <span style="padding:0 10px;">{{jinjuDetail.collectCount}}</span>
                </span>
                <span :class="{'clicked': jinjuDetail.upOrDownVote === 2}" class="glyphicon glyphicon-thumbs-down" style="float:right;padding-right:10px;cursor:pointer" @click="downVoteClick(jinjuDetail.jinjuId)">
                    <span style="padding:0 10px;">{{jinjuDetail.downVoteCount}}</span>
                </span>
                <span :class="{'clicked': jinjuDetail.upOrDownVote === 1}" class="glyphicon glyphicon-thumbs-up" style="float:right;padding-right:10px;cursor:pointer" @click="upVoteClick(jinjuDetail.jinjuId)">
                    <span style="padding:0 10px;">{{jinjuDetail.upVoteCount}}</span>
                </span>
            </div>
        </el-card>

        <div class="comment-area">

            <div style="margin-bottom:20px;">
                <el-input type="textarea" v-model="myComment" :rows="4" placeholder="期待你的神评~"
                                  :maxlength="300"></el-input>
                <div style="padding-top:10px;height:50px;">
                    <span>{{myComment.length}}/300</span>
                    <el-button type="primary" style="float:right;" @click="publishComment">评论</el-button>
                </div>
            </div>

            <el-card class="box-card" v-for="(item,index) in commentList" :key="item.index">
                <div slot="header">
                    <img :src="item.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;">
                    <span style="padding:0 6px;">#{{index + 1}}</span>
                    <span class="item-username">用户名</span>
                </div>
                <div class="item-content" @click="gotoDetail(item.jinjuId)">
                    {{item.content}}
                </div>
                <div style="height:20px;">
                    <span class="glyphicon glyphicon-thumbs-down" style="padding-right:10px;float:right;">
                        <span style="padding:0 10px;">{{item.downVoteCount}}</span>
                    </span>
                    <span class="glyphicon glyphicon-thumbs-up" style="padding-right:10px;float:right;">
                        <span style="padding:0 10px;">{{item.upVoteCount}}</span>
                    </span>
            </div>
            </el-card>

            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="searchParams.pageIndex"
                :page-size="searchParams.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total" class="pagination"
                v-if="commentList.length > 0">
            </el-pagination>
        </div>
  </div>
</template>

<script>
import JinjuInterface from "@/interface/JinjuInterface";
export default {
  data() {
    return {
      searchParams: {
        pageIndex: 1,
        pageSize: 15
      },
      commentList: [],
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
      },

      jinjuDetail: {},
      myComment: ""
    };
  },
  mounted() {
    this.getJinjuDetail(this.$route.params.id);
    scrollTo(0,0);
    // this.getCommentList(1);
  },
  methods: {
    //获取评论列表
    getCommentList(page) {
      this.searchParams.pageIndex = page;
      JinjuInterface.getCommentList(this.searchParams).then(data => {
        this.commentList = data.list.map(item => {
          item.typeShow = this.typeEnum[item.type];
          item.itemTagClass = this.tagClass[item.type];
          item.photoUrl = "../../static/img/photo" + item.userId % 4 + ".jpeg";
          return item;
        });
        this.total = data.total;
      });
    },

    //切换页数
    handleCurrentChange(page) {
      this.getCommentList(page);
    },

    //获取详情
    getJinjuDetail(id) {
      JinjuInterface.getJinjuDetail(id).then(data => {
        this.jinjuDetail = data;
        this.jinjuDetail.typeShow = this.typeEnum[data.type];
        this.jinjuDetail.itemTagClass = this.tagClass[data.type];
        this.jinjuDetail.photoUrl =
          "../../static/img/photo" + data.userId % 4 + ".jpeg";
      });
    },

    //点击赞按钮
    upVoteClick(jinjuId){
        let type = this.jinjuDetail.upOrDownVote === 1 ? 2 : 1;   //1赞，2取消
        JinjuInterface.upVote(jinjuId,type).then(data => {
            this.$message.success(data);
            this.getJinjuDetail(this.$route.params.id);
        }).catch(reason =>{
            this.$message.error(reason);
        });
    },

    //点击踩按钮
    downVoteClick(jinjuId){
        let type = this.jinjuDetail.upOrDownVote === 2 ? 2 : 1;   //1踩，2取消
        JinjuInterface.downVote(jinjuId,type).then(data => {
            this.$message.success(data);
            this.getJinjuDetail(this.$route.params.id);
        }).catch(reason =>{
            this.$message.error(reason);
        });
    },

    //点击收藏
    collectClick(jinjuId) {
      let type = this.jinjuDetail.isCollect ? 2 : 1;   //1收藏，2取消
        JinjuInterface.collect(jinjuId,type).then(data => {
            this.$message.success(data);
            this.getJinjuDetail(this.$route.params.id);
        }).catch(reason =>{
            this.$message.error(reason);
        });
    },

    //发表评论
    publishComment() {
      this.$message.warning("不要急，该功能程序员正在设计中哦~");
    }
  }
};
</script>

<style scoped>
.detail-container {
  max-width: 1000px;
  min-height: 750px;
  margin: 20px auto;
}

.box-card {
  margin-bottom: 20px;
}

.item-username {
  font-size: 16px;
  font-weight: bold;
  color: #f90;
  padding-left: 8px;
}

.item-content {
  margin-bottom: 18px;
  font-size: 14px;
  line-height: 24px;
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

.clicked{
    color: #fa5555;
}

.comment-area {
  padding: 20px 10px 20px 50px;
  background-color: #fff;
}
</style>


