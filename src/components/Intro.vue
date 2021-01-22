<template>
  <div class="container intro">
    <h1 class="intro_title">Welcome to Follow Me</h1>
    <div class="intro_button_area">
      <router-link :to="{ name: 'Login' }" class="intro_router">
        <img src="../img/admin.png" width="300px" />
        <div class="AdminWords">관리자</div>
      </router-link>
      <router-link :to="{ name: 'Login' }" class="intro_router">
        <img src="../img/nurse.png" width="300px" />
        <div class="MedicalWords">의료진</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Intro"
};
</script>
