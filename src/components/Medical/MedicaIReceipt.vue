<template>
  <div class="MedicalReceipt">
    <h2>외래 접수</h2>

    <table class="medicalReceipt_table">
      <tr>
        <td>진료 과목</td>
        <td>
          <select
            class="medicalreceipt_clinic"
            name="select"
            style="width: 200px; height: 25px"
            v-model="clinic_subject_name"
          >
            <option value="정신과">정신과</option>
            <option value="이비인후과">이비인후과</option>
            <option value="정형외과">정형외과</option>
            <option value="비뇨기과">비뇨기과</option>
          </select>
        </td>
        <td>진료실</td>
        <td>
          <select
            class="medicalreceipt_subject"
            name="select"
            style="width: 200px; height: 25px"
            v-model="room_name"
          >
            <option value="진료실1">진료실1</option>
            <option value="진료실2">진료실2</option>
            <option value="진료실3">진료실3</option>
            <option value="진료실4">진료실4</option>
            <option value="진료실5">진료실5</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>초재 구분</td>
        <td>
          <select
            class="medicalreceipt_division"
            name="select"
            style="width: 200px; height: 25px"
            v-model="first_category"
          >
            <option value="초진">초진</option>
            <option value="재진">재진</option>
          </select>
        </td>
        <td>담당 의사</td>
        <td>
          <select
            class="medicalreceipt_doctor"
            name="select"
            style="width: 200px; height: 25px"
            v-model="doctor_name"
          >
            <option value="김범수">김범수</option>
            <option value="변희주">변희주</option>
            <option value="신천은">신천은</option>
            <option value="이주용">이주용</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>진료시간</td>
        <td>
          {{ myTime }}
        </td>
        <td>수납 금액</td>
        <td>
          <div
            class="medicalreceipt_totalPrice"
            style="width: 200px; height: 25px"
          >
            <input v-model="storage" />
          </div>
        </td>
      </tr>
    </table>
    <div class="button_array">
      <v-btn
        class="btn_receipt"
        @click="setClinic($store.state.patient_Info.patient.patient_id)"
        >접수</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      room_name: "진료실1",
      clinic_subject_name: "정신과",
      doctor_name: "김범수",
      first_category: "초진",
      storage: 0,
      myTime: "00:00:00",
    };
  },
  mounted() {
    var date = new Date();
    this.myTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  },
  methods: {
    setClinic(value) {
      const url = this.$store.state.url + "/api/medical/clinic_setting";
      axios
        .post(
          url,
          {
            patient_id: value,
            clinic_subject_name: this.clinic_subject_name,
            room_name: this.room_name,
            doctor_name: this.doctor_name,
            storage: this.storage,
            clinic_time: this.myTime,
          },
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
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
