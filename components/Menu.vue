<!--

  Menu.vue
    ハンバーガーメニュー

-->
<template>
  <nav class="global-menu">
    <h1 class="page-title"><nuxt-link to="/">TOP</nuxt-link></h1>
    <div @click="menuToggle" :class="{ active: isActive }" class="menu-trigger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul :class="{ active: isActive }" class="menu-list">
      <li class="menu-list__item"><nuxt-link to="/">top</nuxt-link></li>
      <li class="menu-list__item"><nuxt-link to="/gallery/">gallery</nuxt-link></li>
      <li class="menu-list__item"><nuxt-link to="/form/">form</nuxt-link></li>
      <li class="menu-list__item"><nuxt-link to="/chat/">chat</nuxt-link></li>
    </ul>
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
    color: lighten($C_GRAY, 20);
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
  background-color: lighten($C_GRAY, 40);
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
    background-color: lighten($C_GRAY, 20);
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
      background-color: $C_GREEN;
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
          border-color: transparent $C_GREEN transparent transparent;
        }
      }
    }
  }
}
</style>
