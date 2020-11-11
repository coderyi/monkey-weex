<template>
  <div :class="['wrp', platform === 'ios'?'is-ios':'']" @viewappear="onShow" @viewdisappear="onHide">
    <user-rank v-if="!showRepo" ref="userRank"></user-rank>
    <rep-rank v-if="showRepo" ref="repRank"></rep-rank>
    <tab-bar @onUser="onUser" @onRepo="onRepo"></tab-bar>
  </div>
</template>

<script>
import TabBar from './component/tab-bar.vue'
import UserRank from './user-rank.vue'
import RepRank from './rep-rank.vue'

export default {
  components: { TabBar, RepRank,UserRank },
  data () {
    return {
      activeTab: 0,
      tabs: [{
        title: 'beijing'
      }, {
        title: 'china'
      }, {
        title: 'world'
      }],
      showRepo: false,
      platform: weex.config.env.platform.toLowerCase()
    }
  },
  created () {
    if (weex.config.env.platform === 'Web') {
      this.onShow()
    }
  },
  methods: {
    onUser () {
      if (weex.config.env.platform === 'Web') {
        this.onHide()
      }
      this.showRepo = false;
    },
    onRepo () {
      if (weex.config.env.platform === 'Web') {
        this.onHide()
      }
      this.showRepo = true;
    },
    onHide () {
    },
    onShow () {
      console.log('indexonShow')
      // this.$refs.repRank
      if (this.showRepo) {
        this.$refs.repRank.viewShow();
      } else {
        this.$refs.userRank.viewShow();
      }
    }
  }
}
</script>

<style scoped>
  .wrp {
    /*background-color: #f0efe9;*/
  }
  .is-ios {
      margin-top: -40px;
  }
</style>
