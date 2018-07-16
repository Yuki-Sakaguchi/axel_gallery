<template>
    <section class="container">
      <div class="inner">
        <h1 class="title">{{ title }}</h1>
        <div class="content">
          <p>
            Nuxt.jsとFarebaseで色々やっているサイトです。
          </p>
        </div>
      </div>
    </section>
</template>


<script>
export default {
  // <title>の設定
  data () {
    return {
      title: 'TOP'
    }
  },

  // <meta>の設定
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'axel_galleryのトップページです。' }
      ]
    }
  }
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
  background-size: cover;
  vertical-align: top;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
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
