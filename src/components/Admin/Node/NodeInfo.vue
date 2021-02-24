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
      nodeDistanceArray: [],
    };
  },
  mounted() {
    // this.searchNodeInfo();
    EventBus.$on("eventNodeDistanceData", (data) => {
      console.log("클릭시 노드 정보 확인",data);
      // this.nodeDistanceArray.push(data);
      // if (this.nodedistanceArray.length > 2) {
      //   for (let i = 0; i < this.nodeDistanceArray.length; i++) {
      //     const nodePoly = [
      //       {
      //         lat: this.nodedistanceArray[i].lat,
      //         lng: this.nodedistanceArray[i].lng,
      //       },
      //       {
      //         lat: this.nodeDistanceArray[i + 1].lat,
      //         lng: this.nodedistanceArray[i + 1].lng,
      //       },
      //     ];
      //     this.addPolylineToMap(nodePoly);
      //   }
      // }
    });
  },
  methods: {
    addPolylineToMap(value) {
      const flightPath = new window.google.maps.Polyline({
        map: this.$store.state.nodeInfoMap,
        floor: this.$store.state.floorBuilding,
        path: value,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      this.nodePoly.push(flightPath);
    },
    postNodeDistance() {
      axios
        .get(this.$store.state.url + "/api/admin/node_distance_update", {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          console.log(" 노드 거리 정보 확인 ", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // attachSecretMessage(marker, node_id) {
    //   marker.addListener("click", (data) => {
    //     console.log(data);
    //     console.log(
    //       "node_id : ",
    //       node_id,
    //       "lat : ",
    //       data.latLng.lat(),
    //       " lng : ",
    //       data.latLng.lng()
    //     );
    //   });
    // },
    // searchNodeInfo() {
    //   axios
    //     .get(this.$store.state.url + "/api/admin/node_distance_setting_main", {
    //       headers: {
    //         Authorization: "Bearer " + this.$cookie.get("accesstoken"),
    //       },
    //     })
    //     .then((response) => {
    //       this.$store.state.NodeInfoInfo = [];
    //       console.log("노드 정보 : ", response);
    //       // console.log("노드 길이 : ", response.data.node_info.length);
    //       // console.log(
    //       //   "노드 간의 거리 길이 : ",
    //       //   response.data.node_distance.length
    //       // );
    //       // Node Marker 추가
    //       for (let i = 0; i < response.data.node_info.length; i++) {
    //         this.$store.state.NodeInfoInfo.push(response.data.node_info[i]);
    //         this.addMarker(
    //           response.data.node_info[i].floor,
    //           response.data.node_info[i].lat,
    //           response.data.node_info[i].lng,
    //           response.data.node_info[i].node_id
    //         );
    //       }
    //       // Polyline A노드, B노드의 좌표 저장
    //       for (let i = 0; i < response.data.node_distance.length; i++) {
    //         // console.log(response.data.node_distance[i]);
    //         this.$store.state.NodeDistance.push(response.data.node_distance[i]);
    //         const nodeLocation = [
    //           {
    //             lat: this.$store.state.NodeDistance[i].node_a_info.lat,
    //             lng: this.$store.state.NodeDistance[i].node_a_info.lng,
    //           },
    //           {
    //             lat: this.$store.state.NodeDistance[i].node_b_info.lat,
    //             lng: this.$store.state.NodeDistance[i].node_b_info.lng,
    //           },
    //         ];
    //         this.addPolylineToMap(
    //           nodeLocation,
    //           this.$store.state.NodeDistance[i].node_a_info.floor
    //         );
    //         this.clearMarker(
    //           this.$store.state.NodeDistance[i].node_a_info.floor
    //         );
    //       }

    //       // console.log("노드 간의 거리 길이 : ", this.$store.state.NodeDistance);
    //       // console.log("노드 간의 거리 길이 : ", this.$store.state.nodePolyline);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // setMaponAll(map, nodefloor) {
    //   for (var i = 0; i < this.$store.state.NodeInfoInfo.length; i++) {
    //     if (this.$store.state.nodeDistanceMarkers[i].floor != nodefloor) {
    //       this.$store.state.nodeDistanceMarkers[i].setMap(map);
    //     } else {
    //       this.$store.state.nodeDistanceMarkers[i].setMap(
    //         this.$store.state.nodeInfoMap
    //       );
    //     }
    //   }
    //   for (var k = 0; k < this.$store.state.nodePolyline.length; k++) {
    //     if (this.$store.state.nodePolyline[k].floor != nodefloor) {
    //       this.$store.state.nodePolyline[k].setMap(map);
    //     } else {
    //       this.$store.state.nodePolyline[k].setMap(
    //         this.$store.state.nodeInfoMap
    //       );
    //     }
    //   }
    // },
    // clearMarker(nodefloor) {
    //   this.setMaponAll(null, nodefloor);
    // },
    // addMarker(floor, lat, lng, node_id) {
    //   const icons = {
    //     url: this.nodeImage,
    //     scaledSize: new window.google.maps.Size(15, 15),
    //     anchor: new window.google.maps.Point(10, 10),
    //   };
    //   const marker = new window.google.maps.Marker({
    //     floor: floor,
    //     position: { lat, lng },
    //     node_id: node_id,
    //     map: this.$store.state.nodeInfoMap,
    //     icon: icons,
    //   });
    //   this.$store.state.nodeDistanceMarkers.push(marker);
    //   // Node Distance Marker Click Event
    //   this.attachSecretMessage(marker, node_id);
    // },
  },
};
</script>
