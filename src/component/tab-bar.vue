<template>
  <div class="tabbar-wrp" :class="[platform === 'ios' ? 'is-ios' : '']">
    <div class="tabbar-item" @click="onUser">
      <text class="iconfont tabbar-icon">&#58929;</text>
      <text class="tabbar-text">users</text>
    </div>
    <div class="tabbar-item" @click="onRepo">
      <text class="iconfont tabbar-icon">&#58925;</text>
      <text class="tabbar-text">repositories</text>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-bar',
  data () {
    return {
      platform: weex.config.env.platform.toLowerCase()
    }
  },
  beforeCreate () {
    const domModule = weex.requireModule('dom')

    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': "url('//at.alicdn.com/t/font_1440074043_6914854.ttf')"
    })
  },
  methods: {
    onUser () {
      this.$emit('onUser')
    },
    onRepo () {
      this.$emit('onRepo')
    }
  }
}
</script>

<style scoped>
.iconfont {
  font-family: iconfont;
  color: #3e434f;
}
.tabbar-wrp {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 750px;
  height: 88px;
  background-color: #FFF;
  flex-direction: row;
  align-items: center;
  border-top-width: 2px;
  border-color: #e2e2e2;
}
.is-ios {
  /*height: 128px;*/
  /*padding-bottom: 40px;*/
}
.tabbar-item {
  flex: 1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabbar-text {
  font-size: 24px;
  color: #3e434f;
}
.tabbar-icon {
  font-size: 44px;
}
</style>


