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
      <!-- <v-btn
        style="width: 125px"
        class="beaconInfobutton btn_primary"
        @click="showCircle()"
        >비콘 반경</v-btn
      > -->
    </div>
    <h1>{{ checkBeaconRSSI }}</h1>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
export default {
  data() {
    return {
      // 소켓 서버 접속
      // socket: io("http://172.26.2.132:3000/"),
      socket: io("http://192.168.0.26:3000/"),
      beaconImage:
        "https://user-images.githubusercontent.com/53847348/99767420-5ba24b80-2b46-11eb-8b3c-a9b686bb8c59.png",
      beaconErrorImage:
        "https://user-images.githubusercontent.com/53847348/106530728-38c1e980-6530-11eb-9fed-89732ab47bf1.png",
      circleInfo: [],
      checkBeaconRSSI: "",
    };
  },
  mounted() {
    this.getInfoBeacon();
    this.socketBeaconInfo();
    // this.initMap();
  },
  updated() {},
  methods: {
    // checkMarkerAll(map, beaconfloor) {
    //   for (var i = 0; i < this.$store.state.AdminInfoBeacon.length; i++) {
    //     if (this.$store.state.beaconInfoMarkers[i].floor != beaconfloor) {
    //       this.$store.state.beaconInfoMarkers[i].setMap(map);
    //     } else {
    //       this.$store.state.beaconInfoMarkers[i].setMap(
    //         this.$store.state.beaconInfoMap
    //       );
    //     }
    //   }
    // },
    // // 마커 하면에서 만 안보이고 배열에는 정의되어있음
    // checkMarker(beaconfloor) {
    //   console.log(beaconfloor)
    //   this.checkMarkerAll(null, beaconfloor);
    // },
    socketBeaconInfo() {
      const icons1 = {
        url: this.beaconImage,
        scaledSize: new window.google.maps.Size(30, 35),
        anchor: new window.google.maps.Point(10, 10),
      };
      const icons2 = {
        url: this.beaconErrorImage,
        scaledSize: new window.google.maps.Size(20, 25),
        anchor: new window.google.maps.Point(10, 10),
      };
      // 소켓 on으로 node.js 소켓서버에서 보내는 Data 받음
      this.socket.on("beaconInfo", (data) => {
        for (let i = 0; i < this.$store.state.AdminInfoBeacon.length; i++) {
          if (
            this.$store.state.AdminInfoBeacon[i].beacon_id_minor == data.Minor
          ) {
            this.$store.state.AdminInfoBeacon[i].RSSI = data.RSSI;
            this.$store.state.AdminInfoBeacon[i].Error = data.Error;

            if (this.$store.state.AdminInfoBeacon[i].Error == "양호") {
              this.$store.state.beaconInfoMarkers[i].setIcon(icons1);
            }
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
            if (this.$store.state.AdminInfoBeacon[i].Error == "이상") {
              this.$store.state.beaconInfoMarkers[i].setIcon(icons2);
            }
          }
        }
      });
    },
    getInfoBeacon() {
      this.$store.state.AdminInfoBeacon = [];
      const url = this.$store.state.url + "/api/admin/beacon_defect_check_main";
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          console.log("확인" + response);
          for (let i = 0; i < response.data.beacon_info.length; i++) {
            this.$store.state.AdminInfoBeacon.push(
              response.data.beacon_info[i]
            );
            this.addMarker(
              response.data.beacon_info[i].lat,
              response.data.beacon_info[i].lng,
              response.data.beacon_info[i].major,
              i
            );
            this.addCircle(
              response.data.beacon_info[i].lat,
              response.data.beacon_info[i].lng,
              response.data.beacon_info[i].major
            );
            this.clearMarker(response.data.beacon_info[i].major);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setMaponAll(map, beaconfloor) {
      for (var i = 0; i < this.$store.state.AdminInfoBeacon.length; i++) {
        if (this.$store.state.beaconInfoMarkers[i].floor != beaconfloor) {
          this.$store.state.beaconInfoMarkers[i].setMap(map);
        } else {
          this.$store.state.beaconInfoMarkers[i].setMap(
            this.$store.state.beaconInfoMap
          );
        }
      }
    },
    attachSecretMessage(marker, secretMessage) {
      // console.log(secretMessage);
      const infoWindowMessage = "Minor : " + secretMessage.beacon_id_minor;
      const infowindow = new window.google.maps.InfoWindow({
        content: infoWindowMessage,
      });
      marker.addListener("click", () => {
        infowindow.open(marker.get("map"), marker);
      });
    },

    // 마커 하면에서 만 안보이고 배열에는 정의되어있음
    clearMarker(beaconfloor) {
      this.setMaponAll(null, beaconfloor);
    },
    addMarker(lat, lng, major, index) {
      const icons = {
        url: this.beaconErrorImage,
        scaledSize: new window.google.maps.Size(20, 25),
        anchor: new window.google.maps.Point(10, 10),
      };
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: this.$store.state.beaconInfoMap,
        icon: icons,
        floor: major,
      });
      this.$store.state.beaconInfoMarkers.push(marker);
      this.attachSecretMessage(
        marker,
        this.$store.state.AdminInfoBeacon[index]
      );
    },
    addCircle(lat, lng, major) {
      const circle = new window.google.maps.Circle({
        position: { lat, lng },
        map: this.$store.state.beaconInfoMap,
        floor: major,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        visible: true,
      });
      this.circleInfo.push(circle);
    },
    initMap() {
      const infoWindow = new window.google.maps.InfoWindow();
      infoWindow.open(this.$store.state.beaconInfoMap);
    },
  },
};
</script>
