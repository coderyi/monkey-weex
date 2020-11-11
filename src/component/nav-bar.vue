<template>
  <div class="nav-bar" :class="[platform === 'ios' ? 'is-ios' : '']">
    <text v-if="showBack" class="iconfont nav-bar-icon" @click="onBack">&#xe8b5;</text>
    <text v-else class="nav-bar-title" @click="onLeft">{{leftTitle}}</text>
    <text class="nav-bar-title">{{title}}</text>
    <text class="nav-bar-title" @click="onRight">{{rightTitle}}</text>
  </div>
</template>

<script>
const navigator = weex.requireModule('navigator')

export default {
  name: 'nav-bar',
  data () {
    return {
      platform: weex.config.env.platform.toLowerCase()
    }
  },
  props: {
    showBack: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    rightTitle: {
      type: String,
      required: false
    },
    leftTitle: {
      type: String,
      required: false
    }
  },
  beforeCreate () {
    const domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': "url('http://at.alicdn.com/t/font_571013_3jfs8b3sidxwdn29.ttf')"
    })
  },
  methods: {
    onBack () {
      navigator.pop({
        animated: 'true'
      })
    },
    onLeft () {
      this.$emit('onLeft')
    },
    onRight () {
      this.$emit('onRight')
    }
  }
}
</script>

<style scoped>
.iconfont {
  font-family: iconfont;
}
.nav-bar {
  height: 88px;
  background-color: #3D82C7;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
.is-ios {
  height: 128px;
  padding-top: 40px;
}
.nav-bar-title {
  color: #FFFFFF;
  font-size: 32px;
}
.nav-bar-icon {
  color: #FFFFFF;
  font-size: 36px;
}
</style>

