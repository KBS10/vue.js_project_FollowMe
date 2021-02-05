<template>
  <div class="medicalPopup">
    <h1>환자 등록하기</h1>
    <table class="medicalInfo_top_table">
      <tr>
        <td>환자 번호</td>
        <td>
          <input
            class="medicalInfo_number"
            style="width: 150px; height: 25px"
            v-model="patient_id"
            required
          />
        </td>
      </tr>
      <tr>
        <td>환자 성명</td>
        <td>
          <input
            class="medicalInfo_name"
            style="width: 150px; height: 25px"
            v-model="patient_name"
            required
          />
        </td>
      </tr>
      <tr>
        <td>주민 번호</td>
        <td>
          <input
            class="medicalInfo_frontSecurityNumber"
            style="width: 100px; height: 25px"
            v-model="resident_number1"
            required
          />
          -
          <input
            class="medicalInfo_backSecurityNumber"
            style="width: 100px; height: 25px"
            v-model="resident_number2"
            required
          />
        </td>
      </tr>
      <tr>
        <td>우편 번호</td>
        <td>
          <input
            class="medicalInfo_postNumber"
            style="width: 200px; height: 25px"
            v-model="postal_code"
            required
          />
        </td>
      </tr>
      <tr>
        <td>주 소</td>
        <td>
          <input
            class="medicalInfo_address"
            style="width: 300px; height: 25px"
            v-model="address"
            required
          />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input
            class="medicalInfo_detailAddress"
            style="width: 300px; height: 25px"
            v-model="detail_address"
            required
          />
        </td>
      </tr>
      <tr>
        <td>전화 번호</td>
        <td>
          <input
            class="medical_telNumber"
            style="width: 300px; height: 25px"
            v-model="phone_number"
            required
          />
        </td>
      </tr>
      <tr>
        <td>참고 사항</td>
        <td>
          <input
            class="medical_note"
            style="width: 300px; height: 100px"
            v-model="notes"
          />
        </td>
      </tr>
    </table>
    <v-btn class="btn-primary btn" @click="register()">환자 등록하기</v-btn>
    <v-btn class="btn-primary btn" @click="$emit('close')">취 소</v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    patient_id: "",
    patient_name: "",
    resident_number1: "",
    resident_number2: "",
    postal_code: "",
    address: "",
    detail_address: "",
    phone_number: "",
    notes: "",
  }),
  methods: {
    register() {
      const url = this.$store.state.url + "/api/medical/patient_create";
      const patient_Info = {
        patient_id: this.patient_id,
        patient_name: this.patient_name,
        resident_number: this.resident_number1 + "-" + this.resident_number2,
        postal_code: this.postal_code,
        address: this.address,
        detail_address: this.detail_address,
        phone_number: this.phone_number,
        notes: this.notes,
      };
      console.log(patient_Info)
      axios
        .post(url, patient_Info, {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          if (response.data.error == "Unauthorized") {
            alert("사용자의 권한이 없습니다");
          }
          alert(response.message);
          this.$emit("close");
        })
        .catch(function (error) {
          console.log(error);
          alert("환자가 등록되지 못하였습니다.");
        });
    },
  },
};
</script>
