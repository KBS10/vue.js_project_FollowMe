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
      <input class="medical_patient_input" v-model="patient_name" />
      <v-btn class="medical_search" @click="patientSearch()"> 검색 </v-btn>
      <v-btn class="medical_register" @click="moveRegisterPopup()"
        >환자 등록
      </v-btn>
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
import MedicalPopup from "../components/Medical/MedicalPopup";
import axios from "axios";
import MedicalSameNameVue from "../components/Medical/MedicalSameName.vue";
export default {
  name: "MedicalPage",
  components: {
    MedicalInfo,
    MedicalReceipt,
    MedicalHistory,
  },
  data: () => ({
    patient_name: "",
  }),
  methods: {
    patientSearch() {
      const url = this.$store.state.url + "/api/medical/patient_search";
      axios
        .post(
          url,
          { patient_name: this.patient_name },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((response) => {
          this.$store.state.patient_list = [];
          if (response.data.error == "Unauthorized") {
            alert("사용자의 권한이 없습니다");
          }
          this.$store.state.patient_list = response.data.patient_list;
          this.$modal.show(
            MedicalSameNameVue,
            {
              modal: this.$modal,
            },
            {
              width: "500px",
              height: "600px",
              draggable: true,
            }
          );
        })
        .catch(function (error) {
          console.log(error);
          alert("등록된 환자가 없습니다");
        });
    },
    moveRegisterPopup() {
      this.$modal.show(
        MedicalPopup,
        {
          modal: this.$modal,
        },
        {
          width: "500px",
          height: "600px",
          draggable: true,
        }
      );
    },
  },
};
</script>
<style>
@import url("../css/Medical.css");
</style>
