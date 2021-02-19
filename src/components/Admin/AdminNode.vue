<template>
  <div class="AdminNode">
    <h1>실내 동선 설정 및 관리</h1>
    <div id="adminnode_button">
      <v-btn @click="checkNodeRole(true)">노드 추가 및 삭제</v-btn>
      <v-btn @click="checkNodeRole(false)">노드 거리 설정</v-btn>
    </div>
    <div class="adminnode_GoogleMap">
      <GoogleMap />
    </div>
    <div class="adminnode_NodeControl">
      <NodeControl />
    </div>
  </div>
</template>

<script>
import GoogleMap from "../GoogleMap/NodeControlGoogleMap";
import NodeControl from "../Admin/Node/NodeControl";
import axios from "axios";
export default {
  components: {
    GoogleMap,
    NodeControl,
  },
  data() {
    return {
      nodeImage:
        "https://user-images.githubusercontent.com/53847348/107948135-c7297700-6fd6-11eb-98d6-d618a826b52f.png",
      node_distance: [],
    };
  },
  mounted() {
    this.searchNodeInfo();
  },
  methods: {
    checkNodeRole(checkNodeRole) {
      if (checkNodeRole) {
        this.$store.state.nodeInfoMap.addListener("click", (data) => {
          this.addMarker(
            this.$store.state.floorBuilding,
            data.latLng.lat(),
            data.latLng.lng()
          );
          for (var i = 0; i < this.$store.state.NodeDistance.length; i++) {
            this.clearMarker(
              this.$store.state.NodeDistance[i].node_a_info.floor
            );
          }
        });
      } else {
        console.log(this.$store.state.nodeInfoMarkers);
        this.$store.state.nodeInfoMarkers.addListener("click", (data) => {
          console.log(data);
        });
      }
    },
    setMaponAll(map, nodefloor) {
      for (var i = 0; i < this.$store.state.NodeInfo.length; i++) {
        if (this.$store.state.nodeInfoMarkers[i].floor != nodefloor) {
          this.$store.state.nodeInfoMarkers[i].setMap(map);
        } else {
          this.$store.state.nodeInfoMarkers[i].setMap(
            this.$store.state.nodeInfoMap
          );
        }
      }
      for (var k = 0; k < this.$store.state.nodePolyline.length; k++) {
        if (this.$store.state.nodePolyline[k].floor != nodefloor) {
          this.$store.state.nodePolyline[k].setMap(map);
        } else {
          this.$store.state.nodePolyline[k].setMap(
            this.$store.state.nodeInfoMap
          );
        }
      }
    },
    // 마커 하면에서 만 안보이고 배열에는 정의되어있음
    clearMarker(nodefloor) {
      this.setMaponAll(null, nodefloor);
    },
    searchNodeInfo() {
      axios
        .get(this.$store.state.url + "/api/admin/node_setting_main", {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          console.log(response);
          // Node Marker 추가
          for (let i = 0; i < response.data.node_info.length; i++) {
            this.$store.state.NodeInfo.push(response.data.node_info[i]);
            this.addMarker(
              response.data.node_info[i].floor,
              response.data.node_info[i].lat,
              response.data.node_info[i].lng
            );
          }
          // Polyline A노드, B노드의 좌표 저장
          for (let i = 0; i < response.data.node_distance.length; i++) {
            this.$store.state.NodeDistance.push(response.data.node_distance[i]);
            const nodeLocation = [
              {
                lat: this.$store.state.NodeDistance[i].node_a_info.lat,
                lng: this.$store.state.NodeDistance[i].node_a_info.lng,
              },
              {
                lat: this.$store.state.NodeDistance[i].node_b_info.lat,
                lng: this.$store.state.NodeDistance[i].node_b_info.lng,
              },
            ];
            this.addPolylineToMap(
              nodeLocation,
              this.$store.state.NodeDistance[i].node_a_info.floor
            );
            this.clearMarker(
              this.$store.state.NodeDistance[i].node_a_info.floor
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addMarker(floor, lat, lng) {
      const icons = {
        url: this.nodeImage,
        scaledSize: new window.google.maps.Size(15, 15),
        anchor: new window.google.maps.Point(10, 10),
      };
      const marker = new window.google.maps.Marker({
        floor: floor,
        position: { lat, lng },
        map: this.$store.state.nodeInfoMap,
        icon: icons,
      });
      this.$store.state.nodeInfoMarkers.push(marker);
    },
    addPolylineToMap(value, floor) {
      const flightPath = new window.google.maps.Polyline({
        map: this.$store.state.nodeInfoMap,
        floor: floor,
        path: value,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      this.$store.state.nodePolyline.push(flightPath);
    },
  },
};
</script>

