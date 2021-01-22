<template>
  <div class="LoginPage">
    <UserLogin></UserLogin>
  </div>
</template>
<script>
import UserLogin from "@/components/User/UserLogin.vue";

export default {
  name: "LoginPage",
  components: {
    UserLogin
  }
};
</script>

<style>
@import url("../css/USER.css");
</style>
