import Vue from "vue";
import Vuex from "vuex";
import VueCookie from "vue-cookie";

Vue.use(Vuex);
Vue.use(VueCookie)

export default new Vuex.Store({
  state: {
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
    // Google Map 객체
    // map: null,
    // token: "",
    token: ""
  },
  mutations: {},
  actions: {},
  modules: {}
});