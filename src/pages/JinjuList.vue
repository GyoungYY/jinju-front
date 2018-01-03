<template>
    <div class="list-container">
        <el-card class="box-card" v-for="(item,index) in jinjuList" :key="item.index">
            <div slot="header">
                <img :src="item.photoUrl" alt="" style="width: 40px;height: 40px;border-radius:20px;">
                <span class="item-username">{{item.username}}</span>
            </div>
            <div class="item-content" @click="gotoDetail(item.jinjuId)">
                {{item.content}}
            </div>
            <div>
                <el-tag :type="item.itemTagClass" class="item-tag">{{item.typeShow}}</el-tag>
                <span :class="{'clicked': item.isCollect}" class="glyphicon glyphicon-star" style="float:right;">
                    <span style="padding:0 10px;">{{item.collectCount}}</span>
                </span>
                <span :class="{'clicked': item.upOrDownVote === 2}" class="glyphicon glyphicon-thumbs-down" style="float:right;padding-right:10px;">
                    <span style="padding:0 10px;">{{item.downVoteCount}}</span>
                </span>
                <span :class="{'clicked': item.upOrDownVote === 1}" class="glyphicon glyphicon-thumbs-up" style="float:right;padding-right:10px;">
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
            :total="total" class="pagination">
        </el-pagination>

    </div>
</template>

<script>
import JinjuInterface from "@/interface/JinjuInterface";
import scrollFunc from "@/common/js/scrollFunc"

let timer = null;

export default {
  data() {
    return {
      searchParams: {
        pageIndex: 1,
        pageSize: 15
      },
      jinjuList: [],
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
    this.getJinjuList(1);
  },
  methods: {
    //获取金句列表
    getJinjuList(page) {
      this.searchParams.pageIndex = page;
      JinjuInterface.getJinjuList(this.searchParams).then(data => {
        this.jinjuList = data.list.map(item => {
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
      this.getJinjuList(page);
        scrollFunc.gotoTop();
    },

    //进入金句详情
    gotoDetail(id) {
      this.$router.push({ path: "/index/JinjuDetail/" + id });
    },
    
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
  cursor: pointer;
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


