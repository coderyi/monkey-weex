<template>
  <div>
    <nav-bar title="city" :show-back="true"></nav-bar>
    <list class="list">
      <cell class="row" v-for="(v , k) in rows" @click="onClickCell(k)">
        <div class="item">
          <text class="item-title">{{v.name}}</text>
        </div>
      </cell>
    </list>
  </div>
</template>


<script>
  var utils = require('./weex-kit/js-kit/utils');
  import NavBar from './component/nav-bar.vue'
  const navigator = weex.requireModule('navigator')

export default {
  name: 'city',
  components: { NavBar},
  data () {
    return {
      rows: [],
      datas: [
        [{name:"San Francisco"},{name:"New York"},{name:"Seattle"},{name:"Chicago"},{name:"Los Angeles"},{name:"Boston"},{name:"Washington"},{name:"San Diego"},{name:"San Jose"},{name:"Philadelphia"}],
        [{name:"London"},{name:"Cambridge"},{name:"Manchester"},{name:"Edinburgh"},{name:"Bristol"},{name:"Birmingham"},{name:"Glasgow"},{name:"Oxford"},{name:"Newcastle"},{name:"Leeds"}],
        [{name:"Berlin"},{name:"Munich"},{name:"Hamburg"},{name:"Cologne"},{name:"Stuttgart"},{name:"Dresden"},{name:"Leipzig"}],
        [{name:"beijing"},{name:"shanghai"},{name:"shenzhen"},{name:"hangzhou"},{name:"guangzhou"},{name:"chengdu"},{name:"nanjing"},{name:"wuhan"},{name:"suzhou"},{name:"xiamen"},{name:"tianjin"},{name:"chongqing"},{name:"changsha"}],
        [{name:"Toronto"},{name:"Vancouver"},{name:"Montreal"},{name:"ottawa"},{name:"Calgary"},{name:"Quebec"}],
        [{name:"Chennai"},{name:"Pune"},{name:"Hyderabad"},{name:"Mumbai"},{name:"New Delhi"},{name:"Noida"},{name:"Ahmedabad"},{name:"Gurgaon"},{name:"Kolkata"}],
        [{name:"paris"},{name:"Lyon"},{name:"Toulouse"},{name:"Nantes"}],
        [{name:"sydney"},{name:"Melbourne"},{name:"Brisbane"},{name:"Perth"}],
        [{name:"Tokyo"},{name:"Moscow"},{name:"Singapore"},{name:"Seoul"}]
      ]
    }
  },
  created() {
    var me = this;
    var bundleUrl = me.$getConfig().bundleUrl;
    var countryIndex = utils.getParameterByName('countryIndex', bundleUrl)
    me.rows = me.datas[countryIndex];
  },
  methods: {
    onClickCell: function (index) {
      var storage = weex.requireModule('storage');
      var cityName = this.rows[index].name
      storage.setItem('city', cityName, function(e) {
        navigator.pop({
          animated: 'true'
        })
      });
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
