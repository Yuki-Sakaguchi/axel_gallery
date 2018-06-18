<template>
  <section class="container">
    <div>
      <h1 class="title">axel_gallery</h1>
      <div class="links">
        <nuxt-link to="/about/" class="button--green">about</nuxt-link>
      </div>
      <div id="image-area" class="image-area"></div>
    </div>
  </section>
</template>

<script>
export default {
  transition: {
    enter: () => {
      initImage();
    }
  }
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDL74v9w6sB6XO-2RCTQaJUsojTkqtTZqE",
  authDomain: "axel-gallery.firebaseapp.com",
  databaseURL: "https://axel-gallery.firebaseio.com",
  projectId: "axel-gallery",
  storageBucket: "axel-gallery.appspot.com",
  messagingSenderId: "586204948365"
};
firebase.initializeApp(config);

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
      imgList.push(doc.data().file_name);
    });
  }).then(() => {
    // ファイル名を元に画像を取得し、画面に追加
    var elImgArea = document.getElementById('image-area');

    imgList.forEach((e, i) => {
      var img = spaceRef.child(e);
      img.getDownloadURL().then((url) => {
        var elBlock = document.createElement('div');
        elBlock.className = 'image-box';
        elBlock.style.backgroundImage = 'url(' + url + ')';
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
  width: 50%;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  vertical-align: top;

  &:before {
    content: '';
    display: block;
    padding-top: (9 / 16) * 100%
  }
}
</style>
