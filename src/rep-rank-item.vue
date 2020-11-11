<template>
  <div class="repItem">
    <div class = "titleDiv">
      <text class="item-title" style= "margin-left:10px;width:90px;font-size: 40px ;text-overflow: ellipsis;text-align: center;align-items:center;padding-top:16px">{{index+1}}</text>
      <image style="margin-left:10px;width: 80px;height: 80px;justify-content:center;border-radius:10px;" :src="avatar_url"></image>
    </div>
    <div class= "detailDiv">
      <div class="detailTitleItem">
        <text class="item-title" style= "text-overflow:ellipsis;width:400px;margin-left:30px;margin-right:0;flex:2;">{{name}}</text>
        <text class="item-star" style= "text-overflow:ellipsis;width:400px;margin-left:30px;margin-right:0;flex:1;">{{'Star:'+stargazers_count}}</text>
      </div>
      <div class="detailCenterItem">
        <text class="item-star" style= "text-overflow:ellipsis;width:400px;margin-left:30px;margin-right:0;flex:1;">{{'Owner:'+login}}</text>
        <text class="item-homepage" style= "text-overflow:ellipsis;width:400px;margin-left:30px;margin-right:0;flex:2;">{{homepage}}</text>
      </div>
      <div class="detailFooterItem">
        <text class="item-description" style= "text-overflow:ellipsis;width:400px;margin-left:30px;flex:1">{{repdescription?repdescription:''}}</text>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      index: {
        type: Number,
        default: true
      },
      avatar_url: {
        type: String,
        required: true
      },
      login: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      repdescription: {
        type: String,
        required: false
      },
      homepage: {
        type: String,
        required: true
      },
      stargazers_count: {
        type: Number,
        required: true
      }
    },
    methods: {
    }
  }
</script>



<style scoped>
  .repItem {
    border-bottom-width: 1px;
    border-bottom-color: #c0c0c0;
    margin-right:5px;
    margin-left:5px;
    justify-content:flex-start;
    padding: 20px;
    overflow: visible;
    flex-direction:row;
  }
  .item-title {
    color: #437ABE;
    lines:1;
    margin-top:10px;
  }
  .item-star {
    color: #9C9C9C;
    font-size: 24px;
    lines:1;
    margin-top:10px;
  }
  .item-homepage {
    color: #437ABE;
    font-size: 24px;
    lines:1;
    margin-top:10px;
  }
  .item-description {
    color: black;
    font-size: 26px;
    lines:2;
    margin-top:10px;
  }
  .titleDiv {
    flex-direction: column;
    flex :1;
    margin-left:5px;
    height: 200px
  }
  .detailDiv {
    flex-direction: column;
    flex :5;
    margin-left:5px;
  }
  .detailTitleItem {
    flex-direction: row;
    flex :1;
    margin-left:5px;
  }
  .detailCenterItem {
    flex-direction: row;
    flex :1;
    height: 20px;
    margin-left:5px;
  }
  .detailFooterItem {
    flex-direction: row;
    flex :2;
    margin-left:5px;
  }

</style>
