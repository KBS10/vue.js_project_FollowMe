<template>
  <div class="FlowList">
    <v-btn
      text
      class="d-block"
      align="center"
      v-for="room in rooms"
      :key="room.id"
    >
      {{ room.room_name }}
    </v-btn>
    <v-btn @click="flow_submit"> submit </v-btn>
  </div>
</template>

<script>
import { EventBus } from "../../utils/bus";
import axios from "axios";
export default {
  name: "FlowList",
  components: {},
  data() {
    return {
      rooms: [],
      flow_sequence: 1,
      url: "http://172.26.3.122:8000/api",
    };
  },
  created() {
    EventBus.$on("room", (room) => {
      room.flow_sequence = this.flow_sequence;
      this.flow_sequence++;
      this.rooms.push(room);
    });
  },
  methods: {
    flow_submit() {
      axios
        .post(
          `${this.url}/medical/flow_setting`,
          { flow: this.rooms, patient_id: 13 },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((response) => {
          alert("서버에 데이터를 보냈습니다");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>