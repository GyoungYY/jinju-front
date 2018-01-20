<template>
  <div class="detail-container">
        <el-card class="box-card">
            <div slot="header" style="display:flex;">
                <img :src="jinjuDetail.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;">
                <div style="padding-left:10px;">
                    <div style="padding-bottom:3px;">
                        <span class="item-username">{{jinjuDetail.username}}</span>
                    </div>
                    <span style="color:#aaa;">{{jinjuDetail.createTimeShow}}</span>
                </div>
            </div>
            <div class="item-content">
                {{jinjuDetail.content}}
            </div>
            <div style="color:#999;">
                <el-tag :type="jinjuDetail.itemTagClass" class="item-tag">{{jinjuDetail.typeShow}}</el-tag>
                <span :class="{'clicked': jinjuDetail.isCollect}" class="glyphicon glyphicon-star-empty" style="float:right;cursor:pointer;" @click="collectClick(jinjuDetail.jinjuId)">
                    <span style="padding:0 10px;">{{jinjuDetail.collectCount}}</span>
                </span>
                <span class="glyphicon glyphicon-comment" style="float:right;padding-right:10px;">
                    <span style="padding:0 10px;">{{jinjuDetail.commentCount}}</span>
                </span>
                <span :class="{'clicked': jinjuDetail.upOrDownVote === 1}" class="glyphicon glyphicon-eye-open" style="float:right;padding-right:10px;cursor:pointer" @click="upVoteClick(jinjuDetail.jinjuId)">
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

            <el-card class="box-card comment-card" v-for="(item,index) in commentList" :key="item.index">
                <div slot="header" style="display:flex;">
                    <img :src="item.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;">
                    <div style="padding-left:20px;">
                        <div style="padding-bottom:3px;">
                            <span style="padding:0 6px;">#{{total - (commentParams.pageIndex -1)*commentParams.pageSize - index }}</span>
                            <span class="item-username">{{item.username}}</span>
                        </div>
                        <span style="color:#aaa;">{{item.createTimeShow}}</span>
                    </div>
                </div>
                <div class="item-content">
                    {{item.content}}
                </div>
                <div style="height:20px;">
                    <span :class="{'clicked': item.isUpClicked}" class="glyphicon glyphicon-thumbs-up" style="padding-right:10px;float:right;cursor:pointer;" @click="upVoteComment(item)">
                        <span style="padding:0 10px;">{{item.upVoteCount}}</span>
                    </span>
                </div>
            </el-card>

            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="commentParams.pageIndex"
                :page-size="commentParams.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total" class="pagination"
                v-if="commentList.length > 0">
            </el-pagination>
        </div>
  </div>
</template>

<script>
import JinjuInterface from "@/interface/JinjuInterface";
import CommentInterface from "@/interface/CommentInterface";
import formatTime from "@/common/js/formatTime";

export default {
  data() {
    return {
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
      commentList: [],
      total: 0,
      myComment: "",
      commentParams: {
        pageIndex: 1,
        pageSize: 10,
        jinjuId: this.$route.params.id,
        parentId: 0
      },
      jinjuId: this.$route.params.id
    };
  },
  mounted() {
    this.getJinjuDetail(this.$route.params.id);
    scrollTo(0, 0);
    this.getCommentList(1);
  },
  methods: {
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
        this.jinjuDetail.createTimeShow = formatTime.getFormatTime(
          data.createTime
        );
      });
    },

    //点击赞按钮
    upVoteClick(jinjuId) {
      this.$message.warning("美文暂不支持点赞");
      return;
      let type = this.jinjuDetail.upOrDownVote === 1 ? 2 : 1; //1赞，2取消
      JinjuInterface.upVote(jinjuId, type)
        .then(data => {
          this.$message.success(data);
          this.getJinjuDetail(this.$route.params.id);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //点击踩按钮
    downVoteClick(jinjuId) {
      this.$message.warning("美文暂不支持点踩");
      return;
      let type = this.jinjuDetail.upOrDownVote === 2 ? 2 : 1; //1踩，2取消
      JinjuInterface.downVote(jinjuId, type)
        .then(data => {
          this.$message.success(data);
          this.getJinjuDetail(this.$route.params.id);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //点击收藏
    collectClick(jinjuId) {
      this.$message.warning("美文暂不支持收藏");
      return;
      let type = this.jinjuDetail.isCollect ? 2 : 1; //1收藏，2取消
      JinjuInterface.collect(jinjuId, type)
        .then(data => {
          this.$message.success(data);
          this.getJinjuDetail(this.$route.params.id);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //发表评论
    publishComment() {
      let params = {
        jinjuId: this.jinjuId,
        content: this.myComment
      };
      this.$message.warning("美文暂不支持评论");
      return;
      CommentInterface.createComment(params)
        .then(data => {
          this.$message.success("发表成功");
          this.myComment = "";
          this.getCommentList(this.commentParams.pageIndex);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //获取评论列表
    getCommentList(page) {
      this.commentParams.pageIndex = page;
      CommentInterface.getCommentList(this.commentParams)
        .then(data => {
          this.commentList = data.list.map(item => {
            item.createTimeShow = formatTime.getFormatTime(item.createTime);
            return item;
          });
          this.total = data.total;
        })
        .catch(reason => {
          this.$message.error(reason);
        });
    },

    //评论的点赞、取消
    upVoteComment(item) {
      let type = item.isUpClicked ? 2 : 1;
      CommentInterface.upVoteComment(item.id, type)
        .then(data => {
          if (type === 1) {
            item.upVoteCount += 1;
            item.isUpClicked = true;
          } else {
            item.upVoteCount -= 1;
            item.isUpClicked = false;
          }
          this.$message.success(data);
        })
        .catch(reason => {
          this.$message.error(reason);
        });
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

.clicked {
  color: #fa5555;
}

.comment-area {
  padding: 20px 10px 20px 50px;
  background-color: #fff;
}
</style>


