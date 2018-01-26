<template>
    <div class="chat-container">
        <div class="user-part">
            <div class="cur-num">当前在线人数：{{userList.length}}人</div>
            <div class="user-list" id="userList">
                <div style="padding-top: 10px;color: #999;">在线列表</div>
                <div v-for="item in userList" class="user-row">
                    <img src="../../../static/img/photo0.jpeg" alt="" class="user-photo">
                    <span>{{item.username}}</span>
                </div>
            </div>
        </div>
        <div class="message-part">
            <div class="message-notice" id="messageList">
                <div v-for="item in messageList">
                    <div>
                        <img src="../../../static/img/photo0.jpeg" alt="" class="message-photo">
                        <span>aguang</span>
                    </div>
                    <span class="message-content">
                        这是一条消息
                    </span>
                </div>
            </div>
            <div class="send-div">
                <el-input type="textarea" v-model="sendText" :rows="6"></el-input>
                <el-button type="primary" style="float: right;margin-top: 10px;" @click="sendMessage()">发送消息</el-button>
                <div style="clear: both;"></div>
            </div>
        </div>
    </div>
</template>

<script>
    $.fn.scrollUnique = function () {
        return $(this).each(function () {
            var eventType = 'mousewheel';
            if (document.mozHidden !== undefined) {
                eventType = 'DOMMouseScroll';
            }
            $(this).on(eventType, function (event) {
                // 一些数据
                var scrollTop = this.scrollTop,
                    scrollHeight = this.scrollHeight,
                    height = this.clientHeight;

                var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

                if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                    // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                    this.scrollTop = delta > 0 ? 0 : scrollHeight;
                    // 向上滚 || 向下滚
                    event.preventDefault();
                }
            });
        });
    };


    export default {
        data() {
            return {
                sendText: '',
                userList: [
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                    },
                ],

                messageList: [
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                        content: '这是一条消息内容'
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                        content: '这是一条消息内容'
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                        content: '这是一条消息内容'
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                        content: '这是一条消息内容'
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                        content: '这是一条消息内容'
                    },
                    {
                        photoUrl: '../../../static/img/photo0.jpeg',
                        username: 'aguang',
                        content: '这是一条消息内容'
                    },
                ]
            }
        },

        mounted() {
            $('#userList').scrollUnique();
            $('#messageList').scrollUnique();
        },

        methods: {

            //获取消息列表
            getMessageList() {

            },

            //发送消息
            sendMessage() {
                this.$message.success('发送成功');
            },
        }
    }
</script>

<style scoped>
    .chat-container {
        width: 880px;
        margin: 30px auto;
        padding: 20px;
        background-color: #fff;
        position: relative;
    }

    .user-part {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 200px;
        padding-right: 20px;
    }

    .user-row {
        margin: 15px 0;
    }

    .cur-num {
        font-size: 16px;
        border-bottom: 1px solid #ddd;
        line-height: 50px;
    }

    .user-list {
        height: 545px;
        overflow-y: auto;
    }

    .user-photo {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin-right: 4px;
    }

    .message-part {
        margin-left: 200px;
    }

    .message-notice {
        height: 400px;
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 15px;
        overflow-y: auto;
    }

    .message-photo {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin-right: 4px;
    }

    .message-content {
        display: inline-block;
        padding: 8px 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 10px 10px 15px 10px;
    }

    .send-div {
    }

    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width: 3px;
    }

    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }

    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255, 0, 0, 0.4);
    }
</style>
