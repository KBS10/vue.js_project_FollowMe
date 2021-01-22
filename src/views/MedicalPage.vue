<template>
  <div class="MedicalPage">
    <div class="user_container medical">
      <router-link :to="{ name: 'Medical' }">
        <img
          src="../img/logo.png"
          class="medical_logo"
          width="200"
          height="50"
        />
      </router-link>
      <h1 class="medical_title">Follow Me Medical Web</h1>
    </div>

    <div class="user_container_header">
      <p class="medical_patient_search">환자 검색</p>
      <input class="medical_patient_input" />
      <v-btn class="medical_search"> 검색 </v-btn>
    </div>
    <div class="medical_content">
      <div class="medical_Info">
        <MedicalInfo />
      </div>
      <div class="medical_Receipt">
        <MedicalReceipt />
      </div>
      <div class="medical_History">
        <MedicalHistory />
      </div>
    </div>
  </div>
</template>
<script>
import MedicalInfo from "../components/Medical/MedicalInfo";
import MedicalReceipt from "../components/Medical/MedicaIReceipt";
import MedicalHistory from "../components/Medical/MedicalHistory";

export default {
  name: "MedicalPage",
  components: {
    MedicalInfo,
    MedicalReceipt,
    MedicalHistory
  }
};
</script>
<style>
@import url("../css/Medical.css");
</style>
