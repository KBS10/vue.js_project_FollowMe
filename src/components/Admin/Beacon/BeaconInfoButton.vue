<template>
  <div class="BeaconInfoButton">
    <h1>비콘 정보 및</h1>
    <p>신호 불량 비콘 확인</p>
    <div class="beaconInfobutton_explain">
      비콘에 대한 정보를 확인 할 수 있습니다.
    </div>
    <div>구글 맵 비콘을 클릭 시</div>
    <div>비콘에 대한 내용을 볼 수 있습니다.</div>

    <div class="beaconInfobutton_button">
      <!-- <v-btn style="width: 125px" class="beaconInfobutton btn_primary"
        >비콘 정보</v-btn
      > -->
      <v-btn style="width: 125px" class="beaconInfobutton btn_primary"
        @click="showCircle()">비콘 반경</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
export default {
  data() {
    return {
      // 소켓 서버 접속
      socket: io("http://172.26.1.3:3000/"),
      beaconImage:
        "https://user-images.githubusercontent.com/53847348/99767420-5ba24b80-2b46-11eb-8b3c-a9b686bb8c59.png",
    };
  },

  mounted() {
    this.getInfoBeacon();
    // 소켓 on으로 node.js 소켓서버에서 보내는 Data 받음
    this.socket.on("beaconInfo", (data) => {
      for (let i = 0; i < this.$store.state.AdminInfoBeacon.length; i++) {
        if (
          this.$store.state.AdminInfoBeacon[i].beacon_id_minor == data.Minor
        ) {
          this.$store.state.AdminInfoBeacon[i].RSSI = data.RSSI;
          this.$store.state.AdminInfoBeacon[i].Error = data.Error;
        }
      }
    });
    this.socket.on("beaconError", (data) => {
      for (let i = 0; i < this.$store.state.AdminInfoBeacon.length; i++) {
        if (
          this.$store.state.AdminInfoBeacon[i].beacon_id_minor == data.Minor
        ) {
          this.$store.state.AdminInfoBeacon[i].RSSI = data.RSSI;
          this.$store.state.AdminInfoBeacon[i].Error = data.Error;
        }
      }
    });
  },
  methods: {
    showCircle(){

    },
    getInfoBeacon() {
      this.$store.state.AdminInfoBeacon = [];
      const url = "http://172.26.3.122:8000/api/admin/beacon_defect_check_main";
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          console.log(response);
          for (let i = 0; i < response.data.beacon_info.length; i++) {
            this.$store.state.AdminInfoBeacon.push(
              response.data.beacon_info[i]
            );
            this.addMarker(
              response.data.beacon_info[i].lat,
              response.data.beacon_info[i].lng,
              response.data.beacon_info[i].major
            );
          }
          console.log(this.$store.state.AdminInfoBeacon);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addMarker(lat, lng, major) {
      const icons = {
        url: this.beaconImage,
        scaledSize: new window.google.maps.Size(20, 25),
        anchor: new window.google.maps.Point(10, 10),
      };
      const circle = new window.google.maps.Circle({
        position: { lat, lng },
        map: this.$store.state.beaconInfoMap,
        floor: major,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: this.$store.state.beaconInfoMap,
        icon: icons,
        floor: major,
        circle: circle,
      });
      this.$store.state.beaconInfoMarkers.push(circle);
      this.$store.state.beaconInfoMarkers.push(marker);
    },
  },
};
</script>
