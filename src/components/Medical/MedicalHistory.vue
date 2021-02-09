<template>
  <div class="MedicalHistory">
    <h2>진료 내역</h2>
    <div class="medicalhistory_historyHeader">
      <input class="medicalhistory_date" type="date" v-model="mydate" />

      진료 여부

      <div class="mdeicalhistory_choose">
        <input type="radio" id="history_radioTotal" />
        <label for="history_radioTotal">전체</label>
        <input type="radio" id="history_radioComplete" />
        <label for="history_radioComplete">완료</label>
        <input type="radio" id="history_radioWait" />
        <label for="history_radioWait">대기</label>
      </div>

      <v-btn @click="setClinic()">조회</v-btn>
    </div>

    <table class="medicalhistory_table">
      <tr>
        <td>환자번호</td>
        <td>성명</td>
        <td>진료과목</td>
        <td>진료실</td>
        <td>담당의사</td>
        <td>시간</td>
        <td>진료종료</td>
      </tr>
      <tr v-for="info in this.clinic_record" :key="info.clinic_id">
        <td>{{ info.patient_id }}</td>
        <td>{{ info.patient.patient_name }}</td>
        <td>{{ info.clinic_subject_name }}</td>
        <td>{{ info.room_name }}</td>
        <td>{{ info.doctor_name }}</td>
        <td>{{ info.clinic_time }}</td>
        <td><v-btn @click="endClinic(info.patient_id)">종료</v-btn></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      clinic_record: [],
      mydate: new Date().toISOString().substring(0, 10)
    };
  },
  mounted() {},
  methods: {
    endClinic(value) {
      const url = this.$store.state.url + "/api/medical/clinic_end";
      axios
        .post(
          url,
          {
            patient_id: value
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken")
            }
          }
        )
        .then(response => {
          if (response.data.error == "Unauthorized") {
            alert("사용자의 권한이 없습니다");
          }
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setClinic() {
      const url = this.$store.state.url + "/api/medical/clinic_record";
      axios
        .post(
          url,
          {
            clinic_date: this.mydate
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken")
            }
          }
        )
        .then(response => {
          if (response.data.error == "Unauthorized") {
            alert("사용자의 권한이 없습니다");
          }
          this.clinic_record = response.data.clinic_record;
          console.log(this.clinic_record);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
