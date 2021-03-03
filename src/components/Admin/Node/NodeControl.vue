<template>
  <div id="NodeControl">
    <p>노드 추가</p>
    <table>
      <tr>
        <td>순번</td>
        <td>노드 번호</td>
        <td>위도</td>
        <td>경도</td>
        <td>층수</td>
        <td>방</td>
        <td>삭제</td>
      </tr>
      <tr v-for="(nodeInfo, i) in this.$store.state.nodeControlInfo" :key="i">
        <td>{{ i + 1 }}</td>
        <td><input type="text" v-model="nodeInfo.node_id" /></td>
        <td><input type="text" v-model="nodeInfo.lat" /></td>
        <td><input type="text" v-model="nodeInfo.lng" /></td>
        <td><input type="text" v-model="nodeInfo.floor" /></td>
        <td>
          <select
            style="width: 200px; height: 25px"
            @change="room_change(i, $event)"
            class="form-control"
          >
            >
            <option
              name="room"
              v-for="(room, j) in room_list"
              :key="j"
              :selected="
                room.room_location_id === nodeInfo.room_id ? true : false
              "
              :value="room.room_location_id"
              :disabled="
                room.check == 1 && room.room_location_id !== nodeInfo.room_id
                  ? true
                  : false
              "
            >
              {{ room.room_name }}
            </option>
            <option :selected="nodeInfo.room_id === null ? true : false">
              없음
            </option>
          </select>
        </td>
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
      room_list: [], //방 전체 목록
    };
  },
  mounted() {
    this.searchNodeControl();
    this.checkNodeRole();
  },
  watch: {
    room_list: function (newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    },
  },
  methods: {
    checkNodeRole() {
      this.$store.state.nodeControlMap.addListener("click", (data) => {
        console.log(data);
        this.$store.state.nodeControlInfo.push({
          floor: this.$store.state.floorBuilding,
          node_id : null,
          lat: data.latLng.lat(),
          lng: data.latLng.lng(),
        });
        this.addNodecontrolMarker(
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
    searchNodeControl() {
      axios
        .get(this.$store.state.url + "/api/admin/node_setting_main", {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          // console.log("노드 정보 얻어오기", response);

          this.$store.state.nodeControlMarkers = [];
          this.$store.state.nodeControlInfo = [];
          // Node Marker 추가
          for (let i = 0; i < response.data.node_info.length; i++) {
            this.$store.state.nodeControlInfo.push(response.data.node_info[i]);
            this.addNodecontrolMarker(
              response.data.node_info[i].floor,
              response.data.node_info[i].lat,
              response.data.node_info[i].lng,
              i
            );
            this.clearNodeControlMarker(response.data.node_info[i].floor);
          }
          //방 정보
          this.room_list = response.data.room_list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    attachSecretMessage(marker, secretMessage,index) {
      const infoWindowMessage =
        "위도 : " + secretMessage.lat + "경도 : " + secretMessage.lng;
      const infowindow = new window.google.maps.InfoWindow({
        content: infoWindowMessage,
      });
      marker.addListener("mouseover", () => {
        infowindow.open(marker.get("map"), marker);
      });
      marker.addListener("click", () => {
      this.deleteNode(index);
      });
    },
    addNodecontrolMarker(floor, lat, lng, index) {
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
      this.attachSecretMessage(
        marker,
        this.$store.state.nodeControlInfo[index],
        index
      );
    },

    setNodeControlMap(map, nodefloor) {
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
    clearNodeControlMarker(nodefloor) {
      this.setNodeControlMap(null, nodefloor);
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

    //방 변경 이벤트
    room_change(i, event) {
      let room_id = event.target.value;
      let room_index = event.target.selectedIndex;
      console.log(this.room_list);
      console.log(this.$store.state.nodeControlInfo[i]["room_id"]);
      if (room_id == "없음") {
        let room_previous_index = (element) =>
          element.room_location_id ==
          this.$store.state.nodeControlInfo[i]["room_id"];
        room_id = null;
        this.room_list[this.room_list.findIndex(room_previous_index)].check = 0;
      } else {
        this.room_list[room_index].check = 1;
      }
      this.$store.state.nodeControlInfo[i]["room_id"] = room_id;
    },

    NodeUpdate() {
      console.log(this.$store.state.nodeControlInfo);
      console.log(this.room_list);
      axios
        .post(
          this.$store.state.url + "/api/admin/node_update",
          {
            node: this.$store.state.nodeControlInfo,
            node_delete: this.deleteNodeArray,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((response) => {
          console.log("노드 Update" + response);
          this.deleteNodeArray = [];
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>