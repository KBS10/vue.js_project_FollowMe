<template>
  <div class="BeaconInfo">
    <h1>비콘 정보</h1>

    <table class="beaconinfo_showBeaconInfo">
      <tr class="beaconinfo_beaconCategory">
        <td>ScannerID</td>
        <td>Major</td>
        <td>Minor</td>
        <td>RSSI</td>
        <td style="width: 170px">상태확인</td>
      </tr>
      <tr v-for="info in this.$store.state.AdminInfoBeacon" :key="info.Minor">
        <td>{{ info.beacon_scanner_id }}</td>
        <td>{{ info.major }}</td>
        <td>{{ info.beacon_id_minor }}</td>
        <td>{{ info.RSSI }}</td>
        <td>{{ info.Error }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {}
};
</script>
