<template>
  <div id="BeaconInfoInput">
    <h1>비콘 정보 DB 넘기는 페이지</h1>

    <div class="BeaconRows">
      <div
        v-for="(beacon, i) in this.$store.state.beacons"
        :key="i"
        class="BeaconRows-BeaconRowWrap"
        data-term-luid="beacon-1"
      >
        <span id="count">{{ i + 1 }} </span>
        <div class="Input_Beacon_Info">
          <input type="text" id="room" v-model="beacon.room" hidden />

          <label for="uuid">uuid</label>
          <input type="text" id="uuid" v-model="beacon.uuid" />

          <label for="Major">Major</label>
          <input type="text" id="Major" v-model="beacon.major" />

          <label for="Minor">Minor</label>
          <input type="text" id="Minor" v-model="beacon.beacon_id_minor" />

          <label for="lat">lat</label>
          <input type="text" id="lat" v-model="beacon.lat" />

          <label for="lng">lng</label>
          <input type="text" id="lng" v-model="beacon.lng" />
        </div>
        <button id="plus">
          <i class="fas fa-plus" id="plus" @click="addBeaconInput()"></i>
        </button>
        <button id="delete">
          <i class="fas fa-trash-alt" id="delete"></i>
        </button>
      </div>
      <v-btn @click="axiosFunction()">저장</v-btn>
    </div>
  </div>
</template>
<script>
import axios from "axios";

class beaconInfo {
  room;
  uuid;
  beacon_scanner_id;
  major;
  beacon_id_minor;
  lat;
  lng;
  constructor(room, uuid, beacon_scanner_id, major, beacon_id_minor, lat, lng) {
    this.room = room;
    this.uuid = uuid;
    this.beacon_scanner_id = beacon_scanner_id;
    this.major = major;
    this.beacon_id_minor = beacon_id_minor;
    this.lat = lat;
    this.lng = lng;
  }
}

export default {
  data() {
    return {
      room: "",
      uuid: "",
      beacon_scanner_id: "",
      major: "",
      beacon_id_minor: "",
      lat: "",
      lng: ""
    };
  },
  mounted() {},
  methods: {
    addBeaconInput() {
      console.log("추가 버튼");
      this.$store.state.beacons.push(
        new beaconInfo(
          this.room,
          this.uuid,
          this.beacon_scanner_id,
          this.major,
          this.beacon_id_minor,
          this.lat,
          this.lng,
          this.count
        )
      );
      console.log(this.$store.state.beacons);
    },
    deleteBeaconInput() {
      console.log("삭제 버튼");
    },
    axiosFunction() {
      console.log("axios 통신");

      const url = "http://192.168.0.8:8000/api/admin/beacon_create";
      axios
        .post(url, { beacon: this.$store.state.beacons })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
