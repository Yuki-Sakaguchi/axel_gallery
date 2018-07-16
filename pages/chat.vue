<!--

  chat.vue
    firebaseのrealtimedatabaseを使ったチャット

-->
<template>
  <section class="container">
    <div class="inner">
      <h1 class="title">{{ title }}</h1>
      <div id="scroller" class="panel-body">
        <ul id='messages'></ul>
      </div>
      <div class="panel-footer">
          <input type='text' class="form-control" id="nameInput" placeholder="ユーザー名を入力してください">
      </div>
      <div class="panel-footer">
          <input type='text' class="form-control" id="messageInput" placeholder="メッセージ内容を入力してください">
      </div>
    </div>
  </section>
</template>


<script>
import firebase from '@/plugins/firebase'
// var messagesRef = new Firebase('https://qiita.firebaseio.com/');

export default {
  transition: {
    enter: () => {
      initChat();
    }
  },

  // <title>の設定
  data () {
    return {
      title: 'CHAT'
    }
  },

  // <meta>の設定
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'axel_galleryのchatページです。' }
      ]
    }
  }
}

function initChat() {
  var database = firebase.database().ref('chat/');
  var messageField = document.getElementById('messageInput');
  var nameField = document.getElementById('nameInput');
  var messageList = document.getElementById('messages');

  // ENTERキーを押した時に発動する
  messageField.addEventListener('keypress', function (e) {
      if (e.keyCode == 13) {
          //フォームに入力された情報
          var username = nameField.value;
          var message = messageField.value;

          //データベースに保存する
          database.push({name:username, text:message});
          messageField.value = '';

          // document.getElementById('scroller').scrollTop(document.getElementById('messages').clientHeight());
      }
  });

  // データベースにデータが追加されたときに発動する
  database.limitToLast(10).on('child_added', function (snapshot) {
      //取得したデータ
      var data = snapshot.val();
      var username = data.name || "anonymous";
      var message = data.text;

      //取得したデータの名前が自分の名前なら右側に吹き出しを出す
      var li = document.createElement('li');
      li.textContent = username + ' : ' + message;
      messageList.append(li)
  });
}
</script>


<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.inner {
  width: 100%;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
