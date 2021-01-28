<template>
  <div class="user_container Join">
    <form class="join_form" @submit.prevent>
      <div class="row_group">
        <h1 class="blind">회원가입</h1>
        <div class="join_row">
          <label for="email" id="join_title">email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email를 입력해주세요"
            v-model="email"
          />
        </div>
        <div class="join_row">
          <label for="pswd1" id="join_title">비밀번호</label>
          <input
            type="password"
            name="pswd1"
            id="pswd1"
            placeholder="비밀번호를 입력해주세요"
            v-model="password"
          />
        </div>
        <div class="join_row">
          <label for="pswd2" id="join_title">비밀번호 재확인</label>
          <input
            type="password"
            name="pswd2"
            id="pswd2"
            placeholder="비밀번호를 재입력해주세요"
            v-model="password_confirmation"
          />
        </div>
      </div>
      <div class="row_group">
        <div class="join_row">
          <label for="name" id="join_title">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="이름을 입력해주세요"
            v-model="name"
          />
        </div>
        <div class="join_row">
          <label for="unique_number" id="join_title">의료진 고유 번호 </label>
          <input
            type="text"
            name="unique_number"
            id="unique_number"
            placeholder="의료진 고유 번호를 입력해주세요"
            v-model="unique_number"
          />
        </div>
        <div class="join_row">
          <label for="phone_number" id="join_title">휴대전화</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            placeholder="휴대폰번호를 입력해주세요"
            v-model="phone_number"
          />
        </div>
      </div>
      <div class="button_area">
        <button class="btn_type btn_primary" @click="signup()">가입하기</button>
        <button class="btn_type btn_primary" @click="go_back()">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "UserLogin",
  data() {
    return {
      email: null,
      password: null,
      password_confirmation: null,
      name: null,
      unique_number: null,
      phone_number: null
    };
  },
  methods: {
    signup() {
      // axios
      //   .post("http://172.26.3.122:8000/api/auth/register", {
      //     email: this.email,
      //     password: this.password,
      //     password_confirmation: this.password_confirmation,
      //     name: this.name,
      //     unique_number: this.unique_number,
      //     phone_number: this.phone_number
      //   })
      //   .then(response => {
      //     console.log(response);
      // this.$router.replace("/login");
      //   })
      //   .catch(err => {
      //     alert(err);
      //   });
      alert("회원가입이 완료되었습니다.");
      this.$router.replace("/login");
    },
    go_back() {
      this.$router.replace("/login");
    }
  }
};
</script>
