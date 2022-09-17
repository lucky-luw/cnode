<template>
  <el-container class="main" direction="vertical">
        <el-tabs  @tab-click="handleClick" v-model="activeName">
            <el-tab-pane label="分享" name="分享"></el-tab-pane>
            <el-tab-pane label="精华" name="精华"></el-tab-pane>
            <el-tab-pane label="问答" name="问答"></el-tab-pane>
            <el-tab-pane label="招聘" name="招聘"></el-tab-pane>
        </el-tabs>
        <div style="width: 90%; max-width: 1600px; min-width: 690px">
            <Mini :topics="topics" />
            <h2 v-show="isLoading">加载中，请等待</h2>
            <h2 v-if="error">{{ error }}</h2>
        </div>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import Mini from "./mini.vue";
export default {
  name: "topic",
  data() {
    return {
      page: 1,
      limit: 7,
      isLoading: false,
      error: null,
      tab: this.$route.query.tab || "share",
      activeName:'分享'
    };
  },
  methods: {
    getTopics() {
      this.error = null;
      this.isLoading = true;
      this.$store
        .dispatch("getTopics", {
          tab: this.tab,
          page: this.page,
          limit: this.limit,
        })
        .then(
          () => {
            this.isLoading = false;
          },
          (error) => {
            this.error = error;
            this.isLoading = false;
          }
        );
    },
    scrollBottom() {
      if (this.isLoading) return;
      // 变量scrollTop为当前页面的滚动条纵坐标位置
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 变量 windowHeight 是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 变量 scrollHeight 是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // 到底的条件
      if (Math.abs(scrollHeight - (scrollTop + windowHeight)) <= 10) {
        //到底后要去触发的事件
        // if (this.page*10 >=this.total) return this.$message('数据加载完毕')
        this.page++;
        this.getTopics();
      }
    },
    changeRoute(tab){
      this.$router.push({
          path:'/main/topic',
          query:{
              tab,
          }
      })
    },
      handleClick(tab){
          switch (tab.label) {
              case "分享": 
              this.changeRoute("share")
              break;
              case "精华": 
              this.changeRoute("good")
              break;
              case "问答":
                 this.changeRoute("ask")
              break;
              case "招聘": 
              this.changeRoute("job")
              break;
          }
      },
  },
  mounted() {
    this.getTopics();
    window.addEventListener("scroll", this.scrollBottom);
  },
  computed: {
    ...mapState(["topics"]),
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollBottom);
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route.query.tab": {
      handler() {
        this.tab = this.$route.query.tab || "share";
        this.page = 1;
        this.$store.state.topics = [];
        this.activeName=this.tab;
        this.getTopics();
      },
    },
  },
  components: {
    Mini,
  },
};
</script>
<style lang="less">
    .main{
        align-items:center;
        background-color: #e1e1e1;
        height: 100%;
       .el-tabs {
           width: 90%;
       }
   }
</style>