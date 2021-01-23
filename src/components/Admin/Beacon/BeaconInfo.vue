<template>
  <div class="BeaconInfo">
    <h1>비콘 정보</h1>

    <table class="beaconinfo_showBeaconInfo">
      <tr class="beaconinfo_beaconCategory">
        <td>ScannerID</td>
        <td>Major</td>
        <td>Minor</td>
        <td>RSSI</td>
        <td style="width : 170px">상태확인</td>
      </tr>
      <tr v-for="info in $store.state.socketBeaconInfo" :key="info.Minor">
        <td>{{ info.scannerID }}</td>
        <td>{{ info.Major }}</td>
        <td>{{ info.Minor }}</td>
        <td>{{ info.RSSI }}</td>
        <td>{{ info.Error }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  components: {},
  data() {
    return {
      search: ""
    };
  },
  created() {}
};
</script>
