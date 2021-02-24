<template>
  <div class="AdminNode">
    <h1>실내 동선 설정 및 관리</h1>
    <div class="adminNode_menubar">
      <v-btn
        v-for="item in componentsArray"
        :key="item"
        @click="swapComponent(item)"
      >
        {{ item }}
      </v-btn>
    </div>

    <div class="adminnode_content">
      <!-- 비콘을 설정할 수 있는 지도 표시 -->
      <div class="adminnode_GoogleMap">
        <div v-switch="component">
          <div v-case="'노드 추가 및 삭제'">
            <NodeControlGoogleMap :handelOnClick="eventOn" />
          </div>
          <div v-case="'노드 거리 설정'">
            <NodeInfoGoogleMap />
          </div>
        </div>
      </div>

      <div>
        <div v-switch="component">
          <div v-case="'노드 추가 및 삭제'">
            <NodeControl />
          </div>
          <div v-case="'노드 거리 설정'">
            <NodeInfo />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NodeControlGoogleMap from "../GoogleMap/NodeControlGoogleMap";
import NodeInfoGoogleMap from "../GoogleMap/NodeInfoGoogleMap";
import NodeControl from "../Admin/Node/NodeControl";
import NodeInfo from "../Admin/Node/NodeInfo";
import axios from "axios";
import { EventBus } from "../../utils/bus";
export default {
  components: {
    NodeControlGoogleMap,
    NodeInfoGoogleMap,
    NodeControl,
    NodeInfo,
  },
  data() {
    return {
      eventOn: true,
      component: "노드 추가 및 삭제",
      componentsArray: ["노드 추가 및 삭제", "노드 거리 설정"],
      nodeImage:
        "https://user-images.githubusercontent.com/53847348/107948135-c7297700-6fd6-11eb-98d6-d618a826b52f.png",
      node_distance: [],
      deleteNodeArray: [],
    };
  },
  mounted() {},
  methods: {
    swapComponent(item) {
      this.component = item;
      console.log(this.component);
      if (this.component == "노드 추가 및 삭제") {
        this.eventOn = true;
      } else if (this.component == "노드 거리 설정") {
        this.eventOn = false;
        this.searchNodeInfo();
      }
    },
    attachSecretMessage(marker, node_id) {
      marker.addListener("click", (data) => {
        // console.log(
        //   "node_id : ",
        //   node_id,
        //   "lat : ",
        //   data.latLng.lat(),
        //   " lng : ",
        //   data.latLng.lng()
        // );
        const nodeDistanceMarker = {
          node_id: node_id,
          lat: data.latLng.lat(),
          lng: data.latLng.lng(),
        };
        EventBus.$emit("eventNodeDistanceData", nodeDistanceMarker);
      });
    },
    /////////////////////////////////////////////////////////////////
    // 노드 인포 페이지 함수
    ////////////////////////////////////////////////////////////////
    searchNodeInfo() {
      axios
        .get(this.$store.state.url + "/api/admin/node_distance_setting_main", {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          this.$store.state.NodeInfoInfo = [];
          this.$store.state.nodeDistanceMarkers = [];
          this.$store.state.NodeDistance = [];
          this.$store.state.nodePolyline = [];
          console.log("노드 정보 : ", response);
          // console.log("노드 길이 : ", response.data.node_info.length);
          // console.log(
          //   "노드 간의 거리 길이 : ",
          //   response.data.node_distance.length
          // );
          // Node Marker 추가
          for (let i = 0; i < response.data.node_info.length; i++) {
            this.$store.state.NodeInfoInfo.push(response.data.node_info[i]);
            this.addDistanceMarker(
              response.data.node_info[i].floor,
              response.data.node_info[i].lat,
              response.data.node_info[i].lng,
              response.data.node_info[i].node_id
            );
          }
          // Polyline A노드, B노드의 좌표 저장
          for (let i = 0; i < response.data.node_distance.length; i++) {
            // console.log(response.data.node_distance[i]);
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
            this.clearDistanceMarker(
              this.$store.state.NodeDistance[i].node_a_info.floor
            );
          }

          // console.log("노드 간의 거리 길이 : ", this.$store.state.NodeDistance);
          // console.log("노드 간의 거리 길이 : ", this.$store.state.nodePolyline);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setDistanceMap(map, nodefloor) {
      for (var i = 0; i < this.$store.state.NodeInfoInfo.length; i++) {
        if (this.$store.state.nodeDistanceMarkers[i].floor != nodefloor) {
          this.$store.state.nodeDistanceMarkers[i].setMap(map);
        } else {
          this.$store.state.nodeDistanceMarkers[i].setMap(
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
    clearDistanceMarker(nodefloor) {
      this.setDistanceMap(null, nodefloor);
    },
    addDistanceMarker(floor, lat, lng, node_id) {
      const icons = {
        url: this.nodeImage,
        scaledSize: new window.google.maps.Size(15, 15),
        anchor: new window.google.maps.Point(10, 10),
      };
      const marker = new window.google.maps.Marker({
        floor: floor,
        position: { lat, lng },
        node_id: node_id,
        map: this.$store.state.nodeInfoMap,
        icon: icons,
      });
      this.$store.state.nodeDistanceMarkers.push(marker);
      // Node Distance Marker Click Event
      this.attachSecretMessage(marker, node_id);
    },
    addPolylineToMap(value, floor) {
      const flightPath = new window.google.maps.Polyline({
        map: this.$store.state.nodeInfoMap,
        floor: floor,
        path: value,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 6,
      });
      this.$store.state.nodePolyline.push(flightPath);
    },
  },
};
</script>

