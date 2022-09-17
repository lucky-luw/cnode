<template>
    <el-container direction="vertical" class="big">
        <div class="contain">
            <!--  -->
            <el-card class="user">
                <div slot="header">
                    {{loginname}}的个人信息
                </div>
                <div>
                    <div class="head">
                        <el-image :src="result.avatar_url" style="width:50px;height:auto;min-width:40px; " />
                        <div>
                            <span>用户名：{{loginname}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <span>积分：{{result.score}}</span>
                        </div>
                    </div>
                    <div class="user_body">
                        <span>github: {{loginname}}</span>
                        <el-divider content-position="left"></el-divider>
                        <i class="el-icon-location-outline"></i>
                        <span>地址:接口无提供</span>
                        <el-divider content-position="left" ></el-divider>
                        <i class="el-icon-s-home"></i>
                        <span>博客:接口无提供</span>
                        <el-divider content-position="right"></el-divider>
                         <i class="el-icon-s-promotion"></i>
                        <span>微博:接口无提供</span>
                        <el-divider content-position="right"></el-divider>
                    </div>
                </div>
            </el-card>
            <!--  -->
            <el-card style="transiton: 0.8s all;">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="创建的主题" style="transiton: 0.8s all;">
                        <Mini :topics="recent_topics"/>
                    </el-collapse-item>
                    <el-collapse-item title="互动的主题" style="transiton: 0.8s all;">
                        <Mini :topics="recent_replies"/>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </div>
    </el-container>
</template>

<script>
import Mini from './mini.vue'
export default {
    name:'user',
    data() {
        return {
            recent_topics:[],
            recent_replies:[],
            result:null,
            activeNames:[]
        };
    },
    components:{
        Mini
    },
    props:["loginname"],
    methods: {
        async getUserInfo(){
            try {
                const result=await this.$API.reqUser(this.loginname)
                if(result.success){
                    this.result=result.data
                    this.recent_topics=result.data.recent_topics
                    this.recent_replies=result.data.recent_replies
                }else{
                    this.$message('获取信息失败')
                }
            } catch (error) {
                this.$message("请求出错，请重试")
            }
        }
    },
    mounted() {
        this.getUserInfo()
    },
    watch: {
        "$route.params.loginname":{
            handler(){
                this.result=null
                this.recent_topics=[]
                this.recent_replies=[]
                this.activeNames=[]
                this.getUserInfo()
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .big {
        align-items:center;
    }
    .contain{
        width: 90%;
       
    }
    .user{
        margin-bottom: 20px;
    }
    .head{
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .el-divider--horizontal {
        margin:15px 0;
    }
</style>

