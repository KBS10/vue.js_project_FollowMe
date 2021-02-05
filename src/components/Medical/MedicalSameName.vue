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
      <tr v-for="info in this.patient_Info" :key="info.patient_id">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><v-btn @click="getPatientInfo()">클릭</v-btn></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { EventBus } from "../../utils/bus";
export default {
  data: () => ({
    patient_Info: [],
  }),
  mounted() {
    EventBus.$on("patient_name", function (value) {
      console.log("data! ", value);
    });
  },
  methods: {
    getPatientInfo() {
      console.log("hi");
    },
  },
};
</script>
