<template>
  <div class="JoinPage">
    <UserJoin></UserJoin>
  </div>
</template>
<script>
import UserJoin from "@/components/User/UserJoin.vue";

export default {
  name: "JoinPage",
  components: {
    UserJoin
  }
};
</script>

<style>
@import url("../css/USER.css");
</style>
