<template>
    <ul class="topic" v-if="topics.length">
        <li v-for="(item,index) in topics" :key="index">
            <el-row :gutter="15" class="cell" type="flex">
                <el-col :span="4">
                <div class="user" @click="toUserInfo(item.author.loginname)">
                    <img
                    :src="item.author.avatar_url"
                    style="width: 40px; height: auto"
                    />
                    <h4>{{ item.author.loginname }}</h4>
                </div>
                </el-col>
                <el-col :span="14">
                <div class="title">
                    <h3 @click="toArticle(item.id)">{{ item.title }}</h3>
                    <h4  v-if="item.create_at">创建于：{{item.create_at | formateTime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    <h4  v-if="item.last_reply_at">更新于：{{item.last_reply_at | formateTime}}</h4>
                </div>
                </el-col>
                <el-col :span="3" >
                    <div class="data" v-if="item.visit_count!==undefined">
                        <div>浏览数</div>
                        <div style="color: rgba(0, 0, 0, 0.8)">{{ item.visit_count }}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="data" v-if="item.reply_count!==undefined">
                        <div>评论数</div>
                        <div style="color: rgba(0, 0, 0, 0.8)">{{ item.reply_count }}</div>
                    </div>
                </el-col>
            </el-row>
        </li>
    </ul>
</template>

<script>
export default {
    name:'mini',
    props:["topics"],
    methods: {
        toArticle(id){
            this.$router.push({path:`/article/${id}`})
        },
        toUserInfo(loginname){
            this.$router.push({path:`/user/${loginname}`})
        }
    },
}
</script>

<style lang="less" scoped>
    ul {
        padding: 0;
    }
    li {
        overflow: hidden;
        list-style: none;
        &:hover{
            background-color: rgb(235, 237, 238);
        }
    }
    .topic {
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
    }
    .user {
        padding-top: 10px;
        text-align: center;
        cursor: pointer;
    }
    .title {
        margin-top: 10px;
        h3 {
            cursor: pointer;
        }
        h4 {
            margin-top: 30px;
            display:inline-block;
        }
    }
    .data {
        display: flex;
        flex-direction: column;
        margin-top: 15%;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        border: 1px solid rgba(1, 1, 1, 0.13);
        align-items: center;
        justify-content: space-evenly;
        color: rgb(169, 168, 168);
        font-size: 12px;
    }
    h4 {
        font-weight: normal;
        font-size: 12px;
        color: rgb(169, 168, 168);
    }
    h3 {
        font-weight: normal;
        font-size: 16px;
    }
</style>

