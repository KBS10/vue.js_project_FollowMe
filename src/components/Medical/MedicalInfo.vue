<template>
  <div class="MedicalInfo">
    <h2>환자 인적 사항</h2>

    <table class="medicalInfo_top_table">
      <tr>
        <td>환자 번호</td>
        <td>
          <div class="medicalInfo_number" style="width: 150px; height: 25px">
            {{ $store.state.patient_Info.patient.patient_id }}
          </div>
        </td>
      </tr>
      <tr>
        <td>환자 성명</td>
        <td>
          <div class="medicalInfo_name" style="width: 150px; height: 25px">
            {{ $store.state.patient_Info.patient.patient_name }}
          </div>
        </td>
      </tr>
      <tr>
        <td>주민 번호</td>
        <td>
          <div
            class="medicalInfo_frontSecurityNumber"
            style="width: 150px; height: 25px"
          >
            {{ $store.state.patient_Info.patient.resident_number }}
          </div>
        </td>
      </tr>
      <tr>
        <td>우편 번호</td>
        <td>
          <div
            class="medicalInfo_postNumber"
            style="width: 200px; height: 25px"
          >
            {{ $store.state.patient_Info.patient.postal_code }}
          </div>
        </td>
      </tr>
      <tr>
        <td>주 소</td>
        <td>
          <div class="medicalInfo_address" style="width: 300px; height: 25px">
            {{ $store.state.patient_Info.patient.address }}
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <div
            class="medicalInfo_detailAddress"
            style="width: 300px; height: 25px"
          >
            {{ $store.state.patient_Info.patient.detail_address }}
          </div>
        </td>
      </tr>
      <tr>
        <td>전화 번호</td>
        <td>
          <div class="medical_telNumber" style="width: 300px; height: 25px">
            {{ $store.state.patient_Info.patient.phone_number }}
          </div>
        </td>
      </tr>
      <tr>
        <td>참고 사항</td>
        <td>
          <div class="medical_note" style="width: 300px; height: 100px">
            {{ $store.state.patient_Info.patient.notes }}
          </div>
        </td>
      </tr>
    </table>

    <div v-switch="$store.state.checkPatientFlow">
      <div v-case="true">
        <v-btn @click="checkPatientFlow()">이전 진료동선 확인</v-btn>
      </div>
      <div v-case="false"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({}),
  mounted() {},
  methods: {
    checkPatientFlow() {
      this.$store.state.checkMedicalRoute = true;
      console.log(this.$store.state.patient_Info.patient.patient_id);
      axios
        .post(
          this.$store.state.url + "/api/medical/flow_list",
          {
            patient_id: this.$store.state.patient_Info.patient.patient_id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((res) => {
          for (let i = 0; i < res.data.flow.length; i++) {
            this.$store.state.rooms.push(res.data.flow[i].room_location);
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
