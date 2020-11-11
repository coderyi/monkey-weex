<template>
  <div class="wrp">
    <nav-bar :title="currentLanguage" :show-back="false" rightTitle="language" leftTitle="city" @onLeft="onClickLeftItem" @onRight="onClickRightItem"></nav-bar>
    <div class="tabbar">
      <div class="tab active" :style="{ left: activeTab * 150 + 'px'}"></div>
      <div  class="tab" @click="clickTab(0)">
        <text class="title">{{currentCity}}</text>
      </div>
      <div  class="tab" @click="clickTab(1)">
        <text class="title">{{currentCountry}}</text>
      </div>
      <div  class="tab" @click="clickTab(2)">
        <text class="title">world</text>
      </div>
    </div>
    <div class="tab-panels" :style="{ left: activeTab * -750 + 'px'}">
      <div class="panel">
        <list class="list">
          <refresh class="refresh" @refresh="handleRefresh" :display="refreshing ? 'show' : 'hide'">
            <text class="indicator-text">Refreshing ...</text>
            <loading-indicator class="indicator"></loading-indicator>
          </refresh>
          <cell class="row" v-for="(v , k) in rows" index="k" @click="onClickCell(v,k)">
            <user-rank-item :index="k" :login="v.login" :avatar_url="v.avatar_url"></user-rank-item>
          </cell>
          <loading class="more-loading" @loading="onLoading" :display="loadinging ? 'show' : 'hide'">
            <text class="more-indicator-text">Loading ...</text>
            <loading-indicator class="more-indicator"></loading-indicator>
          </loading>
        </list>
      </div>
      <div class="panel">
        <list class="list">
          <refresh class="refresh" @refresh="handleRefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
            <text class="indicator-text">Refreshing ...</text>
            <loading-indicator class="indicator"></loading-indicator>
          </refresh>
          <cell class="row" v-for="(v , k) in rows" index="k" @click="onClickCell(v,k)">
            <user-rank-item :index="k" :login="v.login" :avatar_url="v.avatar_url"></user-rank-item>
          </cell>
          <loading class="more-loading" @loading="onLoading" :display="loadinging ? 'show' : 'hide'">
            <text class="more-indicator-text">Loading ...</text>
            <loading-indicator class="more-indicator"></loading-indicator>
          </loading>
        </list>
      </div>
      <div class="panel">
        <list class="list">
          <refresh class="refresh" @refresh="handleRefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
            <text class="indicator-text">Refreshing ...</text>
            <loading-indicator class="indicator"></loading-indicator>
          </refresh>
          <cell class="row" v-for="(v , k) in rows" index="k" @click="onClickCell(v,k)">
            <user-rank-item :index="k" :login="v.login" :avatar_url="v.avatar_url"></user-rank-item>
          </cell>
          <loading class="more-loading" @loading="onLoading" :display="loadinging ? 'show' : 'hide'">
            <text class="more-indicator-text">Loading ...</text>
            <loading-indicator class="more-indicator"></loading-indicator>
          </loading>
        </list>
      </div>
    </div>
  </div>
</template>

<script>
  var utils = require('./weex-kit/js-kit/utils');
  var monkeyApi = require('./common-js/api');
  import UserRankItem from './user-rank-item.vue'
  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')
  import { getEntryUrl } from './weex-kit/js-kit/utils'
  import NavBar from './component/nav-bar.vue'
  var timer
  import {getCache, removeCache, setCache} from './weex-kit/js-kit/storage-utils'

  export default {
    name: 'user-rank',
    components: { 'user-rank-item':UserRankItem,NavBar },
    data() {
      return {
        rows:[],
        // rows:[{avatar_url:"https://vuejs.org/images/logo.png",login:"hello1"},{avatar_url:"https://vuejs.org/images/logo.png",login:"world"},
        //   {avatar_url:"https://vuejs.org/images/logo.png",login:"hello3"},{avatar_url:"https://vuejs.org/images/logo.png",login:"world"},
        //   {avatar_url:"https://vuejs.org/images/logo.png",login:"hello5"},{avatar_url:"https://vuejs.org/images/logo.png",login:"world"},
        //   {avatar_url:"https://vuejs.org/images/logo.png",login:"hello7"},{avatar_url:"https://vuejs.org/images/logo.png",login:"world8"}],
        worldRows:[],
        worldPage:1,
        countryRows:[],
        countryPage:1,
        cityRows:[],
        cityPage:1,
        currentIndex:1,
        lastSelectedIndex: 1,
        currentCity:'Beijing',
        currentCountry:'China',
        currentLanguage:'Objective-C',
        refreshing: false,
        loadinging: false,
        activeTab: 0,
      }
    },
    created: function(){
    },
    mounted: function() {
      this.loadData();
    },
    methods: {
      async loadData() {
        var isDiffData = false;
        var cityData = await getCache('city');
        if (this.currentCity !== cityData) {
          isDiffData = true;
        }
        if (cityData && cityData != 'undefined') {
          this.currentCity = cityData;
        }
        var countryData = await getCache('country');
        if (this.currentCountry !== countryData) {
          isDiffData = true;
        }
        if (countryData && countryData != 'undefined') {
          this.currentCountry = countryData;
        }
        var languageData = await getCache('language');
        if (this.currentLanguage !== languageData) {
          isDiffData = true;
        }
        if (languageData && languageData != 'undefined') {
          this.currentLanguage = languageData;
        }
        if (isDiffData) {
          this.requestData(function(state) {
          });
        }
      },
      viewShow: function() {
        // modal.toast({
        //   message: '加载数据成功'
        // })
        if (utils.isIosPlatform()) {
          this.loadData();
        }
      },
      clickTab: function(i) {
        this.activeTab = i
        this.onClickSegment(i + 1);
      },
      onClickRightItem:function(e) {
        navigator.push({
          url: getEntryUrl('language'),
          animated: 'true'
        })
      },
      onClickLeftItem:function(e) {
        navigator.push({
          url: getEntryUrl('country'),
          animated: 'true'
        })
      },
      onClickSegment : function (index) {
        var vm = this;
        vm.currentIndex = index ;
        if (vm.currentIndex === vm.lastSelectedIndex) {
          return;
        }
        vm.lastSelectedIndex = index;
        if (index === 1) {
          if (vm.cityRows.length > 0) {
            vm.rows = vm.cityRows;
          }else {
            vm.requestData(function(state) {
            });
          }
        }else if (index == 2) {
          if (vm.countryRows.length > 0) {
            vm.rows = vm.countryRows;
          }else {
            vm.requestData(function(state) {
            });
          }
        }else {
          if (vm.worldRows.length > 0) {
            vm.rows = vm.worldRows;
          }else {
            vm.requestData(function(state) {
            });
          }
        }
      },
      onLoading: function (e) {
        var vm = this;
        vm.loadinging = true;
        if (vm.currentIndex === 1) {
          vm.cityPage = vm.cityPage + 1;
        } else if (vm.currentIndex === 2) {
          vm.countryPage = vm.countryPage + 1;
        } else {
          vm.worldPage = vm.worldPage + 1;
        }
        setTimeout(function () {
          vm.loadinging = false;
        }, 10000)
        vm.requestData(function(state) {
          vm.loadinging = false;
        });
      },
      handleRefresh: function (e) {
        var vm = this;
        vm.refreshing = true
        if (vm.currentIndex === 1) {
          vm.cityPage = 1;
        } else if (vm.currentIndex === 2){
          vm.countryPage = 1;
        } else {
          vm.worldPage = 1;
        }
        timer = setInterval(function () {
          vm.refreshing = false
        }, 10000)
        vm.requestData(function(state) {
          vm.refreshing = false
        });
      },
      onClickCell: function (v, k) {
        var index = k;
        var userUrl = getEntryUrl('user-detail') + '?login=' + this.rows[index].login + '&avataUrl=' + this.rows[index].avatar_url;
        navigator.push({
          url: userUrl,
          animated: 'true'
        })
      },
      requestData:function (callback){
        var me = this;
        var location = me.currentCity;
        var pageNum;
        if (me.currentIndex === 1) {
          if (!me.currentCity) {
            me.currentCity = 'Beijing'
          }
          location = me.currentCity;
          pageNum = me.cityPage;
        } else if (me.currentIndex === 2) {
          if (!me.currentCountry) {
            me.currentCountry = 'China'
          }
          location = me.currentCountry;
          pageNum = me.countryPage;
        } else {
          location = 'World';
          pageNum = me.worldPage;
        }
        if (!me.currentLanguage) {
          me.currentLanguage = 'JavaScript';
        }
        monkeyApi.requestUserRank(me.currentLanguage, location, pageNum, function(data) {
          if (me.currentIndex === 1) {
            if (me.cityPage > 1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.cityRows.push(item);
              }
            }else{
              me.cityRows = data;
            }
            me.rows = me.cityRows;
            // modal.toast({
            //   message: '加载数据成功'
            // })
          } else if (me.currentIndex === 2) {
            if (me.countryPage > 1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.countryRows.push(item);
              }
            } else {
              me.countryRows = data;
            }
            me.rows = me.countryRows;
          }else {
            if (me.worldPage > 1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.worldRows.push(item);
              }
            } else {
              me.worldRows = data;
            }
            me.rows = me.worldRows;
          }
          callback(true);
        })
      }
    }
  }
</script>


<style scoped>
  .list {
    width: 750px;
    height: 1040px;
    flex: 1;
  }
  .indicator {
    height:60px;
    width:60px;
    color:#3192e1;
  }
  .row {
    width: 750px;
  }
  .refresh {
    height: 120px;
    width: 750px;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .indicator-text {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: blue;
  }
  .more-loading {
    width: 750px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
  }
  .more-indicator-text {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .more-indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: blue;
  }
  .wrp {
    /*background-color: #f0efe9;*/
  }
  .title {
    font-size: 24px;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    color: #3e434f;
  }
  .tabbar {
    flex-direction: row;
    background-color: lightgray;
  }
  .tab {
    height: 80px;
    width: 150px;
    justify-content: center;
    align-items: center;
  }
  .active {
    position: absolute;
    top: 0;
    left: 0;
    background-color: gray;
    transition: left 0.2s ease-in-out;
  }
  .tab-panels {
    position: relative;
    width: 3750px;
    flex: 1;
    flex-direction: row;
    align-items: stretch;
    /*background-color: #F5F5F5;*/
    transition: left 0.2s ease-in-out;
  }
  .panel {
    font-size: 100px;
    color: #707070;
    align-items: center;
    width: 750px;
  }
</style>
