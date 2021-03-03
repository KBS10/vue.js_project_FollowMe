<template>
  <div class="BeaconControlButton">
    <h1>비콘 추가 및 삭제</h1>
    <div class="beaconcontrolbutton_explain">
      지도를 클릭하면 비콘의 위치를 찍을 수 있습니다.
    </div>
    <div class="beaconcontrolbutton_button">
      <v-btn
        style="width: 150px"
        class="beaconcontrolbutton btn_primary"
        @click="getBeforeBeaconInfo()"
        >이전 자료 불러오기</v-btn
      >
      <v-btn
        style="width: 125px"
        class="beaconcontrolbutton btn_primary"
        @click="deleteMarkers()"
        >모든 비콘 삭제</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      beaconMap: null,
      beaconImage:
        "https://user-images.githubusercontent.com/53847348/99767420-5ba24b80-2b46-11eb-8b3c-a9b686bb8c59.png",
    };
  },
  created() {},
  methods: {
    // 이전 자료 불러오기
    getBeforeBeaconInfo() {
      this.$store.state.AdminControlBeacon = [];
      const url = this.$store.state.url + "/api/admin/beacon_setting_main";

      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.beacon_info);
          if (response.data.error == "Unauthorized") {
            alert("이전 자료가 없습니다. 다시확인해주세요");
          }

          for (let i = 0; i < response.data.beacon_info.length; i++) {
            this.$store.state.AdminControlBeacon.push(
              response.data.beacon_info[i]
            );
            this.addMarker(
              response.data.beacon_info[i].lat,
              response.data.beacon_info[i].lng,
              response.data.beacon_info[i].major,
              response.data.beacon_info[i].beacon_id_minor
            );
            this.clearMarker(response.data.beacon_info[i].major);
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log("이전 자료가 없습니다");
        });
    },

    setMaponAll(map, beaconfloor) {
      for (var i = 0; i < this.$store.state.AdminControlBeacon.length; i++) {
        if (this.$store.state.beaconControlMarkers[i].floor != beaconfloor) {
          this.$store.state.beaconControlMarkers[i].setMap(map);
        } else {
          this.$store.state.beaconControlMarkers[i].setMap(
            this.$store.state.beaconControlMap
          );
        }
      }
    },
    // 마커 하면에서 만 안보이고 배열에는 정의되어있음
    clearMarker(beaconfloor) {
      this.setMaponAll(null, beaconfloor);
    },

    setDeleteAll(map) {
      for (var i = 0; i < this.$store.state.AdminControlBeacon.length; i++) {
        this.$store.state.beaconControlMarkers[i].setMap(map);
      }
    },
    deleteMarker() {
      this.setDeleteAll(null);
    },
    // 배열 안에 등록되어 있는 마커 모두 삭제
    deleteMarkers() {
      this.deleteMarker();
      this.$store.state.AdminControlBeacon = [];
      this.$store.state.beaconControlMarkers = [];
      console.log("비콘 데이터 삭제");
    },
    addMarker(lat, lng, major, minor) {
      const icons = {
        url: this.beaconImage,
        scaledSize: new window.google.maps.Size(20, 25),
        anchor: new window.google.maps.Point(10, 10),
      };
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: this.$store.state.beaconControlMap,
        icon: icons,
        floor: major,
        minor: minor,
      });
      this.$store.state.beaconControlMarkers.push(marker);
      this.clickBeaconControl(marker, minor);
      this.attachSecretMessage(marker, minor);
    },
    attachSecretMessage(marker, secretMessage) {
      const infoWindowMessage = "Minor : " + secretMessage;
      const infowindow = new window.google.maps.InfoWindow({
        content: infoWindowMessage,
      });
      marker.addListener("mouseover", () => {
        infowindow.open(marker.get("map"), marker);
      });
    },
    clickBeaconControl(marker, minor) {
      marker.addListener("click", (data) => {
        console.log(data);
        this.deleteBeacon(minor);
      });
    },
    deleteBeacon(minor) {
      console.log(minor);
      for (let i = 0; i < this.$store.state.beaconControlMarkers.length; i++) {
        if (this.$store.state.beaconControlMarkers[i].minor === minor) {
          this.deleteBeaconMarker(i);
          this.$delete(this.$store.state.beaconControlMarkers, i);
          this.$delete(this.$store.state.AdminControlBeacon, i);
        }
      }
    },
    setDeleteBeaconMap(map, index) {
      this.$store.state.beaconControlMarkers[index].setMap(map);
    },
    // 마커 화면에서 만 안보이고 배열에는 정의되어있음
    deleteBeaconMarker(index) {
      this.setDeleteBeaconMap(null, index);
    },
  },
};
</script>
