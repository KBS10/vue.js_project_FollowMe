<template>
  <div id="NodeInfo">
    <p>노드 거리 설정</p>
    <table>
      <tr>
        <td>순번</td>
        <td>출발점</td>
        <td>도착점</td>
        <td>거리</td>
      </tr>
      <tr v-for="(node, i) in this.$store.state.NodeDistance" :key="i">
        <td>{{ i + 1 }}</td>
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
      console.log("클릭시 노드 정보 확인", data);
      this.path.push(data);
      console.log("위치 정보 저장 데이터" + this.path);
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
      for (index in path) {
        if (path.length - 1 == index) {
          break;
        }

        let point1 = path[index];
        let point2 = path[parseInt(index) + 1];
        console.log("point1 , point2 확인 : " + point1, point2);

        let distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(point1.lat, point1.lng),
          new window.google.maps.LatLng(point2.lat, point2.lng)
        );
        result = Math.round(distance);
        let nodeDistanceObject = {
          node_A: point1.node_id,
          node_B: point2.node_id,
          distance: result,
        };
        this.$store.state.NodeDistance.push(nodeDistanceObject);
      }
      let betweenNodeDistance = result >= 1000;
      console.log(betweenNodeDistance ? result / 1000 : result);
      // console.log(betweenNodeDistance ? "km" : "m");
      this.addPolylineToMap(path);
    },
    ////////////////////////////////////////////////////////
    // 폴리 라인 그리는 메서드
    ////////////////////////////////////////////////////////
    addPolylineToMap(path) {
      const flightPath = new window.google.maps.Polyline({
        map: this.$store.state.nodeInfoMap,
        floor: this.$store.state.floorBuilding,
        path: path,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      this.clickNodePolylineCheck(flightPath);
      this.$store.state.nodePolyline.push(flightPath);
    },
    clickNodePolylineCheck(flightPath) {
      flightPath.addListener("click", (data) => {
        console.log(data);
      });
    },
    ////////////////////////////////////////////////////////
    // 노드 거리 설정 정보 서버에 보냄
    ////////////////////////////////////////////////////////
    postNodeDistance() {
      console.log("노드 거리 오브젝트 확인" + this.DistanceObject.length);

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
