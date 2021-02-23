<template>
  <div id="NodeControl">
    <p>노드 추가</p>
    <table>
      <tr>
        <td>순번</td>
        <td>고유번호</td>
        <td>위도</td>
        <td>경도</td>
        <td>층수</td>
        <td>삭제</td>
      </tr>
      <tr v-for="(nodeInfo, i) in this.$store.state.nodeControlInfo" :key="i">
        <td>{{ i + 1 }}</td>
        <td><input type="text" v-model="nodeInfo.lat" /></td>
        <td><input type="text" v-model="nodeInfo.lng" /></td>
        <td><input type="text" v-model="nodeInfo.floor" /></td>
        <td>
          <button @click="deleteNode(i)">
            <img src="../../../img/trash.png" />
          </button>
        </td>
      </tr>
      <v-btn @click="NodeUpdate()">Node Update</v-btn>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      nodeImage:
        "https://user-images.githubusercontent.com/53847348/107948135-c7297700-6fd6-11eb-98d6-d618a826b52f.png",
      deleteNodeArray: [],
    };
  },
  mounted() {
    this.searchNodeInfo();
    this.checkNodeRole();
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
          // console.log("노드 정보 얻어오기", response);
          this.$store.state.nodeControlInfo = [];
          // Node Marker 추가
          for (let i = 0; i < response.data.node_info.length; i++) {
            this.$store.state.nodeControlInfo.push(response.data.node_info[i]);
            this.addMarker(
              response.data.node_info[i].floor,
              response.data.node_info[i].lat,
              response.data.node_info[i].lng
            );
            this.clearMarker(response.data.node_info[i].floor);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    NodeUpdate() {
      console.log("노드 업데이트 확인", this.$store.state.nodeControlInfo);
      axios
        .post(
          this.$store.state.url + "/api/admin/node_update",
          {
            node: this.$store.state.nodeControlInfo,
            node_delete : this.deleteNodeArray,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkNodeRole() {
      this.$store.state.nodeControlMap.addListener("click", (data) => {
        console.log(data);
        this.$store.state.nodeControlInfo.push({
          floor: this.$store.state.floorBuilding,
          lat: data.latLng.lat(),
          lng: data.latLng.lng(),
        });
        this.addMarker(
          this.$store.state.floorBuilding,
          data.latLng.lat(),
          data.latLng.lng()
        );
      });
      for (let i = 0; i < this.$store.state.nodeControlMarkers.length; i++) {
        this.$store.state.nodeControlMarkers[i].addListener("click", (data) => {
          console.log(data);
        });
      }
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
        map: this.$store.state.nodeControlMap,
        icon: icons,
      });
      this.$store.state.nodeControlMarkers.push(marker);
    },

    setMaponAll(map, nodefloor) {
      for (var i = 0; i < this.$store.state.nodeControlInfo.length; i++) {
        if (this.$store.state.nodeControlMarkers[i].floor != nodefloor) {
          this.$store.state.nodeControlMarkers[i].setMap(
            this.$store.state.nodeControlMap
          );
        } else {
          this.$store.state.nodeControlMarkers[i].setMap(map);
        }
      }
    },
    // 마커 하면에서 만 안보이고 배열에는 정의되어있음
    clearMarker(nodefloor) {
      this.setMaponAll(null, nodefloor);
    },

    //////////////////////////////////////////////////////////////////구현 완료
    // Sets the map on all markers in the array.
    setDeleteMaponAll(map, index) {
      this.$store.state.nodeControlMarkers[index].setMap(map);
    },
    // 마커 화면에서 만 안보이고 배열에는 정의되어있음
    deleteMarker(index) {
      this.setDeleteMaponAll(null, index);
    },
    deleteNode(index) {
      this.deleteNodeArray.push(
        this.$store.state.nodeControlInfo[index].node_id
      );
      console.log(this.deleteNodeArray);
      this.deleteMarker(index);
      this.$delete(this.$store.state.nodeControlInfo, index);
      this.$delete(this.$store.state.nodeControlMarkers, index);
    },
  },
};
</script>
