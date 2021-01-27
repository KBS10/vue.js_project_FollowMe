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
        @click="showMarkers()"
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
import { EventBus } from "../../../utils/bus";
// import axios from 'axios';
export default {
  data: () => {
    return {
      beaconMap: null,
      beaconImage:
        "https://user-images.githubusercontent.com/53847348/99767420-5ba24b80-2b46-11eb-8b3c-a9b686bb8c59.png",
    };
  },
  created() {},
  mounted() {
    EventBus.$on("Map", function (value) {
      this.beaconMap = value;
      console.log("이벤트를 전달받음. 전달받은 값 : ", this.beaconMap);
    });
  },
  methods: {
    // Sets the map on all markers in the array.
    setMaponAll(map) {
      for (let i = 0; i < this.$store.state.markers.length; i++) {
        this.$store.state.markers[i].setMap(map);
      }
    },
    // 마커 하면에서 만 안보이고 배열에는 정의되어있음
    clearMarker() {
      this.setMaponAll(null);
    },
    // 모든 마커 보이기
    showMarkers() {
      this.setMaponAll(this.$store.state.map);
      console.log("모든 비콘 보이기");
    },
    // 배열 안에 등록되어 있는 마커 모두 삭제
    deleteMarkers() {
      this.clearMarker();
      this.$store.state.markers = [];
      console.log("비콘 데이터 삭제");
    },
  },
};
</script>
