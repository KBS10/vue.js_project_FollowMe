<template>
  <div class="listflow">
    <h1>환자 동선 설정</h1>
    <grid
      :draggable="true"
      :sortable="true"
      :items="rooms"
      :height="100"
      :width="100"
    >
      <template slot="cell" scope="rooms">
        <v-btn>{{ rooms.item.room_name }}</v-btn>
      </template>
    </grid>
    <v-btn @click="flow_submit"> submit </v-btn>
  </div>
</template>

<script>
import { EventBus } from "../../utils/bus";
import axios from "axios";
export default {
  name: "FlowList",
  components: {},
  props: {
    gridWidth: {
      type: Number,
      default: -1,
    },
    cellWidth: {
      type: Number,
      default: 80,
    },
    cellHeight: {
      type: Number,
      default: 80,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    dragDelay: {
      type: Number,
      default: 0,
    },
    sortable: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rooms : [],
      flow_sequence: 1,
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
      console.log(this.rooms)
      axios
        .post(
          this.$store.state.url + "/api/medical/flow_setting",
          {
            flow: this.rooms,
            patient_id: this.$store.state.patient_Info.patient.patient_id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("accesstoken"),
            },
          }
        )
        .then((response) => {
          this.$store.state.checkMedicalRoute = false;
          this.rooms = [];
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>