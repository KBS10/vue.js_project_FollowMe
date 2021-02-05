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
        <tr
          v-for="(beacon, i) in this.$store.state.AdminControlBeacon"
          :key="i"
        >
          <td>{{ i + 1 }}</td>
          <td>
            <input type="text" v-model="beacon.uuid" />
          </td>
          <td><input type="text" v-model="beacon.major" required /></td>
          <td>
            <input type="text" v-model="beacon.beacon_id_minor" required />
          </td>
          <td><input type="text" v-model="beacon.lat" required /></td>
          <td><input type="text" v-model="beacon.lng" required /></td>
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
    return {};
  },
  mounted() {},
  methods: {
    // Sets the map on all markers in the array.
    setMaponAll(map, index) {
      this.$store.state.beaconControlMarkers[index].setMap(map);
    },
    // 마커 화면에서 만 안보이고 배열에는 정의되어있음
    clearMarker(index) {
      this.setMaponAll(null, index);
    },
    deleteBeacon(index) {
      this.clearMarker(index);
      this.$delete(this.$store.state.AdminControlBeacon, index);
      this.$delete(this.$store.state.beaconControlMarkers, index);
    },
    axiosFunction() {
      console.log("axios 통신");
      const url = this.$store.state.url + "/api/admin/beacon_update";
      axios
        .post(
          url,
          { beacon: this.$store.state.AdminControlBeacon },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((response) => {
          alert("서버에 데이터를 보냈습니다");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
