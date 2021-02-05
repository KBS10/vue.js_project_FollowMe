<template>
  <div class="BeaconControlGoogleMap">
    <div id="BeaconControlGoogleMap"></div>
    <div>
      <v-btn @click="floorClick(1)">1층</v-btn>
      <v-btn @click="floorClick(2)">2층</v-btn>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../utils/bus"
export default {
  props: ["handelOnClick"],
  data: () => ({
    eventOn: false,
    // location : {},
    // Google Map 옵션 저장
    majorBeacon: 1,
    mapOptions: {
      zoom: 19,
      center: { lat: 35.896783, lng: 128.620941 },
      disableDefaultUI: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      },
    },
    floorimage: {
      floor2:
        "https://user-images.githubusercontent.com/53847348/99892072-3df2f480-2cb4-11eb-9d56-bae02c75b242.png",
      floor3:
        "https://user-images.githubusercontent.com/53847348/99892066-12700a00-2cb4-11eb-898f-1679f957aecc.png",
    },
    beaconImage:
      "https://user-images.githubusercontent.com/53847348/99767420-5ba24b80-2b46-11eb-8b3c-a9b686bb8c59.png",
  }),
  mounted() {
    this.initMap();
  },
  methods: {
    setMaponAll(map, beaconfloor) {
      for (var i = 0; i < this.$store.state.AdminControlBeacon.length; i++) {
        if (this.$store.state.beaconControlMarkers[i].floor != beaconfloor) {
          this.$store.state.beaconControlMarkers[i].setMap(map);
        } else {
          this.$store.state.beaconControlMarkers[i].setMap(
            this.$store.state.beaconControlMap
          );
        }
      }
    },
    // 마커 하면에서 만 안보이고 배열에는 정의되어있음
    clearMarker(beaconfloor) {
      this.setMaponAll(null, beaconfloor);
    },
    floorClick(floorIndex) {
      this.$store.state.floorBuilding = floorIndex;
      // bounds - 왼쪽하단의 좌표와, 오른쪽 상단의 좌표를 구함.
      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(35.89651393057683, 128.6201298818298),
        new window.google.maps.LatLng(35.89707923321034, 128.62176975983763)
      );
      // 구글맵 위에 이미지 오버레이 하는 클래스
      class USGSOverlay extends window.google.maps.OverlayView {
        constructor(bounds, image) {
          super();
          this.bounds_ = bounds;
          this.image_ = image;
          this.div_null;
        }
        onAdd() {
          this.div_ = document.createElement("div");
          this.div_.style.position = "absolute";
          this.div_.style.transform = "skewx()";
          const img = document.createElement("img");
          img.id = "test";
          img.src = this.image_;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.position = "absolute";
          this.div_.appendChild(img);
          const panes = this.getPanes();
          panes.overlayLayer.appendChild(this.div_);
        }
        draw() {
          const overlayProjection = this.getProjection();
          const sw = overlayProjection.fromLatLngToDivPixel(
            this.bounds_.getSouthWest()
          );
          const ne = overlayProjection.fromLatLngToDivPixel(
            this.bounds_.getNorthEast()
          );
          // Resize the image's div to fit the indicated dimensions.
          if (this.div_) {
            this.div_.style.left = sw.x + "px";
            this.div_.style.top = ne.y + "px";
            this.div_.style.width = ne.x - sw.x + "px";
            this.div_.style.height = sw.y - ne.y + "px";
          }
        }
        onRemove() {
          if (this.div_) {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
          }
        }
      }
      var overlay = null;
      if (this.$store.state.floorBuilding == 1) {
        overlay = new USGSOverlay(bounds, this.floorimage.floor2);
        this.majorBeacon = 1;
        this.clearMarker(this.majorBeacon);
        EventBus.$emit("beaconfloor", this.majorBeacon);
      } else if (this.$store.state.floorBuilding == 2) {
        overlay = new USGSOverlay(bounds, this.floorimage.floor3);
        this.majorBeacon = 2;
        this.clearMarker(this.majorBeacon);
        EventBus.$emit("beaconfloor", this.majorBeacon);
      }
      overlay.setMap(this.$store.state.beaconControlMap);
    },
    initMap() {
      this.$store.state.beaconControlMap = new window.google.maps.Map(
        document.getElementById("BeaconControlGoogleMap"),
        this.mapOptions
      );
      const icons = {
        url: this.beaconImage,
        scaledSize: new window.google.maps.Size(20, 25),
        anchor: new window.google.maps.Point(10, 10),
      };
      this.$store.state.markers = [];
      // 비콘의 위치(Marker) 추가

      this.$store.state.beaconControlMap.addListener("click", (event) => {
        // 부모컴포넌트(Admin_Page1) 에서 받은
        // handelOnClick 이 true일 경우(비콘 추가 및 삭제) 마커 축가
        // handleOnClick 이 false일 경우(비콘 정보 및 신호 불량 비콘 확인)
        if (this.handelOnClick == true) {
          const marker = new window.google.maps.Marker({
            position: event.latLng,
            map: this.$store.state.beaconControlMap,
            icon: icons,
            floor: this.majorBeacon,
          });

          this.$store.state.AdminControlBeacon.push({
            uuid: "",
            major: this.majorBeacon,
            beacon_id_minor: "",
            lat: marker.position.lat(),
            lng: marker.position.lng(),
          });
          this.$store.state.beaconControlMarkers.push(marker);
        }
      });

      // bounds - 왼쪽하단의 좌표와, 오른쪽 상단의 좌표를 구함.
      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(35.89651393057683, 128.6201298818298),
        new window.google.maps.LatLng(35.89707923321034, 128.62176975983763)
      );
      // 구글맵 위에 이미지 오버레이 하는 클래스
      class USGSOverlay extends window.google.maps.OverlayView {
        constructor(bounds, image) {
          super();
          this.bounds_ = bounds;
          this.image_ = image;
          this.div_null;
        }
        onAdd() {
          this.div_ = document.createElement("div");
          this.div_.style.position = "absolute";
          this.div_.style.transform = "skewx()";
          const img = document.createElement("img");
          img.id = "test";
          img.src = this.image_;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.position = "absolute";
          this.div_.appendChild(img);
          const panes = this.getPanes();
          panes.overlayLayer.appendChild(this.div_);
        }
        draw() {
          const overlayProjection = this.getProjection();
          const sw = overlayProjection.fromLatLngToDivPixel(
            this.bounds_.getSouthWest()
          );
          const ne = overlayProjection.fromLatLngToDivPixel(
            this.bounds_.getNorthEast()
          );
          // Resize the image's div to fit the indicated dimensions.
          if (this.div_) {
            this.div_.style.left = sw.x + "px";
            this.div_.style.top = ne.y + "px";
            this.div_.style.width = ne.x - sw.x + "px";
            this.div_.style.height = sw.y - ne.y + "px";
          }
        }
        onRemove() {
          if (this.div_) {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
          }
        }
      }
      var overlay = new USGSOverlay(bounds, this.floorimage.floor2);
      overlay.setMap(this.$store.state.beaconControlMap);
    },
  },
};
</script>

<style>
#BeaconControlGoogleMap {
  height: 400px;
  width: 800px;
  background-color: gray;
}
</style>
