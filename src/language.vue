<template>
  <div>
    <nav-bar title="language" :show-back="true"></nav-bar>
    <list class="list">
      <cell @appear="onAppear" @disappear="onDisappear" class="row" v-for="(v , k) in rows" index="k"  @click="onClickCell(k)">
        <div class="item">
          <text class="item-title">{{v.name}}</text>
        </div>
      </cell>
    </list>
  </div>
</template>

<script>
  import NavBar from './component/nav-bar.vue'
  const navigator = weex.requireModule('navigator')
  var utils = require('./weex-kit/js-kit/utils');

  export default {
    name: 'language',
    components: { NavBar },
    methods: {
      onAppear: function (e) {
        console.log('cellonappear')
      },
      onDisappear: function (e) {
      },
      onClickCell: function (index) {
        var storage = weex.requireModule('storage');

        var bundleUrl = this.$getConfig().bundleUrl;
        var isRep = utils.getParameterByName('from', bundleUrl)
        if (isRep === 'rep') {
          if (index > 0) {
            storage.setItem('rep-language', this.rows[index].name, function(e) {
              navigator.pop({
                animated: 'true'
              })
            });
          }
        }else {
          storage.setItem('language', this.rows[index].name, function(e) {
            navigator.pop({
              animated: 'true'
            })
          });
        }
      }
    },
    data: {
      rows: [
        {name: 'All language'},
        {name: 'JavaScript'},
        {name: 'Java'},
        {name: 'PHP'},
        {name: 'Ruby'},
        {name: 'Python'},
        {name: 'CSS'},
        {name: 'C'},
        {name: 'CPP'},
        {name: 'Objective-C'},
        {name: 'Swift'},
        {name: 'Shell'},
        {name: 'R'},
        {name: 'Perl'},
        {name: 'Lua'},
        {name: 'HTML'},
        {name: 'Scala'},
        {name: 'Go'}
      ]
    }
  }

</script>

<style scoped>
  .list {
    width: 750px;
    flex: 1;
  }
  .row {
    width: 750px;
  }
  .item {
    justify-content: center;
    border-bottom-width: 2px;
    border-bottom-color: #c0c0c0;
    height: 100px;
    padding:20px;
  }
  .item-title {
  }
</style>
