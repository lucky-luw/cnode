<template>
        <el-container class="main">
            <div class="contain">
                <!-- 侧边 -->
                <div class="aside" @click="toUser(result.author.loginname)">
                    <el-card shadow="hover" style="text-align: center;cursor:pointer; ">
                        <img :src="result.author.avatar_url" style="width: 70%; height: auto; ">
                        <h4>{{result.author.loginname}}</h4>
                    </el-card>
                </div>
                <!-- markdown文章 -->
                <div class="article">
                    <el-card>
                        <div slot="header">
                            <h3>{{result.title}}</h3>
                            <div>
                                <span>创建于：{{formatTime(result.create_at)}}</span>
                                <span>最后编辑于：{{formatTime(result.last_reply_at)}}</span>
                                <span class="tip" v-if="tab">{{tab}}</span>
                                <span class="tip" v-if="result.top">置顶</span>
                                <span class="tip" v-if="result.good">精华</span>
                            </div>
                        </div>
                        <div  class="markdown-body">
                            <VueMarkdown :source="result.content"  v-highlight></VueMarkdown>
                        </div>
                    </el-card>
                </div>
                <!-- 底下的评论 -->
                <div class="reply">
                    <el-card>
                        <div slot="header">
                            <h4>{{replies.length}}条评论</h4>
                        </div>
                        <div>
                            <ul v-for="item in replies" :key="item.id">
                                <li>
                                    <div class="user">
                                        <el-image :src="item.author.avatar_url" class="i" @click.native="toUser(item.author.loginname)"></el-image>
                                        <span>{{item.author.loginname}}</span>
                                    </div>
                                    <div class="content">
                                        <div  class="markdown-body">
                                            <VueMarkdown :source="item.content"  v-highlight></VueMarkdown>
                                        </div>
                                        <h5>{{formatTime(item.create_at)}}</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
    name:'Article',
    data(){
        return {
            isLoading:false,
            error:'',
            result:'',
            replies:[]
        }
    },
    components: {
        VueMarkdown // 注入组件，使markdown渲染为html
    },
    props:["id"],//路由参数
    mounted(){
        this.getArticle()
    },
    methods: {
        //初始化数据
        async getArticle(){
            this.isLoading=true
            try{
                let result=await this.$API.requestArticle(this.id)
                console.log(result)
                this.result=result.data
                this.replies=result.data.replies
                this.isLoading=false
            }catch(error){
                this.error=error.toString()
            }
        },
        // 格式化时间
        formatTime(timeString){
            return this.$moment(timeString).format('YYYY-MM-DD HH:mm:ss')
        },
        //路由跳转
        toUser(loginname){
            this.$router.push({path:`/user/${loginname}`})
        }
    },
    computed:{
        tab(){
            switch (this.result.tab) {
                case "share": return "分享"
                case "job": return "招聘"
                case "good": return "精华"
                case "ask": return "问答"
                default: return ""
            }
        }
    }
}

</script>

<style lang="less" scoped>
    @media screen and (max-width:640px) {
        .aside {
            display:none;
        }
    }
    .main{
        width: 100%;
        max-width: 1400px;
        min-width: 640px;
        height: 100%;
        justify-content:center;
    }
    .contain{
        width: 90%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
  
    .article{
        width: 80%;
        h3 {
            font-size:22px;
        }
        span {
            display: inline-block;
            margin: 0 10px;
            color:rgb(173, 171, 171);
            &:first-child{
                margin-left: 0;
            }
        }
        .tip{
            width: 35px;
            height: 20px;
            text-align: center;
            color:white;
            line-height: 20px;
            background-color: rgb(29, 111, 210);
        }
    }
    .aside {
        width: 19%;
        margin-right: 1%;
    }
    .reply{
        width: 100%;
        margin-top: 20px;
        .user {
            width: 15%;
            text-align: center;
            span{
                display: block;
                padding-top: 2px;
            }
            .i{
                cursor: pointer;
                width: 35px;
                height: auto;
                transition: all 0.6s;//过渡效果
            }
            .i:hover{
                transform:scale(1.2);//等比放大1.2倍
            }
        }  
        .content{
            width: 80%;
            h5 {
                color: rgb(173, 171, 171);
                font-size: 400;
            }
        }
    }
    ul {
        margin: 0;
        padding:0;
        padding-bottom: 5px;
    }
    li {
        list-style:none;
        display: flex;
        justify-content: space-around;
    }

</style>

