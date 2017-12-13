<template>
    <div style="min-height: 800px;">
        <el-card class="box-card" v-for="(item,index) in jinjuList" :key="item.index">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                {{item.content}}
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
                    this.jinjuList = data.jinjuList;
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
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both;
    }

    .box-card {
        max-width: 1000px;
        margin: 20px auto;
    }

    .pagination {
        text-align: center;
        margin: 20px;
    }
</style>


