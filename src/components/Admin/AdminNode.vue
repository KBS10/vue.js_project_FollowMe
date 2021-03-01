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
          <div v-case="'노드 방 설정'">
            <NodeRoomControl />
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
import NodeRoomControl from "../Admin/Node/NodeRoomControl";
import axios from "axios";
import { EventBus } from "../../utils/bus";
export default {
  components: {
    NodeControlGoogleMap,
    NodeInfoGoogleMap,
    NodeControl,
    NodeInfo,
    NodeRoomControl,
  },
  data() {
    return {
      eventOn: true,
      component: "노드 추가 및 삭제",
      componentsArray: ["노드 추가 및 삭제", "노드 거리 설정", "노드 방 설정"],
      nodeImage:
        "https://user-images.githubusercontent.com/53847348/107948135-c7297700-6fd6-11eb-98d6-d618a826b52f.png",
      node_distance: [],
      deleteNodeArray: [],
    };
  },
  mounted() {
    this.searchNodeInfo();
  },
  methods: {
    ////////////////////////////////////////////////////////
    // 실내 동선 설정 페이지 아이콘 설정
    ////////////////////////////////////////////////////////
    swapComponent(item) {
      this.component = item;
      console.log(this.component);
      if (this.component == "노드 추가 및 삭제") {
        this.eventOn = true;
      } else if (this.component == "노드 거리 설정") {
        this.eventOn = false;
      }
    },
    /////////////////////////////////////////////////////////////////
    // 노드 정보 찾기 함수
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
          // console.log("노드 정보 : ", response);
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
              this.$store.state.NodeDistance[i].distance_id,
              nodeLocation,
              this.$store.state.NodeDistance[i].node_a_info.floor
            );
            this.clearDistanceMarker(
              this.$store.state.NodeDistance[i].node_a_info.floor
            );
          }
          // console.log(this.$store.state.NodeDistance);
          // console.log(this.$store.state.nodePolyline);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ////////////////////////////////////////////////////////
    // 1층, 2층 구별해서 마커및 폴리라인 설정 함수
    ////////////////////////////////////////////////////////
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
    ////////////////////////////////////////////////////////
    // 노드 정보 배열에 추가하는 함수
    ////////////////////////////////////////////////////////
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
      this.clickNodeMarkerCheck(marker, node_id);
    },
    ////////////////////////////////////////////////////////
    // 노드 폴리라인 배열에 추가하는 함수
    ////////////////////////////////////////////////////////
    addPolylineToMap(distance_id, path, floor) {
      const flightPath = new window.google.maps.Polyline({
        map: this.$store.state.nodeInfoMap,
        distance_id: distance_id,
        floor: floor,
        path: path,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 6,
      });
      this.$store.state.nodePolyline.push(flightPath);
      this.clickNodePolylineCheck(flightPath, distance_id);
    },
    ////////////////////////////////////////////////////////
    // 노드 마커 클릭시 실행되는 함수
    ////////////////////////////////////////////////////////
    clickNodeMarkerCheck(marker, node_id) {
      marker.addListener("click", (data) => {
        console.log(data);
        const nodeDistanceMarker = {
          node_id: node_id,
          lat: data.latLng.lat(),
          lng: data.latLng.lng(),
        };
        EventBus.$emit("eventNodeDistanceData", nodeDistanceMarker);
      });
    },
    ////////////////////////////////////////////////////////
    // 노드 폴리라인 클릭시 실행되는 함수
    ////////////////////////////////////////////////////////
    clickNodePolylineCheck(flightPath, distance_id) {
      flightPath.addListener("click", () => {
        console.log("click 시 polyline 데이터 확인" + distance_id);
        this.deleteNodePolyline(distance_id);
      });

      flightPath.addListener("mouseover", () => {});
    },
    ////////////////////////////////////////////////////////
    // 노드 폴리라인 삭제 함수
    ////////////////////////////////////////////////////////
    deleteNodePolyline(distance_id) {
      console.log("polyline 고유 id 값 : " + distance_id);
      for (let i = 0; i < this.$store.state.NodeDistance.length; i++) {
        if (this.$store.state.NodeDistance[i].distance_id === distance_id) {
          this.deletePolyline(i);
          this.$delete(this.$store.state.nodePolyline, i);
          this.$delete(this.$store.state.NodeDistance, i);
        }
      }
    },
    setDeletePolylineMap(map, index) {
      this.$store.state.nodePolyline[index].setMap(map);
    },
    // 마커 화면에서 만 안보이고 배열에는 정의되어있음
    deletePolyline(index) {
      this.setDeletePolylineMap(null, index);
    },
  },
};
</script>

<style>
.adminNode_menubar {
  margin: 20px;
}
</style>