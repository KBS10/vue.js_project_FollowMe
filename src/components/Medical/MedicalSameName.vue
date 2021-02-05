<template>
  <div class="MedicalSameName">
    <h1>환자 검색</h1>
    <table class="medicalSameName Table">
      <tr>
        <td style="width: 100px">환자 번호</td>
        <td style="width: 100px">성명</td>
        <td style="width: 100px">생년월일</td>
        <td style="width: 100px">전화번호</td>
        <td style="width: 50px">클릭</td>
      </tr>
      <tr v-for="info in this.$store.state.patient_list" :key="info.patient_id">
        <td>{{ info.patient_id }}</td>
        <td>{{ info.patient_name }}</td>
        <td>{{ info.phone_number }}</td>
        <td>{{ info.resident_number }}</td>
        <td><v-btn @click="getPatientInfo(info.patient_id)">클릭</v-btn></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({}),
  created() {},
  methods: {
    getPatientInfo(value) {
      const url = this.$store.state.url + "/api/medical/patient_select";
      axios
        .post(
          url,
          { patient_id: value },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error == "Unauthorized") {
            alert("사용자의 권한이 없습니다");
          }
          this.$store.state.patient_Info = response.data;
          console.log(this.$store.state.patient_Info)
          this.$emit("close");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
