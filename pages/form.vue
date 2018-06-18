<template>
  <section class="container">
    <div>
      <h1 class="title">form</h1>
      <div class="links">
        <nuxt-link to="/" class="button--green">top</nuxt-link>
      </div>
      <div class="form-area">
        <form action="/form/" method="post" enctype="multipart/form-data">
          <p>TITLE: <input type="text" name="title"></p>
          <p>IMAGE: <input type="file" name="images"></p>
          <input type="submit">
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  
}

function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
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

</style>
