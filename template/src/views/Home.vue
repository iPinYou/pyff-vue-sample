<template>
    <py-row class="tac container">
        <py-col :span="24" class="header">
            <py-col :span="4" class="logo">
                品友模板
            </py-col>
            <py-col :span="12">
                <py-menu class="py-menu-demo" :default-active=topMenuActive mode="horizontal" background-color="#324157"
                         text-color="#bfcbd9"
                         active-text-color="#20a0ff">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <py-menu-item :index=item.name @click="$router.push(item.path)"><i :class="item.iconCls"></i>{{item.menuName}}</py-menu-item>
                    </template>
                </py-menu>
            </py-col>
            <py-col :span="2" class="userinfo">
                <py-dropdown trigger="hover">
                    <span class="py-dropdown-link userinfo-inner"><i class="fa fa-user-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <py-dropdown-menu slot="dropdown">

                        <py-dropdown-item>我的消息</py-dropdown-item>
                        <py-dropdown-item>设置</py-dropdown-item>
                        <py-dropdown-item>文档</py-dropdown-item>
                        <py-dropdown-item divided @click.native="logout">退出登录</py-dropdown-item>
                    </py-dropdown-menu>
                </py-dropdown>
            </py-col>
            <py-col :span="1" class="userinfo">
                <i class="fa fa-bell-o" style="font-size:20px;"></i>
            </py-col>
            <py-col :span="4" class="userinfo">
                <py-input placeholder="请输入搜索关键词..." suffix-icon="search"></py-input>
            </py-col>
            <!--<py-col :span="2" class="userinfo">-->
            <!--<py-button type="text">中文</py-button> /<py-button type="text" style="color:#bfcbd9;">En</py-button>-->
            <!--</py-col>-->
        </py-col>
        <py-col :span="24" class="main">
            <aside class="py-col py-col-4">
                <!--导航菜单-->
                <py-menu :default-active="leftMenuActive" class="py-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
                         background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened >
                    <template>
                        <py-menu-item v-for="(item,index) in leftMenus" v-if="!item.hidden" :index="item.name" :key="item.index" @click="$router.push(item.path)" >{{item.menuName}}</py-menu-item>
                    </template>
                </py-menu>
            </aside>
            <section class="py-col py-col-20 content-container">
                <div class="grid-content bg-purple-light">
                    <py-col :span="24" class="breadcrumb-container">
                        <py-breadcrumb separator="/" class="breadcrumb-inner">
                            <py-breadcrumb-item v-for="item,i in breadcrumbs" :to="{ path: item.path }" :key="item.index">
                                {{ item.menuName }}
                            </py-breadcrumb-item>
                        </py-breadcrumb>
                        <!--<strong class="title">{{$route.name}}</strong>-->
                    </py-col>
                    <py-col :span="24" class="content-wrapper">
                        </transition>
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>

                    </py-col>
                </div>
            </section>
        </py-col>
    </py-row>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { logout } from '../api/api';
    export default {
        data() {
            return {
            };
        },
        computed: {
            ...mapGetters({
                topMenuActive: 'getTopMenuActive',
                leftMenuActive: 'getLeftMenuActive',
                leftMenus: 'getLeftMenus',
                breadcrumbs: 'getBreadcrumbs',
            }),
        },
        methods: {
            // 退出登录
            logout() {
                let _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    // type: 'warning'
                }).then(() => {
                    requestLogout();
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                });
            },
            handleopen() {
                // console.log('handleopen');
            },
            handleclose() {
                // console.log('handleclose');
            },
            handleselect(a, b) {
            },
        }
    }
</script>

<style scoped>
    .container{
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    .header{
        height: 60px;
        line-height: 60px;
        background: #324157;
        color:black;
        width:100%;
    .py-menu{
    .py-menu-item.is-active{
        border-bottom: 5px solid #20a0ff;
    }
    }
    .py-menu-demo i{
        font-size:16px;
    }
    .logo{
        border-color: #CCCCCC;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        /*border-color: #f0f0f0;*/
        /*border-right-width: 1px;*/
        /*border-right-style: solid;*/
        color:#fff;
    }
    .userinfo{
        text-align: right;
        float: right;
        color:#fff;
    .userinfo-inner {
        cursor: pointer;
    i{
        color:#fff;
        font-size:20px;
    }
    }
    }
    }
    }
    .main {
        overflow: hidden;
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
    aside {
    .py-menu{
        height:100%;
        width:100%;
        /*background-color: #e9e9e9;*/
    }
    }
    .content-container{
        overflow-y: auto;
        padding:10px;
        background-color: #f0f0f0;
    }
    }
</style>
