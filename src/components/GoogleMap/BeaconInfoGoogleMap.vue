<template>
  <div class="BeaconInfoGoogleMap">
    <div id="BeaconInfoGoogleMap"></div>
    <div>
      <v-btn @click="floorClick(1)">1층</v-btn>
      <v-btn @click="floorClick(2)">2층</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["handelOnClick"],
  data: () => ({
    eventOn: false,
    // Google Map 객체 저장
    // map: null,
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
      for (var i = 0; i < this.$store.state.AdminInfoBeacon.length; i++) {
        if (this.$store.state.beaconInfoMarkers[i].floor != beaconfloor) {
          this.$store.state.beaconInfoMarkers[i].setMap(map);
        } else {
          this.$store.state.beaconInfoMarkers[i].setMap(
            this.$store.state.beaconInfoMap
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
      } else if (this.$store.state.floorBuilding == 2) {
        overlay = new USGSOverlay(bounds, this.floorimage.floor3);
        this.majorBeacon = 2;
        this.clearMarker(this.majorBeacon);
      }
      overlay.setMap(this.$store.state.beaconInfoMap);
    },
    initMap() {
      this.$store.state.beaconInfoMap = new window.google.maps.Map(
        document.getElementById("BeaconInfoGoogleMap"),
        this.mapOptions
      );

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
      const overlay = new USGSOverlay(bounds, this.floorimage.floor2);
      overlay.setMap(this.$store.state.beaconInfoMap);
    },
  },
};
</script>

<style>
#BeaconInfoGoogleMap {
  height: 400px;
  width: 800px;
  background-color: gray;
}
</style>
