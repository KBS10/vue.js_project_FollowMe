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
        <tr v-for="(beacon, i) in this.$store.state.googleMapMarkers" :key="i">
          <td>{{ i + 1 }}</td>
          <td>
            <input type="text" v-model="beacon.uuid" />
          </td>
          <td><input type="text" v-model="beacon.major" /></td>
          <td><input type="text" v-model="beacon.beacon_id_minor" /></td>
          <td><input type="text" v-model="beacon.lat" /></td>
          <td><input type="text" v-model="beacon.lng" /></td>
          <td>
            <button class="beaconcontrolbutton_delete" @click="deleteBeacon(i)">
              <img src="../../../img/trash.png" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <v-btn @click="axiosFunction()">서버로 데이터 전송</v-btn>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => {
    return {
      beaconControlMap: null,
    };
  },
  mounted() {},
  methods: {
    deleteBeacon(index) {
      this.$delete(this.$store.state.googleMapMarkers, index);
    },
    axiosFunction() {
      console.log("axios 통신");
      console.log(this.$store.state.googleMapMarkers);
      const url = "http://172.26.3.122:8000/api/admin/beacon_update";
      axios
        .post(url, { beacon: this.$store.state.googleMapMarkers })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
