<template>
  <div class="AdminNodeRoomControl">
    <h1>노드 방 설정</h1>
    <v-btn @click="plusNodeRoom()">노드 방 추가</v-btn>
    <table>
      <tr>
        <td>순번</td>
        <td>방 노드 번호</td>
        <td>방 번호</td>
        <td>방 이름</td>
        <td>삭제</td>
      </tr>
      <tr v-for="(nodeRoom, i) in this.nodeRoomList" :key="i">
        <!-- <td>{{ i + 1 }}</td> -->
        <td>{{ nodeRoom.room_location_id }}</td>
        <td><input type="text" v-model="nodeRoom.room_node" /></td>
        <td><input type="text" v-model="nodeRoom.room_name" /></td>
        <td><input type="text" v-model="nodeRoom.room_info" /></td>
        <button class="beaconcontrolbutton_delete" @click="deleteNodeRoom(i)">
          <img src="../../../img/trash.png" />
        </button>
      </tr>
      <v-btn @click="nodeRoomUpdate()">노드 방 설정</v-btn>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      nodeRoomList: [],
    };
  },
  mounted() {
    this.searchNodeRoomInfo();
  },
  methods: {
    searchNodeRoomInfo() {
      axios
        .get(this.$store.state.url + "/api/admin/room_info", {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          this.nodeRoomList = response.data.room_list;
          console.log(this.nodeRoomList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    nodeRoomUpdate() {
      axios
        .post(
          this.$store.state.url + "/api/admin/room_update",
          {
            room_list: this.nodeRoomList,
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
    plusNodeRoom() {
      let roomLength = this.nodeRoomList.length - 1;
      let count = this.nodeRoomList[roomLength].room_location_id + 1;
      const roomInfo = {
        room_location_id: count,
        room_node: "",
        room_name: "",
        room_info: "",
      };
      this.nodeRoomList.push(roomInfo);
      console.log(this.nodeRoomList)
    },
    deleteNodeRoom(index) {
      this.$delete(this.nodeRoomList, index);
    },
  },
};
</script>

