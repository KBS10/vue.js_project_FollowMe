<template>
  <div class="AdminBeacon">
    <!-- 비콘 설정 및 관리에서 버튼 반복 -->
    <div class="adminbeacon_menubar">
      <v-btn
        v-for="item in componentsArray"
        :key="item"
        @click="swapComponent(item)"
      >
        {{ item }}
      </v-btn>
    </div>
    <hr />
    <div class="adminbeacon_content">
      <!-- 비콘을 설정할 수 있는 지도 표시 -->
      <div class="adminbeacon_GoogleMap">
        <div v-switch="component">
          <div v-case="'비콘 추가 및 삭제'">
            <BeaconControlGoogleMap :handelOnClick="eventOn" />
          </div>
          <div v-case="'비콘 정보 및 신호 불량 비콘 확인'">
            <BeaconInfoGoogleMap />
          </div>
        </div>
      </div>
      <div class="adminbeacon_beaconInfoWrap">
        <!-- 비콘에 대해 추가, 삭제, 이상 비콘 확인  -->
        <div v-switch="component">
          <div v-case="'비콘 추가 및 삭제'">
            <BeaconControlButton />
          </div>
          <div v-case="'비콘 정보 및 신호 불량 비콘 확인'">
            <BeaconInfoButton />
          </div>
        </div>
      </div>
      <div class="adminbeacon_beaconInfoInput">
        <div v-switch="component">
          <div v-case="'비콘 추가 및 삭제'">
            <BeaconControlInfo />
          </div>
          <div v-case="'비콘 정보 및 신호 불량 비콘 확인'">
            <BeaconInfo />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BeaconControlGoogleMap from "../GoogleMap/BeaconControlGoogleMap";
import BeaconInfoGoogleMap from "../GoogleMap/BeaconInfoGoogleMap";
import BeaconInfo from "./Beacon/BeaconInfo";
import BeaconInfoButton from "./Beacon/BeaconInfoButton";
import BeaconControlButton from "./Beacon/BeaconControlButton";
import BeaconControlInfo from "./Beacon/BeaconControlInfo";
import axios from "axios";
// import io from "socket.io-client";

export default {
  components: {
    BeaconControlGoogleMap,
    BeaconInfoGoogleMap,
    BeaconInfo,
    BeaconInfoButton,
    BeaconControlButton,
    BeaconControlInfo,
  },
  data() {
    return {
      eventOn: true,
      // 소켓 서버 접속
      //   socket: io("http://172.26.2.137:3000/"),
      // socket: io("http://192.168.0.32:3000/"),
      component: "비콘 추가 및 삭제",
      componentsArray: [
        "비콘 추가 및 삭제",
        "비콘 정보 및 신호 불량 비콘 확인",
      ],
    };
  },
  created() {},
  // mounted() {
  //   // 소켓 on으로 node.js 소켓서버에서 보내는 Data 받음
  //   this.socket.on("beaconInfo", (data) => {
  //     console.log(data);
  //     if (this.$store.state.socketBeaconInfo[0].Minor == data.Minor) {
  //       this.$store.state.socketBeaconInfo[0].RSSI = data.RSSI;
  //       this.$store.state.socketBeaconInfo[0].Error = data.Error;
  //     } else if (this.$store.state.socketBeaconInfo[1].Minor == data.Minor) {
  //       this.$store.state.socketBeaconInfo[1].RSSI = data.RSSI;
  //       this.$store.state.socketBeaconInfo[1].Error = data.Error;
  //     } else if (this.$store.state.socketBeaconInfo[2].Minor == data.Minor) {
  //       this.$store.state.socketBeaconInfo[2].RSSI = data.RSSI;
  //       this.$store.state.socketBeaconInfo[2].Error = data.Error;
  //     }
  //   });
  //   this.socket.on("beaconError", (data) => {
  //     if (this.$store.state.socketBeaconInfo[0].Minor == data.Minor) {
  //       this.$store.state.socketBeaconInfo[0].Error = data.Error;
  //     } else if (this.$store.state.socketBeaconInfo[1].Minor == data.Minor) {
  //       this.$store.state.socketBeaconInfo[1].Error = data.Error;
  //     } else if (this.$store.state.socketBeaconInfo[2].Minor == data.Minor) {
  //       this.$store.state.socketBeaconInfo[2].Error = data.Error;
  //     }
  //   });
  // },
  mounted(){
  },
  methods: {
    // 버튼에 따라 컴포넌트 변경하는 함수
    swapComponent(item) {
      this.component = item;
      console.log(this.component);
      // 비콘 추가 및 삭제 true / 비콘 정보 및 신호 불량 비콘 확인 false 를통해
      // 해당 페이지에서 구글 맵 marker를 set 제한
      if (this.component == "비콘 추가 및 삭제") {
        this.eventOn = true;
      } else if (this.component == "비콘 정보 및 신호 불량 비콘 확인") {
        this.eventOn = false;

        const url = "http://172.26.3.122:8000/api/admin/beacon_setting_main";
        // const url = "http://192.168.0.24:8000/api/admin/beacon_setting_main";
        console.log("token 값", this.$store.state.token);
        axios
          .get(url, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          })
          .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.beacon_info.length; i++) {
              // console.log(response.data.beacon_info[i].lat, response.data.beacon_info[i].lng)
              this.addMarker(
                response.data.beacon_info[i].lat,
                response.data.beacon_info[i].lng
              );
            }

            this.$store.state.beaconLocation = response.data;
            console.log(this.$store.state.beaconLocation);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    addMarker(lat, lng) {
      const icons = {
        url: this.beaconImage,
        scaledSize: new window.google.maps.Size(20, 25),
        anchor: new window.google.maps.Point(10, 10),
      };
      const marker = new window.google.maps.Marker({
        position: {lat, lng},
        map: this.$store.state.beaconControlMap,
        icon: icons,
      });
      this.$store.state.beaconMarkers.push(marker);
    },
  },
};
</script>
