<template>
  <div id="NodeInfo">
    <p>노드 거리 설정</p>
    <table>
      <tr>
        <td>순번</td>
        <td>교유 번호</td>
        <td>출발점</td>
        <td>도착점</td>
        <td>거리</td>
      </tr>
      <tr v-for="(node, i) in this.$store.state.NodeDistance" :key="i">
        <td>{{ i + 1 }}</td>
        <td><input type="text" v-model="node.distance_id" /></td>
        <td><input type="text" v-model="node.node_A" /></td>
        <td><input type="text" v-model="node.node_B" /></td>
        <td><input type="text" v-model="node.distance" /></td>
      </tr>
    </table>
    <v-btn @click="postNodeDistance()">노드 거리 설정</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from "../../../utils/bus";
export default {
  data() {
    return {
      nodeImage:
        "https://user-images.githubusercontent.com/53847348/107948135-c7297700-6fd6-11eb-98d6-d618a826b52f.png",
      path: [],
      DistanceObject: [],
    };
  },
  mounted() {
    // this.searchNodeInfo();
    EventBus.$on("eventNodeDistanceData", (data) => {
      if (this.path.length > 1) {
        this.path = [];
      }
      this.path.push(data);
      this.displayMapObject(this.path);
    });
  },
  methods: {
    displayMapObject(pathData) {
      this.calculateDistance(pathData);
    },
    ////////////////////////////////////////////////////////
    // 노드 간의 거리 구하는 메서드
    ////////////////////////////////////////////////////////
    calculateDistance(path) {
      let result = 0;
      let index = 0;
      let distance_id;
      for (index in path) {
        if (path.length - 1 == index) {
          break;
        }

        let point1 = path[index];
        let point2 = path[parseInt(index) + 1];

        let distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(point1.lat, point1.lng),
          new window.google.maps.LatLng(point2.lat, point2.lng)
        );
        result = Math.round(distance);
        let distanceLength = this.$store.state.NodeDistance.length;
        distance_id =
          this.$store.state.NodeDistance[distanceLength - 1].distance_id + 1;
        let nodeDistanceObject = {
          distance_id: distance_id,
          node_A: point1.node_id,
          node_B: point2.node_id,
          distance: result,
        };
        this.$store.state.NodeDistance.push(nodeDistanceObject);
      this.addPolylineToMap(path, distance_id);
      }
      let betweenNodeDistance = result >= 1000;
      console.log(betweenNodeDistance ? result / 1000 : result);
      // console.log(betweenNodeDistance ? "km" : "m");
    },
    ////////////////////////////////////////////////////////
    // 폴리 라인 그리는 메서드
    ////////////////////////////////////////////////////////
    addPolylineToMap(path, distance_id) {
      const flightPath = new window.google.maps.Polyline({
        map: this.$store.state.nodeInfoMap,
        floor: this.$store.state.floorBuilding,
        distance_id: distance_id,
        path: path,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 5,
      });
      this.$store.state.nodePolyline.push(flightPath);
      this.clickNodePolylineCheck(flightPath, distance_id);
    },
    clickNodePolylineCheck(flightPath, distance_id) {
      flightPath.addListener("click", () => {
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
      console.log("Index 확인 : " + this.$store.state.NodeDistance.length);
    },
    setDeletePolylineMap(map, index) {
      this.$store.state.nodePolyline[index].setMap(map);
    },
    // 마커 화면에서 만 안보이고 배열에는 정의되어있음
    deletePolyline(index) {
      this.setDeletePolylineMap(null, index);
    },
    ////////////////////////////////////////////////////////
    // 노드 거리 설정 정보 서버에 보냄
    ////////////////////////////////////////////////////////
    postNodeDistance() {
      axios
        .post(
          this.$store.state.url + "/api/admin/node_distance_update",
          {
            node_distance: this.$store.state.NodeDistance,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((response) => {
          console.log(" 노드 거리 정보 확인 ", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
