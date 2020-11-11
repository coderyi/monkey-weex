<template>
  <div>
    <nav-bar :title="user_login?user_login:''" :show-back="true"></nav-bar>
    <div class="rep-div">
      <div class= "rep-header">
        <text class="item-rep-name"> {{rep_name+'/'+rep_login}}</text>
      </div>
      <div class= "rep-center">
        <text class="item-create-time"> {{rep_created_at}}</text>
        <text class="item-header-text" @click="onClickUrl">{{rep_homepage}}</text>
      </div>
      <div class= "rep-footer">
        <text class="item-desc-text"> {{rep_description}}</text>
      </div>
    </div>
    <div class="tabbar">
      <div class="tab active" :style="{ left: activeTab * 160 + 'px'}"></div>
      <div  class="tab" @click="clickTab(0)">
        <text class="title">contributors</text>
      </div>
      <div  class="tab" @click="clickTab(1)">
        <text class="title">forks</text>
      </div>
      <div  class="tab" @click="clickTab(2)">
        <text class="title">stargazers</text>
      </div>
    </div>
    <div class="tab-panels" :style="{ left: activeTab * -750 + 'px'}">
      <div class="panel" title="Objective-C" ref="cityuserrank">
        <list class="list" v-if="activeTab==0">
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
      <div class="panel" title="Objective-C">
        <list class="list" v-if="activeTab==1">
          <refresh class="refresh" @refresh="handleRefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
            <text class="indicator-text">Refreshing ...</text>
            <loading-indicator class="indicator"></loading-indicator>
          </refresh>
          <cell class="row" v-for="(v , k) in rows" index="k" @click="onClickCell(v,k)">
            <user-rank-item :index="k" :login="v.owner.login" :avatar_url="v.owner.avatar_url"></user-rank-item>
          </cell>
          <loading class="more-loading" @loading="onLoading" :display="loadinging ? 'show' : 'hide'">
            <text class="more-indicator-text">Loading ...</text>
            <loading-indicator class="more-indicator"></loading-indicator>
          </loading>
        </list>
      </div>
      <div class="panel" title="Objective-C">
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
  export default {
    name: 'rep-detail',
    components: { UserRankItem,NavBar },
    data() {
      return {
        rep_created_at:'',
        rep_login: '',
        rep_avatar_url: '',
        rep_name: '',
        rep_description: '',
        rep_homepage: '',
        rep_stargazers_count: '',
        rep_forks_count: '',
        rows:[],
        page3Rows:[],
        page3:1,
        page2Rows:[],
        page2:1,
        page1Rows:[],
        page1:1,
        currentIndex:1,
        lastSelectedIndex: 1,
        refreshing: false,
        loadinging: false,
        activeTab: 0,
      }
    },
    created: function() {
      var me = this;
      var bundleUrl = weex.config.bundleUrl;
      me.rep_created_at = utils.getParameterByName('rep_created_at', bundleUrl).substring(0,10)
      me.rep_login = utils.getParameterByName('rep_login', bundleUrl)
      me.rep_avatar_url = utils.getParameterByName('rep_avatar_url', bundleUrl)
      me.rep_name = utils.getParameterByName('rep_name', bundleUrl)
      me.rep_description = utils.getParameterByName('rep_description', bundleUrl)
      me.rep_homepage = utils.getParameterByName('rep_homepage', bundleUrl)
      this.user_login = this.rep_login;
    },
    mounted: function() {
      this.requestData(function(state) {
      });
    },
    methods: {
      onClickUrl: function () {
        navigator.push({
          url: getEntryUrl('mwebview') + '?src=' + this.rep_homepage,
          animated: 'true'
        })
      },
      clickTab: function(i) {
        this.activeTab = i
        this.onClickSegment(i+1);
      },
      onClickSegment: function (index) {
        var vm = this;
        vm.currentIndex = index;
        if (vm.currentIndex === vm.lastSelectedIndex) {
          return;
        }
        vm.lastSelectedIndex = index;
        if (index === 1) {
          if (vm.page1Rows.length > 0) {
            vm.rows = vm.page1Rows;
          } else {
            vm.requestData(function(state) {
            });
          }
        } else if (index == 2) {
          if (vm.page2Rows.length > 0) {
            vm.rows = vm.page2Rows;
          }else {
            vm.requestData(function(state) {
            });
          }
        } else {
          if (vm.page3Rows.length > 0) {
            vm.rows = vm.page3Rows;
          } else {
            vm.requestData(function(state) {
            });
          }
        }
      },
      onLoading: function (e) {
        var vm = this;
        vm.loadinging = true;
        if (vm.currentIndex === 1) {
          vm.page1 = vm.page1 + 1;
        } else if (vm.currentIndex === 2){
          vm.page2 = vm.page2 + 1;
        } else {
          vm.page3 = vm.page3 + 1;
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
          vm.page1 = 1;
        }else if (vm.currentIndex === 2){
          vm.page2 = 1;
        }else {
          vm.page3 = 1;
        }
        timer = setInterval(function () {
          vm.refreshing = false
        }, 10000)
        vm.requestData(function(state) {
          vm.refreshing = false
        });
      },
      onClickCell: function (v, k) {

      },
      requestData: function (callback) {
        var me = this;
        var pageNum;
        if (me.currentIndex === 1) {
          pageNum = me.page1;
          monkeyApi.requestRepoContributors(this.user_login, this.rep_name, pageNum, function(data){
            if (me.page1 > 1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.page1Rows.push(item);
              }
            }else{
              me.page1Rows = data;
            }
            me.rows = me.page1Rows;
            modal.toast({
              message: '加载数据成功'
            })
            callback(true);
          })
        }else if (me.currentIndex === 2) {

          pageNum = me.page2;
          monkeyApi.requestRepoForks(this.user_login, this.rep_name, pageNum, function(data){
            if (me.page2>1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.page2Rows.push(item);
              }
            }else{
              me.page2Rows=data;
            }
            me.rows = me.page2Rows;
            callback(true);
          })
        }else{
          pageNum = me.page3;
          monkeyApi.requestRepoStargazers(this.user_login,this.rep_name,pageNum,function(data){
            if (me.page3>1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.page3Rows.push(item);
              }
            }else{
              me.page3Rows = data;
            }
            me.rows = me.page3Rows;
            callback(true);
          })
        }
      }
    }
  }
</script>

<style scoped>
  .item-rep-name {
    color: #437ABE;
    font-size: 32px;
    margin-top:10px;
    text-overflow:ellipsis;
    margin-left:30px;
    flex :1;
    margin-right:0px;
  }
  .item-create-time {
    /*color: #437ABE;*/
    font-size: 24px;
    margin-top:10px;
    text-overflow:ellipsis;
    margin-left:30px;
    flex :1;
    margin-right:0px;
  }
  .item-header-text {
    color: #437ABE;
    font-size: 24px;
    margin-top:10px;
    text-overflow:ellipsis;
    margin-left:30px;
    flex :1;
    margin-right:0px;
  }
  .item-desc-text {
    /*color: #437ABE;*/
    font-size: 24px;
    margin-top:10px;
    text-overflow:ellipsis;
    margin-left:30px;
    flex :1;
    margin-right:0px;
  }

  .rep-div {
    width: 740px;
    height: 200px;
    flex-direction: column;
    /*background-color: #ffffff;*/
    margin: 5px;
    padding: 10px;
    /*border-width: 1px;*/
    /*border-color: #cccccc;*/
    overflow: visible;
  }
  .rep-header {
    flex-direction: row;
    flex :2;
    margin-left:5px;
    /*background-color: #ffff33;*/
  }
  .rep-center {
    flex-direction: row;
    flex :1;
    margin-left:5px;
    /*background-color: #fff12f;*/
  }
  .rep-footer {
    flex-direction: row;
    flex :2;
    margin-left:5px;
    /*background-color: #34ffff;*/
  }
  .list {
    width: 750px;
    height: 700px;
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
    width: 160px;
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
