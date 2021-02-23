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
            @click="findRoom_name(clinic_subject_name)"
          >
            <option
              placeholder="진료 과목"
              v-for="(clinicSubjectName, i) in hospital_clinicSubjectName"
              :key="i"
            >
              {{ clinicSubjectName }}
            </option>
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
            <option
              placeholder="진료실"
              v-for="(roomName, i) in hospital_roomName"
              :key="i"
            >
              {{ roomName }}
            </option>
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
            <option
              placeholder="담당 의사"
              v-for="(doctor_name, i) in hospital_doctor_name"
              :key="i"
            >
              {{ doctor_name }}
            </option>
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
import { EventBus } from "../../utils/bus";
import axios from "axios";
export default {
  data: () => {
    return {
      clinic_subject_name: "",
      room_name: "",
      doctor_name: "",
      first_category: "초진",
      storage: null,
      myTime: "",
      hospital_Info: [],
      hospital_clinicSubjectName: [],
      hospital_roomName: [],
      hospital_doctor_name: [],
    };
  },
  mounted() {
    this.current_time();
    EventBus.$on("searchHospitalInfo", (data) => {
      this.hospital_Info = data;
      for (let i = 0; i < data.length; i++) {
        this.hospital_clinicSubjectName[i] = data[i].clinic_subject_name;
      }
    });
  },
  methods: {
    findRoom_name(data) {
      console.log(data);
      this.hospital_roomName = [];
      this.hospital_doctor_name = [];
      for (let i = 0; i < this.hospital_Info.length; i++) {
        if (data == this.hospital_Info[i].clinic_subject_name) {
          for (let k = 0; k < this.hospital_Info[i].clinic_room.length; k++) {
            this.hospital_roomName[k] = this.hospital_Info[i].clinic_room[k];
          }
          for (let j = 0; j < this.hospital_Info[i].doctor.length; j++) {
            this.hospital_doctor_name[j] = this.hospital_Info[i].doctor[j];
            // console.log(this.hospital_doctor_name[j]);
          }
        }
      }
    },
    current_time() {
      let now = new Date();
      this.myTime =
        now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      setTimeout(this.current_time, 1000);
    },
    setClinic(value) {
      console.log(this.$store.state.patient_Info.clinic.clinic_id);
      console.log(value);
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
          this.$store.state.checkMedicalRoute = true;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          alert("사용자의 권한이 없습니다");
        });
    },
  },
};
</script>
