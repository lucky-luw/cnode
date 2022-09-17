<template>
    <el-container>
        <el-header height="300px" class="header">
            <div>
                <router-link to="" >
                    <img src="../assets/cnodejs_light.svg">
                </router-link>
                <el-input v-model="keyWord" placeholder="输入查询关键字并回车，此功能因接口问题无法使用" focus="false" ></el-input>
            </div>
    </el-header>
</el-container>
  
</template>

<script>
export default {
    name:'Header',
    data() {
        return {
            keyWord: '',
        };
    },
}
</script>

<style lang="less" scoped>
    .header {
        width: 100%;
        text-align: center;
        background-color:#444;
        overflow: auto;
        div{
            margin-top: 80px;
            h1 {
                color: #fff;
                font-size: 30px;
            }
            img{
                max-width: 300px;
                cursor: pointer;
            }
            &/deep/ .el-input__inner{
              border: 1px solid rgba(0,0,0,.8);
              width: 90%;
            }
        }
    }
</style>