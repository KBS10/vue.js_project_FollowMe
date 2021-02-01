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
      component: "비콘 추가 및 삭제",
      componentsArray: ["비콘 추가 및 삭제", "비콘 정보 및 신호 불량 비콘 확인"]
    };
  },
  created() {},
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
      }
    },
  },
};
</script>
