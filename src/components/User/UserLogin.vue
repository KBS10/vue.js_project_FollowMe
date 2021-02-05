<template>
  <div class="user_container login">
    <form class="login_form" @submit.prevent>
      <div class="blind">Sign In</div>
      <div class="join_row">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          v-model="email"
        />
      </div>
      <div class="join_row">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          v-model="password"
        />
      </div>
      <div class="button_area">
        <button class="btn_type btn_primary" @click="login()">Sign in</button>
        <div class="join_signup">
          <p>회원가입을 아직 하지 않으셨습니까?</p>
          <router-link :to="{ name: 'Join' }">
            <a>회원가입</a>
          </router-link>
        </div>
        <!-- <button class="btn_type btn_primary" @click="logout()">로그아웃</button> -->
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserLogin",
  data() {
    return {
      email: null,
      password: null,
      token: null,
    };
  },
  methods: {
    login() {
      axios
        .post( this.$store.state.url + "/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data.role == 1) {
            this.$router.replace("/admin");
          } else if (response.data.role == 2) {
            this.$router.replace("/medical");
          }
          this.$cookie.set("accesstoken", response.data.token, 1);

          axios.defaults.headers.common["x-access-token"] = response.data.token;
          alert("Welcome");
        })
        .catch((err) => {
          console.log(err);
          alert("아이디와 비밀번호가 잘못되었습니다. ");
        });
    },
    join() {},
    logout() {
      axios
        .post( this.$store.state.url + "/api/auth/logout", [], {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.$cookie.delete("accesstoken");
          this.isCookie = document.cookie;
          alert("로그아웃이 완료되었습니다");
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
  },
};
</script>
