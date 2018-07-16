<!--

  gallery.vue
    firebaseの画像登録機能を使ったギャラリー機能

    TODO
      - 読み込みの順番（登録の新しい順に表示）
      - 詳細の表示（モーダルで詳細を表示）
      - 画面の更新ボタン
      - 画像のローディング
      - もっとみるボタン

-->
<template>
    <section class="container">
      <div class="inner">
        <h1 class="title">{{ title }}</h1>
        <div class="content">
          <div id="image-area" class="image-area"></div>
        </div>
        <Form/>
      </div>
    </section>
</template>

<script>
import firebase from '@/plugins/firebase'
import Form from '~/components/Form.vue'

export default {
  transition: {
    // 画面が表示されたら動く処理
    enter: () => {
      initImage();
    }
  },

  // <title>の設定
  data () {
    return {
      title: 'GALLERY'
    }
  },

  // <meta>の設定
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'axel_galleryのgalleryページです。' }
      ]
    }
  },

  // Formを追加
  components: {
    Form
  }
}

/** 
 * 画像の初期化
 */
function initImage() {
  // 画像の名前リスト
  var imgList = [];

  // firebaseのストレージにアクセス
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var spaceRef = storageRef.child('images');

  // DBからファイル名を取得
  var db = firebase.firestore();
  db.collection("images").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      imgList.push({
        image: doc.data().file_name,
        title: doc.data().title,
      });
    });
  }).then(() => {
    // ファイル名を元に画像を取得し、画面に追加
    var elImgArea = document.getElementById('image-area');

    imgList.forEach((e, i) => {
      var img = spaceRef.child(e.image);
      var title = e.title;
      img.getDownloadURL().then((url) => {
        var elBlock = document.createElement('div');
        elBlock.className = 'image-box';
        elBlock.style.backgroundImage = 'url(' + url + ')';

        var elTextBox = document.createElement('div');
        elTextBox.className = 'image-title-box';

        var elText = document.createElement('span');
        elText.className = 'image-title';
        elText.textContent = title;

        elTextBox.appendChild(elText);
        elBlock.appendChild(elTextBox);
        elImgArea.appendChild(elBlock);

      }).catch((error) => {
        console.log(error);
      });
    });
  })
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

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.image-area {
  margin: 20px;
}

.image-box {
  position: relative;
  width: 33.33%;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  vertical-align: top;
  transition: 0.3s;

  &:hover {
    background-size: 120%;
    z-index: 1;
    cursor: pointer;

    &:after {
      opacity: 1;
    }

    .image-title {
      opacity: 1;
    }
  }

  &:before {
    content: '';
    display: block;
    padding-top: (9 / 16) * 100%
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
    transition: 0.3s;
  }
}

.image-title-box {
  display: flex;
  justify-items: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  z-index: 1;
}

.image-title {
  display: block;
  text-align: center;
  word-wrap: break-word;
  width: 80%;
  margin: auto;
  line-height: 1.2;
  color: white;
  transition: 0.3s;
  opacity: 0;
}
</style>
