<template>
    <div class="list-container">
        <el-card class="box-card" v-for="(item,index) in jinjuList" :key="item.index">
            <div slot="header">
                <span>卡片名称</span>
            </div>
            <div class="item-content">
                {{item.content}}
            </div>
            <div>
                <el-tag type="danger" class="item-tag">{{item.typeShow}}</el-tag>
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

    export default {
        data() {
            return {
                searchParams: {
                    pageIndex: 1,
                    pageSize: 15,
                },
                jinjuList: [],
                total: 0,
                typeEnum: {
                    1: '搞笑'
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
                    this.jinjuList = data.jinjuList.map(item => {
                        item.typeShow = this.typeEnum[item.type];
                        return item;
                    });
                    this.total = data.total;
                });
            },

            //切换页数
            handleCurrentChange(page) {
                this.getJinjuList(page);
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
    }

    .item-content{
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
</style>


