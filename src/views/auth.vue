<template>
  <div class="auth">
    <HeadLogo />
    <div class="auth-wrapper">
    	<mt-field label="用户名" placeholder="请输入用户名" v-model="users.userName"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="users.password"></mt-field>
      <mt-button size="large" plain type="primary" @click="login">登录</mt-button>
      <p class="tip">若为未注册过的新用户，登录即为注册</p>
    </div>
    
  </div>
</template>

<script>
  import HeadLogo from '@/components/header/HeadLogo'
  
  export default {
    components: {
      HeadLogo
    },
    data() {
      return {
        users: {
         userName: '',
          password: '' 
        }
      }
    },
    methods: {
      login() {
        this.$store.commit('login', this.users)
      }
    }
  }
</script>

<style scoped="scoped">
  .auth {
    overflow: hidden;
  }
  .auth-wrapper {
    margin-top: .5rem;
  }
  .tip {
    font-size: .14rem;
    text-align: center;
    height: .5rem;
    line-height: .5rem;
  }
  /*.auth-wrapper button {
    margin-top: .2rem;
  }*/
</style>