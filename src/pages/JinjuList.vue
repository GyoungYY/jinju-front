<template>
    <div>
        <el-card class="box-card" v-for="(item,index) in jinjuList" :key="item.index">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
                {{item.content}}
            </div>
        </el-card>

    </div>
</template>

<script>
    import JinjuInterface from "@/interface/JinjuInterface";

    export default {
        data() {
            return {
                searchParams: {
                    pageIndex: 1,
                    pageSize: 10,
                },
                jinjuList: [],
            };
        },
        mounted() {
            this.getJinjuList();
        },
        methods: {
            getJinjuList() {
                JinjuInterface.getJinjuList(this.searchParams).then(data => {
                    this.jinjuList = data;
                });
            },
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
</style>


