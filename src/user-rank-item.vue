<template>
  <div class="item">
    <text class="item-title" style= "margin-left:10px;width:90px;font-size: 40px ;text-overflow: ellipsis;text-align: center;align-items:center;padding-top:16px">{{index+1}}</text>
    <image style="width: 80px;height: 80px;justify-content:center;border-radius:10px;" :src="avatar_url"></image>
    <text class="item-title" style= "font-size: 40px;text-overflow:ellipsis;width:400px;margin-left:30px;margin-right:0;flex:1;padding-top:16px">{{login}}</text>
  </div>
</template>


<script>
  export default {
    name: 'user-rank-item',
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
      }
    },
    methods: {
    }
  }
</script>


<style scoped>
  .item {
    border-bottom-width: 1px;
    border-bottom-color: #c0c0c0;
    flex-direction:row;
    margin-right:5px;
    margin-left:5px;
    justify-content:flex-start;
    padding: 20px;
    overflow: visible;
  }
  .item-title {
    color: #437ABE;
  }
</style>
