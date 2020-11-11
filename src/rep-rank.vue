<template>
  <div>
    <nav-bar :title="currentLanguage" :show-back="false" rightTitle="language" @onRight="onClickRightItem"></nav-bar>
    <list class="list">
      <refresh class="refresh" @refresh="handleRefresh" :display="refreshing ? 'show' : 'hide'">
        <text class="indicator-text">Refreshing ...</text>
        <loading-indicator class="indicator"></loading-indicator>
      </refresh>
      <cell class="row" v-for="(v , k) in rows" index="k" @click="onClickCell(v,k)">
        <rep-rank-item :index="k" :login="v.owner.login" :avatar_url="v.owner.avatar_url" :name="v.name" :repdescription="v.description" :homepage="v.homepage?v.homepage:''" :stargazers_count="v.stargazers_count"></rep-rank-item>
      </cell>

      <loading class="more-loading" @loading="onLoading" :display="loadinging ? 'show' : 'hide'">
        <text class="more-indicator-text">Loading ...</text>
        <loading-indicator class="more-indicator"></loading-indicator>
      </loading>
    </list>
  </div>
</template>

<script>
  var utils = require('./weex-kit/js-kit/utils');
  var monkeyApi = require('./common-js/api');
  import RepRankItem from './rep-rank-item.vue'
  import { getEntryUrl } from './weex-kit/js-kit/utils'
  const navigator = weex.requireModule('navigator')
  import NavBar from './component/nav-bar.vue'
  var timer

  export default {
    name: 'rep-rank',
    components: { RepRankItem,NavBar },

    data() {
      return{
        page: 1,
        rows: [],
        // rows:[{owner:{avatar_url:"https://vuejs.org/images/logo.png",login:"hello1"},name:"name1",description:"description1",homepage:"homepage1",stargazers_count:"stargazers_count1"}],
        currentLanguage: 'JavaScript',
        refreshing: false,
        loadinging: false
      }
    },
    created: function() {
    },
    mounted: function() {
      this.loadData();
    },

    methods: {
      loadData() {
        var storage = weex.requireModule('storage');

        var me = this;
        var isDiff = false;
        storage.getItem('rep-language', function(e){
          if (me.currentLanguage !== e.data) {
            isDiff = true;
          }
          if (e.data && e.data != 'undefined') {
            me.currentLanguage = e.data;
          }

          me.requestData(function(state) {
          });
        });
      },
      viewShow: function() {
        if (utils.isIosPlatform()) {
          this.loadData();
        }
      },
      onClickRightItem: function(e) {
        navigator.push({
          url: getEntryUrl('language')+'?from=rep',
          animated: 'true'
        })
      },
      onLoading: function (e) {
        var vm = this
        vm.loadinging = true;

        vm.page = vm.page + 1;
        setTimeout(function () {
          vm.loadinging = false;

        }, 10000)
        vm.requestData(function(state) {
          vm.loadinging = false;
        });
      },
      handleRefresh: function (e) {
        var vm = this
        vm.refreshing = true

        vm.page = 1;
        timer = setInterval(function () {
          vm.refreshing = false

        }, 10000)
        vm.requestData(function(state) {
          vm.refreshing = false

        });
      },
      onClickCell: function (v, k) {
        var index = k;
        var repUrl = getEntryUrl('rep-detail')+'?rep_login='+this.rows[index].owner.login+'&rep_avatar_url='+this.rows[index].owner.avatar_url+'&rep_name='+this.rows[index].name+'&rep_created_at='+this.rows[index].created_at+'&rep_homepage='+this.rows[index].homepage+'&rep_description='+encodeURIComponent(this.rows[index].description);
        navigator.push({
          url: repUrl,
          animated: 'true'
        })
      },
      requestData: function (callback){
        var me = this;
        monkeyApi.requestRepRank(me.currentLanguage,me.page).then(function(data){
          if (me.page > 1) {
            for (var i = 0; i < data.length; i++) {
              var item = data[i];
              me.rows.push(item);
            }
          }else{
            me.rows = data;
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
    flex: 1;
    height: 1120px;
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
</style>
