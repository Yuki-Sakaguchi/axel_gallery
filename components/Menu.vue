<template>
  <nav class="global-menu">
    <h1 class="page-title"><nuxt-link to="/">AXEL GALLERY</nuxt-link></h1>
    <div @click="menuToggle" :class="{ active: isActive }" class="menu-trigger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul :class="{ active: isActive }" class="menu-list">
      <li class="menu-list__item"><nuxt-link to="/">top</nuxt-link></li>
      <li class="menu-list__item"><nuxt-link to="/about/">about</nuxt-link></li>
      <li class="menu-list__item"><nuxt-link to="/form/">form</nuxt-link></li>
    </ul>
    <nuxt-link class="add-btn" to="/form/"></nuxt-link>
  </nav>
</template>

<script>
export default {
  data: () => ({
    isActive: false
  }),
  methods: {
    // メニューの開閉
    menuToggle() {
      this.isActive = !this.isActive;
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.path !== from.path) {
        // 画面が遷移したらメニューを閉じる
        this.isActive = false;
      }
    }
  }
}
</script>


<style lang="scss">
// タイトル
.page-title {
  position: absolute;
  right: 0;
  left: 0;
  text-align: center;
  margin: auto;

  a {
    color: #9E9E9E;
    transition: 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }
}

// メニュー
.global-menu {
  position: relative;
  width: 100%;
  padding: 12px 10px;
  background-color: #efefef;
}

// トリガーメニュー
.menu-trigger {
  position: relative;
  width: 30px;
  height: 25px;
  margin-left: 10px;
  cursor: pointer;
  z-index: 2;

  span {
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #ccc;
    transition: 0.3s;

    &:first-child {
      top: 0;
    }

    &:nth-of-type(2) {
      top: 11px;
    }

    &:last-child {
      bottom: 0;
    }
  }

  &.active {
    span {
      &:first-child {
        transform: rotate(-45deg) translate(-5px, 2px);
        width: 60%;
      }

      &:last-child {
        transform: rotate(45deg) translate(-5px, -2px);
        width: 60%;
      }
    }
  }
}

// メニューリスト
.menu-list {
  position: absolute;
  top: 0;
  padding-top: 60px;
  width: 100px;
  left: 0;
  z-index: 1;
  transition: 0.3s;
  opacity: 0;
  transform: translateX(-100%);

  &.active {
    opacity: 1;
    transform: translateX(0);
  }

  &__item {
    position: relative;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      width: 0;
      height: 3px;
      background-color: #41B883;
      transition: 0.3s;
    }

    &:hover {
      &:before {
        width: 100%;
      }
    }

    a {
      padding: 10px 20px;
      display: block;

      &.nuxt-link-exact-active {
        &:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px;
          border-color: transparent #41B883 transparent transparent;
        }
      }
    }
  }
}

// addボタン
.add-btn {
  $width_size: 60%;
  $height_size: 2px;
  position: absolute;
  right: 12px;
  top: 9px;
  width: 30px;
  height: 30px;
  background-color: #41B883;
  border-radius: 100%;
  transition: 0.3s;

  &:hover {
    opacity: 0.6;
    transform: rotate(90deg);
  }

  &:before {
    content: "";
    width: $width_size;
    height: $height_size;
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
    height: $width_size;
    width: $height_size;
    background-color: white;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
</style>
