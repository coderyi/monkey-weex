<template>
  <div>
    <nav-bar :title="user_login" :show-back="true"></nav-bar>
    <div class="user-div">
      <div class= "user-header">
        <image style="width: 120px;height:120px;margin-top:20px;" :src="user_avatar_url"></image>
        <text style="margin-top:20px;font-size: 12px;">{{userdetail.created_at}}</text>
      </div>
      <div class= "user-row">
        <text style="margin-top:20px;color:#437ABE;"> {{user_login}}</text>
        <text style="margin-top:20px;color:#9C9C9C;"> {{userdetail.name}}</text>
        <text style="margin-top:20px"> {{userdetail.company}}</text>
      </div>
      <div class= "user-footer">
        <text style="margin-top:20px"> {{userdetail.email?userdetail.email:'&nbsp;'}}</text>
        <text style="margin-top:20px;color:#437ABE;" @click="onClickBlog" v-if="userdetail.blog"> {{userdetail.blog}}</text>
        <text style="margin-top:20px"> {{userdetail.location}}</text>
      </div>
    </div>
    <div class="tabbar">
      <div class="tab active" :style="{ left: activeTab * 160 + 'px'}"></div>
      <div  class="tab" @click="clickTab(0)">
        <text class="title">repositories</text>
      </div>
      <div  class="tab" @click="clickTab(1)">
        <text class="title">following</text>
      </div>
      <div  class="tab" @click="clickTab(2)">
        <text class="title">followers</text>
      </div>
    </div>
    <div class="tab-panels" :style="{ left: activeTab * -750 + 'px'}">
      <div class="panel">
        <list class="list" v-if="activeTab==0">
          <refresh class="refresh" @refresh="handleRefresh" :display="refreshing ? 'show' : 'hide'">
            <text class="indicator-text">Refreshing ...</text>
            <loading-indicator class="indicator"></loading-indicator>
          </refresh>
          <cell class="row" v-for="(v , k) in rows" index="k" @click="onClickCell(v,k)">
            <rep-rank-item :index="k" :login="v.owner.login" :avatar_url="''" :name="v.name" :repdescription="v.description" :homepage="v.homepage?v.homepage:''" :stargazers_count="v.stargazers_count"></rep-rank-item>
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
            <user-rank-item :index="k" :login="v.login?v.login:''" :avatar_url="v.avatar_url?v.avatar_url:''"></user-rank-item>
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
            <user-rank-item :index="k" :login="v.login?v.login:''" :avatar_url="v.avatar_url?v.avatar_url:''"></user-rank-item>
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
  import RepRankItem from './rep-rank-item.vue'

  export default {
    name: 'user-detail',
    components: { UserRankItem,NavBar,RepRankItem },

    data() {
      return{
        user_login: '',
        user_avatar_url: '',
        userdetail: '',
        rows: [],
        page3Rows: [],
        page3: 1,
        page2Rows: [],
        page2: 1,
        page1Rows: [],
        page1: 1,
        currentIndex: 1,
        lastSelectedIndex: 1,
        refreshing: false,
        loadinging: false,
        activeTab: 0
      }
    },
    created: function() {
    },
    mounted: function() {
      var me = this;
      var bundleUrl = weex.config.bundleUrl;
      me.user_login = utils.getParameterByName('login', bundleUrl)
      me.user_avatar_url = utils.getParameterByName('avataUrl', bundleUrl)
      me.requestDetail(me.user_login)
      this.requestData(function(state) {
      });
    },

    methods: {
      requestDetail: function (login) {
        var me = this;
        monkeyApi.requestUserDetail(login,function(data){
          me.userdetail = data;
          me.userdetail.created_at = me.userdetail.created_at.substring(0,10)
        })
      },
      onClickBlog: function (e) {
        // navigator.push({
        //   url: this.userdetail.blog,
        //   animated: 'true'
        // })
        navigator.push({
          url: getEntryUrl('mwebview') + '?src=' + this.userdetail.blog,
          animated: 'true'
        })
      },
      clickTab(i) {
        this.activeTab = i
        this.onClickSegment(i+1);
      },
      onClickSegment: function (index) {
        var vm = this;
        vm.currentIndex = index ;
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
        }else if (index == 2) {
          if (vm.page2Rows.length > 0) {
            vm.rows = vm.page2Rows;
          } else {
            vm.requestData(function(state) {
            });
          }
        }else {
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
        }else if (vm.currentIndex === 2){
          vm.page2 = vm.page2 + 1;
        }else{
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
      onClickCell: function (v,k) {
        var index = k;
        var userUrl = getEntryUrl('user-detail') + '?login=' + this.rows[index].login + '&avataUrl=' + this.rows[index].avatar_url;
        navigator.push({
          url: userUrl,
          animated: 'true'
        })
      },
      requestData:function (callback){
        var me = this;
        var pageNum;

        if (me.currentIndex === 1) {
          pageNum = me.page1;
          monkeyApi.requestUserReps(this.user_login, pageNum, function(data){
            if (me.page1 > 1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.page1Rows.push(item);
              }
            }else{
              me.page1Rows = data;
            }
            me.rows = me.page1Rows;
            // modal.toast({
            //   message: '加载数据成功'
            // })
            callback(true);
          })

        } else if (me.currentIndex === 2) {

          pageNum = me.page2;
          monkeyApi.requestUserFollowing(this.user_login, pageNum, function(data){
            if (me.page2 > 1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.page2Rows.push(item);
              }
            } else{
              me.page2Rows = data;
            }
            me.rows = me.page2Rows;
            callback(true);
          })
        } else {
          pageNum = me.page3;
          monkeyApi.requestUserFollowers(this.user_login, pageNum, function(data){
            if (me.page3 > 1) {
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                me.page3Rows.push(item);
              }
            } else{
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
  .user-div {
    width: 740px;
    height: 300px;
    flex-direction: row;
    /*background-color: #ffffff;*/
    margin: 5px;
    padding: 10px;
    /*border-width: 1px;*/
    /*border-color: #cccccc;*/
    overflow: visible;
  }
  .user-header {
    flex-direction: column;
    flex :1.2;
    margin-left:5px;
    /*background-color: #ffff33;*/
  }
  .user-row {
    flex-direction: column;
    flex :2;
    margin-left:5px;
    /*background-color: #fff12f;*/
  }
  .user-footer {
    flex-direction: column;
    flex :3;
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
    background-color: white;
    transition: left 0.2s ease-in-out;
  }
  .panel {
    font-size: 100px;
    color: #707070;
    align-items: center;
    width: 750px;
  }
</style>
