<template>
    <div>
        <el-button @click="share('weibo')">微博</el-button>
        <el-button @click="share('qq')">QQ空间</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        methods: {
            share(type){
                let url = window.location.href;
                let title = '哈哈哈';
                if(type === 'weibo'){
                    this.shareToXl(title,url);
                } else if(type === 'qq'){
                    this.shareToQq(title,url);
                }
            },

            //分享到微博
            shareToXl: function (title, url, picurl) {
                var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url;
                window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
            },

            //分享到qq空间
            shareToQq: function (title, url, picurl) {
                var shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + url;
                window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
            },
        }
    }
</script>


