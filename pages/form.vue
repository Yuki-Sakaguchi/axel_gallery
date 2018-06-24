<template>
  <section class="container">
    <div>
      <h1 class="title">form</h1>
      <div class="add"></div>
      <form action="/form/" id="form" class="form" @submit="checkForm" method="post" enctype="multipart/form-data">
        <div id="form-area" class="form-area">
          <!-- ここにinputのまとまりが追加される -->
        </div>
        <input id="submit" class="submit" type="submit" value="送信">
      </form>
    </div>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  transition: {
    enter: () => {
      // this.$store.commit('initFirebase');

      let elAdd = document.getElementsByClassName('add')[0];
      let elFormArea = document.getElementById('form-area');

      // 初めの一つ
      elFormArea.appendChild(addInputElement(1));

      // クリックで増やす
      elAdd.addEventListener('click', () => {
          var elInputBox = elFormArea.querySelectorAll('.input-box');
          elFormArea.appendChild(addInputElement(elInputBox.length+1));
      });
    }
  },

  methods: {
    checkForm: (evt) => {
      evt.preventDefault();
      var files = evt.target.querySelector('.file-input').files;

      if (files.length < 1) {
        return false;
      }

      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // ファイルアップロード
        var storageRef = firebase.storage().ref('images/' + file.name);
        storageRef.put(file).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
        });

        // ファイルパスを保存
        var db = firebase.firestore();
        db.collection("images").add({
            file_name: file.name
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
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
    elTitle.textContent = 'Input ' + index;
    let elDrop = document.createElement('div');
    elDrop.classList.add('drop-area');
    let elDropText = document.createElement('span');
    elDropText.classList.add('drop-area__text');
    elDropText.innerHTML = 'ここにファイルを<br>ドロップしてください';
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
</script>


<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
.add {
    position: fixed;
    width: 50px;
    height: 50px;
    background-color: #60d1a8;
    top: 30px;
    right: 30px;
    border-radius: 100%;
    transition: 0.3s;
    cursor: pointer;
}
.add:hover {
    box-shadow: 0 0 8px 1px rgba(0,0,0,0.4);
    transform: scale(1.1);
}
.add::before {
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
.add::after {
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
</style>
