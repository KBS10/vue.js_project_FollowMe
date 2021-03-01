<template>
  <div class="MedicalHistory">
    <h2>진료 내역</h2>
    <div class="medicalhistory_historyHeader">
      <select
        id="medicalreceipt_clinic"
        name="select"
        style="width: 150px; height: 25px"
        v-model="hospital_subject_name"
        @click="searchHospitalSubjectName(hospital_subject_name)"
      >
        <option v-for="(clinic_room, i) in clinic_room" :key="i">
          {{ clinic_room }}
        </option>
      </select>
      <input class="medicalhistory_date" type="date" v-model="mydate" />

      진료 여부
      <div class="mdeicalhistory_choose">
        <input
          type="radio"
          id="history_radioTotal"
          value="history_radioTotal"
          @click="history_radioTotal"
          v-model="history"
        />
        <label for="history_radioTotal">전체</label>
        <input
          type="radio"
          id="history_radioComplete"
          value="history_radioComplete"
          @click="history_radioComplete"
          v-model="history"
        />
        <label for="history_radioComplete">완료</label>
        <input
          type="radio"
          id="history_radioWait"
          value="history_radioWait"
          @click="history_radioWait"
          v-model="history"
        />
        <label for="history_radioWait">대기</label>
      </div>
      <v-btn @click="setClinic(hospital_subject_name)">조회</v-btn>
    </div>

    <table class="medicalhistory_table" border="1">
      <tr>
        <td>환자번호</td>
        <td>성명</td>
        <td>진료과목</td>
        <td>진료실</td>
        <td>담당의사</td>
        <td>시간</td>
        <td>진료상태</td>
        <td>진료종료</td>
      </tr>
      <tr
        @click="setPatientInfo(clinic_list, i)"
        v-for="(info, i) in clinic_list"
        :key="i"
      >
        <td>{{ info.patient_id }}</td>
        <td>{{ info.patient.patient_name }}</td>
        <td id="clinic_subject_name">{{ info.clinic_subject_name }}</td>
        <td>{{ info.room_name }}</td>
        <td>{{ info.doctor_name }}</td>
        <td>{{ info.clinic_time }}</td>
        <td>{{ info.standby_status === 1 ? "대기" : "종료" }}</td>
        <td>
          <v-btn
            @click="endClinic(info.clinic_id, info.clinic_subject_name)"
            :disabled="info.standby_status !== 1"
            >종료</v-btn
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Pusher from "pusher-js";
import { EventBus } from "../../utils/bus";

export default {
  data: () => {
    return {
      clinic_room: [
        "마취과",
        "이비인후과",
        "정신과",
        "내과",
        "외과",
        "신경외과",
        "순환기내과",
        "비뇨기과",
        "산부인과",
        "성형외과",
        "소아과",
        "병리과",
      ],
      hospital_subject_name: "",
      history: "history_radioTotal", //radio 이벤트시 변경
      clinic_list: [], //진료 목록(실제로 보이는 데이터)
      clinic_record: [], //진료 전체 목록
      clinic_record_complate: [], //진료 완료 목록
      clinic_record_wait: [], //진료 대기 목록
      mydate: new Date().toISOString().substring(0, 10),
    };
  },
  //pusher 실행
  created() {
    this.subscribe();
  },
  mounted() {
    this.findClinicRoom();
    EventBus.$on("showHistory", (data) => {
      console.log(data);
      this.setClinic();
    });
  },
  methods: {
    searchHospitalSubjectName(data) {
      this.hospital_subject_name = data;
    },
    findClinicRoom() {
      const url = this.$store.state.url + "/api/medical/clinic_subject";
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          if (response.data.error == "Unauthorized") {
            alert("사용자의 권한이 없습니다");
          }

          for (let i = 0; i < response.data.clinic_subject.length; i++) {
            this.clinic_room[i] =
              response.data.clinic_subject[i].clinic_subject_name;
          }
          console.log(this.clinic_room);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setPatientInfo(data, index) {
      console.log(data[index]);
      this.$store.state.patient_Info.patient = data[index].patient;
      this.$store.state.checkPatientFlow = true;
    },
    //pusher 이벤트 리스너
    subscribe() {
      let pusher = new Pusher("7ed3a4ce8ebfe9741f98", { cluster: "ap3" });
      pusher.subscribe("FollowMe_standby_number");
      pusher.bind("FollowMe_standby_number", (data) => {
        console.log(data);
        this.setClinic();
      });
    },
    //진료 (전체, 완료, 대기) 판단
    history_check() {
      if (this.history === "history_radioComplete")
        this.history_radioComplete();
      else if (this.history === "history_radioWait") this.history_radioWait();
      else this.history_radioTotal();
    },
    //진료 전체 목록
    history_radioTotal() {
      this.history = "history_radioTotal";
      this.clinic_list = this.clinic_record;
    },
    //진료 완료 목록
    history_radioComplete() {
      this.history = "history_radioComplete";
      this.clinic_list = this.clinic_record.filter(
        (clinic) => clinic.standby_status !== 1
      );
    },
    //진료 대기 목록
    history_radioWait() {
      this.history = "history_radioWait";
      this.clinic_list = this.clinic_record.filter(
        (clinic) => clinic.standby_status === 1
      );
    },
    //진료 종료 이벤트 (진료 id, 진료과 이름)
    endClinic(clinic_id, clinic_subject_name) {
      const url = this.$store.state.url + "/api/medical/clinic_end";
      axios
        .post(
          url,
          {
            clinic_id: clinic_id,
            clinic_subject_name: clinic_subject_name,
            clinic_date: this.mydate,
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
          alert("접수가 종료되었습니다.");
          console.log(response);
          this.clinic_record = response.data.clinic_record;
          this.history_check(); //조회 이벤트 후 (전체, 완료, 대기) 판단
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setClinic() {
      console.log(this.hospital_subject_name);
      const url = this.$store.state.url + "/api/medical/clinic_record";
      axios
        .post(
          url,
          {
            clinic_subject_name: this.hospital_subject_name,
            clinic_date: this.mydate,
          },
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
          this.clinic_record = response.data.clinic_record;
          this.history_check(); //조회 이벤트 후 (전체, 완료, 대기) 판단
          console.log(this.clinic_record);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
#medicalreceipt_clinic {
  display: inline-block;
  background-color: aliceblue;
  border-radius: 10px;
  margin : 0 20px;
}
</style>