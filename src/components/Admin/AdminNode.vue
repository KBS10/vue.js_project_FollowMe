<template>
  <div class="AdminNode">
    <h1>실내 동선 설정 및 관리</h1>

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

