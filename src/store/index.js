import Vue from "vue";
import Vuex from "vuex";
import VueCookie from "vue-cookie";

Vue.use(Vuex);
Vue.use(VueCookie)

export default new Vuex.Store({
  state: {
    // url: "http://172.26.3.122:8000",
    url: "http://34.234.79.156/index.php",
    // 구글 맵 층수를 저장
    floorBuilding: 1,
    // 비콘 컨트롤 맵 저장
    beaconControlMap: null,
    beaconControlMarkers: [], // 구글 컨트롤 마커 정보 저장
    AdminControlBeacon: [], // axios 통신으로 비콘의 정보 저장
    ///////////////////////////////////
    beaconInfoMap: null,
    beaconInfoMarkers: [], // 구글 인퍼 마커 정보 저장
    AdminInfoBeacon: [], // axios 통신으로 비콘의 정보 저장
    ///////////////////////////////////
    patient_list: [], // 이름으로 환자의 목록을 저장
    patient_Info: {
      clinic: "",
      flow: [],
      patient: {
        patient_id: "",
        patient_name: "",
        resident_number: "",
        postal_code: "",
        address: "",
        detail_address: "",
        phone_number: "",
        notes: "",
      }
    },
    token: ""
  },
  mutations: {},
  actions: {},
  modules: {}
});