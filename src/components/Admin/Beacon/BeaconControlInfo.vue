<template>
  <div class="BeaconControlInfo">
    <h1>내가 추가 및 삭제 비콘 정보 확인</h1>
    <table class="beaconcontrolInfo_table">
      <thead>
        <tr>
          <td>번호</td>
          <td>uuid</td>
          <td>major</td>
          <td>minor</td>
          <td>lat</td>
          <td>lng</td>
          <td>삭제</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(beacon, i) in this.beaconinfos" :key="i">
          <td>{{ i + 1 }}</td>
          <input type="text" id="room" v-model="beacon.room" hidden />
          <td>
            <input type="text" v-model="beacon.uuid" />
          </td>
          <td><input type="text" v-model="beacon.major" /></td>
          <td><input type="text" v-model="beacon.beacon_id_minor" /></td>
          <td><input type="text" v-model="beacon.lat" /></td>
          <td><input type="text" v-model="beacon.lng" /></td>
          <td>
            <button
              class="beaconcontrolbutton_delete"
              @click="$delete(beaconinfos, i)"
            >
              <img src="../../../img/trash.png" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <v-btn class="button btn_primary" @click="addBeaconInput()">plus</v-btn>
    <v-btn class="button btn_primary" @click="checkBeacon()">비콘 체크</v-btn>
    <v-btn @click="axiosFunction()">저장</v-btn>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      beaconinfos: []
    };
  },
  methods: {
    addBeaconInput() {
      console.log("비콘 추가 버튼");
      console.log(this.beaconinfos);

      this.beaconinfos.push({
        uuid: "",
        major: "",
        beacon_id_minor: "",
        lat: this.$store.state.markers[
          this.$store.state.markers.length - 1
        ].position.lat(),
        lng: this.$store.state.markers[
          this.$store.state.markers.length - 1
        ].position.lng(),
        check: "create"
      });
    },
    axiosFunction() {
      console.log("axios 통신");
      console.log(this.beaconinfos);
      const url = "http://172.26.3.122:8000/api/admin/beacon_update";
      axios
        .post(url, { beacon: this.beaconinfos })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>
