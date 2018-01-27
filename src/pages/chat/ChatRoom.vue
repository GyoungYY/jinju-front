<template>
    <div style="min-height: 700px;">
        <div class="chat-container">
            <div class="user-part">
                <div class="cur-num">当前在线人数：{{userList.length}}人</div>
                <div class="user-list" id="userList">
                    <div style="padding-top: 10px;color: #999;">在线列表</div>
                    <div v-for="item in userList" class="user-row">
                        <img :src="item.photoUrl" alt="" class="user-photo" @click="gotoUserPage(item.userId)">
                        <span>{{item.username}}</span>
                    </div>
                </div>
            </div>
            <div class="message-part">
                <div class="message-notice" id="messageList">

                    <div v-for="item in messageList">
                        <div v-if="item.type == 2" style="text-align:center;color:#f90;padding:8px;">{{item.message}}</div>
                        <div :class="{'self-message' : item.userId == userInfo.userId}" v-if="item.type == 1">
                            <div :class="{'self-username' : item.userId == userInfo.userId}">
                                <img :src="item.photoUrl" alt="" class="message-photo" @click="gotoUserPage(item.userId)">
                                <span>{{item.username}}</span>
                            </div>
                            <div style="clear: both;"></div>
                            <span class="message-content" :class="{'self-content': item.userId == userInfo.userId}">
                                {{item.message}}
                            </span>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
                <div class="send-div">
                    <el-input type="textarea" v-model="sendText" :rows="4" @keyup.enter.native="sendMessage()"></el-input>
                    <el-button type="primary" style="float: right;margin-top: 10px;" @click="sendMessage()">发送消息</el-button>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
$.fn.scrollUnique = function() {
  return $(this).each(function() {
    var eventType = "mousewheel";
    if (document.mozHidden !== undefined) {
      eventType = "DOMMouseScroll";
    }
    $(this).on(eventType, function(event) {
      // 一些数据
      var scrollTop = this.scrollTop,
        scrollHeight = this.scrollHeight,
        height = this.clientHeight;

      var delta = event.originalEvent.wheelDelta
        ? event.originalEvent.wheelDelta
        : -(event.originalEvent.detail || 0);

      if (
        (delta > 0 && scrollTop <= delta) ||
        (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)
      ) {
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
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      sendText: "",
      userList: [],
      messageList: [],
      websock: null
    };
  },

  mounted() {
    if (!this.userInfo) {
      this.$message.warning("请登录再尝试哦~");
      return;
    }
    $("#userList").scrollUnique();
    $("#messageList").scrollUnique();
    this.initWebSocket();
  },

  methods: {
    //初始化
    initWebSocket() {
      const wsUrl = "ws://101.132.43.21:8888/chatsocket/" + this.userInfo.userId;
      this.websocket = new WebSocket(wsUrl);
      //指定收到服务器数据后的回调函数
      this.websocket.onmessage = event => {
        this.getMessageList(event);
      };

      //用于指定报错时的回调函数
      this.websocket.onerror = () => {
        this.errorShow();
      };
    },

    //获取消息列表
    getMessageList(event) {
      let result = JSON.parse(event.data);
      this.messageList.push(result);
      if (result.type == "2") {
        this.userList = result.userList;
      }
      setTimeout(function() {
        $("#messageList").scrollTop($("#messageList")[0].scrollHeight + 100);
      }, 10);
    },

    //发送消息
    sendMessage() {
      if (!this.userInfo) {
        this.$message.warning("请登录再尝试哦~");
        return;
      }
      if (!this.sendText.trim()) {
        this.$message.error("请输入要发送的内容");
        return;
      }
      this.$message.success("发送成功");
      this.websocket.send(this.sendText);
      this.sendText = "";
    },

    //错误回调函数
    errorShow() {
      this.$message.success("webSocket有点问题，您喝杯茶再来试一下～");
    },

    //关闭连接
    closeConnection() {
      this.websocket.close();
    },

    //进入用户个人主页
    gotoUserPage(id) {
      this.$router.push({ path: "/index/userPage/" + id });
    }
  }
};
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
  height: 470px;
  overflow-y: auto;
}

.user-photo {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 4px;
  cursor: pointer;
}

.message-part {
  margin-left: 200px;
}

.message-notice {
  height: 360px;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 15px;
  overflow-y: auto;
  border-radius: 4px;
}

.message-photo {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 4px;
  cursor: pointer;
}

.message-content {
  display: inline-block;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 10px 15px 10px;
  max-width: 300px;
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
  background: rgba(0, 0, 0, 0.2);
}

.self-message {
  float: right;
}

.self-username {
  float: right;
  padding-right: 10px;
}

.self-content {
  background-color: lawngreen;
}
</style>
