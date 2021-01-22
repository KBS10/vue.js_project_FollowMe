<template>
  <div class="BeaconControl">
    <h1>비콘 추가 및 삭제</h1>
    <div class="beaconControl_button">
      <v-btn style="width: 115px" @click="clearMarker()">비콘 숨기기</v-btn>
      <v-btn
        style="width: 125px"
        class="beaconControl_showBeaconButton"
        @click="showMarkers()"
        >모든 비콘 보이기</v-btn
      >
      <v-btn style="width: 115px" @click="deleteMarkers()"
        >모든 비콘 삭제</v-btn
      >
    </div>

    <div id="beaconInfoInput"></div>
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
        "https://user-images.githubusercontent.com/53847348/99767420-5ba24b80-2b46-11eb-8b3c-a9b686bb8c59.png"
    };
  },
  created() {},
  mounted() {
    EventBus.$on("Map", function(value) {
      this.beaconMap = value;
      // console.log("이벤트를 전달받음. 전달받은 값 : ", this.beaconMap)
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
      console.log("비콘 숨기기");
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
    }
  }
};
</script>
