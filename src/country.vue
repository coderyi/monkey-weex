<template>
  <div>
    <nav-bar title="country" :show-back="true"></nav-bar>
    <list class="list">
      <cell class="row" v-for="(v , k) in rows" index="k" @click="onClickCell(v,k)">
        <div class="item">
          <text class="item-title">{{v.name}}</text>
        </div>
      </cell>
    </list>
  </div>
</template>

<script>
  var utils = require('./weex-kit/js-kit/utils');
  const navigator = weex.requireModule('navigator')
  import { getEntryUrl } from './weex-kit/js-kit/utils'
  import NavBar from './component/nav-bar.vue'

export default {
  name: 'country',
  components: {NavBar},
  data () {
    return {
      rows:[
        {name: 'USA'},
        {name: 'UK'},
        {name: 'Germany'},
        {name: 'China'},
        {name: 'Canada'},
        {name: 'India'},
        {name: 'France'},
        {name: 'Australia'},
        {name: 'Other'}
      ]
    }
  },

  created() {
  },

  methods: {
    onClickCell: function (v,k) {
      var index = k;
      var storage = weex.requireModule('storage');
      if (index === this.rows.length-1) {
      } else {
        storage.setItem('country',this.rows[index].name,function(e){
        });
      }
      navigator.push({
        url: getEntryUrl('city') + '?countryIndex=' + index,
        animated: 'true'
      })
    }
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
