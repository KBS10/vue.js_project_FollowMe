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
        <td>{{ info.resident_number }}</td>
        <td>{{ info.phone_number }}</td>
        <td><v-btn @click="getPatientInfo(info.patient_id)">클릭</v-btn></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from "../../utils/bus";
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
          console.log(response);
          if (response.data.error == "Unauthorized") {
            alert("사용자의 권한이 없습니다");
          }
          this.$store.state.patient_Info.clinic.clinic_id = response.data.clinic.clinic_id;
          this.$store.state.patient_Info.clinic.clnic_subject_name = response.data.clinic.clnic_subject_name;
          this.$store.state.patient_Info.clinic.clinic_time = response.data.clinic.clinic_time;
          this.$store.state.patient_Info.clinic.doctor_name = response.data.clinic.doctor_name;

          this.$store.state.patient_Info.patient.patient_id =
            response.data.patient.patient_id;
          this.$store.state.patient_Info.patient.patient_name =
            response.data.patient.patient_name;
          this.$store.state.patient_Info.patient.resident_number =
            response.data.patient.resident_number;
          this.$store.state.patient_Info.patient.postal_code =
            response.data.patient.postal_code;
          this.$store.state.patient_Info.patient.address =
            response.data.patient.address;
          this.$store.state.patient_Info.patient.detail_address =
            response.data.patient.detail_address;
          this.$store.state.patient_Info.patient.phone_number =
            response.data.patient.phone_number;
          this.$store.state.patient_Info.patient.notes =
            response.data.patient.notes;
          this.$store.state.patient_Info.clinic_info =
            response.data.clinic_info;

          this.$store.state.checkPatientFlow = true;
          this.searchHospitalInfo();
          this.$emit("close");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    searchHospitalInfo() {
      EventBus.$emit(
        "searchHospitalInfo",
        this.$store.state.patient_Info.clinic_info
      );
    },
  },
};
</script>
