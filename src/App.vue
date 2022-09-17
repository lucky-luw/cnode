<template>
    <div>
       <router-view></router-view>
       <el-backtop :visibility-height="150" :bottom="60" :right="10" style="color:#737980;"></el-backtop>
    </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  body {
    background-color: #e1e1e1;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
  }
 /* 防止页面不够显示而抖动 */
  html,body{  min-height:101%;} 
</style>
