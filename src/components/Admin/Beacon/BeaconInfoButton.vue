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
      <v-btn
        style="width: 125px"
        class="beaconInfobutton btn_primary"
        @click="showMarkers()"
        >비콘 정보</v-btn
      >
      <v-btn
        style="width: 125px"
        class="beaconInfobutton btn_primary"
        @click="deleteMarkers()"
        >비콘 반경</v-btn
      >
    </div>
  </div>
</template>

<script>
</script>
