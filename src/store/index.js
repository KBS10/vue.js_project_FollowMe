import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socketBeaconInfo: [],
    // Google Map 객체에 Click 시 마커의 정보를 배열에 저장.
    markers: [],
    // Axios 통신을 통해 서버에서 beacon의 정보 받는 배열
    beaconLocation: [],
    // Axios 통신을 통해 서버에서 beacon의 정보중 lat, lng를 저장하는 배열
    beaconMarkers: [],
    // Google Map 객체
    map: null,
    // Axios 통신을 통해 서버에 beacon 데이터 보내는 배열
    beacons: [{ room: " " }]
  },
  mutations: {},
  actions: {},
  modules: {}
});
