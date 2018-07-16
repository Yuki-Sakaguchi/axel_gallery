<!--

  form.vue
    firebaseの画像登録機能

    TODO
      - モーダルのオーバーレイ（閉じる）
      - 画像、タイトル、テキスト、複数の登録できるように調整

-->
<template>
  <section>
    <div id="add" class="add"></div>
    <section id="modal" class="modal">
      <h1 class="modal__title">画像の追加</h1>
      <div id="in" class="add bg--blue"></div>
      <form action="/form/" id="form" class="form" @submit="checkForm" method="post" enctype="multipart/form-data">
        <div id="form-area" class="form-area">
          <!-- ここにinputのまとまりが追加される -->
        </div>
        <input id="submit" class="submit" type="submit" value="送信">
      </form>
    </section>
  </section>
</template>


<script>
import firebase from '@/plugins/firebase'

export default {
  mounted: function() {
    // this.$store.commit('initFirebase');

    let elModal = document.getElementById('modal');
    let elAdd = document.getElementById('add');
    let elIn = document.getElementById('in');
    let elFormArea = document.getElementById('form-area');

    // 初めの一つ
    elFormArea.appendChild(addInputElement(1));

    // クリックで増やす
    elIn.addEventListener('click', () => {
      console.log('123');
      var elInputBox = elFormArea.querySelectorAll('.input-box');
      elFormArea.appendChild(addInputElement(elInputBox.length+1));
    });

    var isOn = false;
    elAdd.addEventListener('click', () => {
      if (isOn) {
        elAdd.classList.remove('active');
        elModal.classList.remove('active');
      } else {
        elAdd.classList.add('active');
        elModal.classList.add('active');
      }
      isOn = !isOn;
    });
  },

  methods: {
    checkForm: (evt) => {
      evt.preventDefault();
      var self = this;
      var files = evt.target.querySelector('.file-input').files;
      var title = evt.target.querySelector('.title-input');

      if (files.length < 1) {
        return false;
      }

      var isUploaded = false;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // ファイルアップロード
        var storageRef = firebase.storage().ref('images/' + file.name);
        storageRef.put(file).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          if (isUploaded) {
            // modal
            uploaded();
          }
          isUploaded = true;
        });

        // ファイルパスを保存
        var db = firebase.firestore();
        db.collection("images").add({
          title: title.value ? title.value : 'no title',
          file_name: file.name
        }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          if (isUploaded) {
            // modal
            uploaded();
          }
          isUploaded = true;
        }).catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }
    }
  }
}


/**
 * inputのまとまりを追加
 */ 
function addInputElement(index) {
    // Elementを生成
    let elBox = document.createElement('div');
    elBox.classList.add('input-box');

    let elTitle = document.createElement('h3');
    elTitle.classList.add('input-box__title');
    elTitle.textContent = 'タイトルを入力してください';
    
    let elDrop = document.createElement('div');
    elDrop.classList.add('drop-area');
    
    let elDropText = document.createElement('span');
    elDropText.classList.add('drop-area__text');
    elDropText.innerHTML = 'ここにファイルを<br>ドロップしてください';

    let elInputTitle = document.createElement('input');
    elInputTitle.type = 'text';
    elInputTitle.classList.add('title-input');
    elInputTitle.name = 'title' + index;
    
    let elFile = document.createElement('input');
    elFile.classList.add('file-input');
    elFile.type = 'file';
    elFile.name = 'image' + index;
    
    let elInput = document.createElement('textarea');
    elInput.classList.add('text-input');
    elInput.name = 'text' + index;
    
    let elPreview = document.createElement('div');
    elPreview.classList.add('preview');
    
    elBox.appendChild(elTitle);
    elBox.appendChild(elInputTitle);
    elBox.appendChild(elDrop);
    elDrop.appendChild(elDropText);
    elDrop.appendChild(elFile);
    elBox.appendChild(elInput);
    elBox.appendChild(elPreview);

    // イベントを追加
    const dragOver = 'dragover';
    const dragLeave = 'dragleave';
    const drop = 'drop';
    const maxFileCount = 3;

    // ファイルエリアにファイルを持ってマウスを乗せた時
    elDrop.addEventListener(dragOver, (e) => {
        e.preventDefault();
        elDrop.classList.add(dragOver);
    });
    
    // ファイルエリアから外れた時
    elDrop.addEventListener(dragLeave, (e) => {
        e.preventDefault();
        elDrop.classList.remove(dragOver);
    });

    // ファイルエリアにファイルを落とした時
    elDrop.addEventListener(drop, (e) => {
        e.preventDefault();
        elDrop.classList.remove(drop);
        elFile.files = e.dataTransfer.files;
        // ファイルがない場合終了
        if (elFile.files.length < 1) {
            return false;
        }
        // プレビューを初期化
        elPreview.textContent = null;
        // ファイルのプレビューを表示
        for (let i = 0, len = elFile.files.length; i < len; i++) {
            // 最大件数以上は無視
            if (i >= maxFileCount) {
                break;
            }
            var file = elFile.files[i];
            // 画像ファイル以外は終了
            if (file.type.indexOf('image') < 0) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = ((file) => {
                return function(e) {
                    var eldiv = document.createElement('div');
                    eldiv.style.backgroundImage = 'url(' + e.target.result + ')';
                    eldiv.classList.add('preview__item');
                    elPreview.appendChild(eldiv);
                }
            })(file);
            reader.readAsDataURL(file);
        }
    });
    return elBox;
}

function uploaded() {
  alert('アップロードが完了しました');
  document.getElementById('form').reset();
  [].forEach.call(document.querySelectorAll('.preview'), function(e) {
    e.textContent = null;
  });
}
</script>


<style lang="scss">
.modal {
  text-align: center;
  width: 80%;
  height: 600px;
  overflow: scroll;
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
  box-shadow: 0 0 5px 2px rgba(0,0,0,0.5);
  transition: 0.3s;
  opacity: 0;
  pointer-events: none;
  transform: translateX(30px);

  &.active {
    opacity: 1;
    pointer-events: inherit;
    transform: translateX(0);
  }

  &__title {
    font-size: 30px;
    margin: 40px 20px;
  }
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.form-area {
  form {
    p {
      margin: 15px;
      text-align: left;
    }
  }
}


.form {
    user-select: none;
}
.drop-area {
    margin: 50px auto;
    width: 300px;
    height: 150px;
    background-color: #efefef;
    border: 3px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}
.drop-area__text {
    font-size: 10px;
    color: #999;
}
.file-input {
    display: none;
}
.text-input {
    margin: auto;
    display: block;
}
.input-box:not(:first-child) {
    border-top: 1px solid #ccc;
}
.preview {
    padding: 20px;
    text-align: center;
}
.preview__item {
    width: 100px;
    margin: 20px;
    height: 100px;
    background-color: rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: contain;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
    background-position: center;
    display: inline-block;
}
.submit {
    display: block;
    margin: auto;
}

// 追加ボタン
.add {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #60d1a8;
  top: 80px;
  right: 30px;
  border-radius: 100%;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 8px 1px rgba(0,0,0,0.4);
    transform: scale(1.1);
  }
  
  &:before {
    content: "";
    width: 60%;
    height: 2px;
    background-color: white;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  &:after {
      content: "";
      height: 60%;
      width: 2px;
      background-color: white;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
  }

  &.active {
    transform: rotate(45deg);
    background-color: $C_GRAY;
  }
}

.bg--blue {
  background-color: $C_BLUE;
}
</style>
