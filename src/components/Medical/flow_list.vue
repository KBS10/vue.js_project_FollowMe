<template>
  <div class="listflow">
    <h1>환자 동선 설정</h1>
    <table class="table_listflow">
      <tr>
        <td>순서</td>
        <td>호실</td>
        <td>삭제</td>
      </tr>
    </table>
    <draggable
      v-model="$store.state.rooms"
      @start="drag = true"
      @end="drag = false"
    >
      <div
        v-for="(element, i) in $store.state.rooms"
        :key="i"
        class="rooms_spans"
      >
        <span>{{ i + 1 }}</span>
        <span>{{ element.room_name }}</span>
        <span>
          <button class="beaconcontrolbutton_delete" @click="deleteRooom(i)">
            <img src="../../img/trash.png" />
          </button>
        </span>
      </div>
    </draggable>
    <v-btn @click="flow_submit"> submit </v-btn>
  </div>
</template>

<script>
import { EventBus } from "../../utils/bus";
import draggable from "vuedraggable";
import axios from "axios";
export default {
  name: "FlowList",
  components: {
    draggable,
  },
  props: {},
  data() {
    return {
      flow_sequence: 1,
    };
  },
  created() {
    EventBus.$on("room", (room) => {
      room.flow_sequence = this.flow_sequence;
      this.flow_sequence++;
      this.$store.state.rooms.push(room);
    });
  },
  mounted() {},
  methods: {
    deleteRooom(index) {
      this.$delete(this.$store.state.rooms, index);
    },
    flow_submit() {
      for (let i = 0; i < this.$store.state.rooms.length; i++) {
        this.$store.state.rooms[i].flow_sequence = i + 1;
        console.log(this.$store.state.rooms[i].flow_sequence);
      }
      console.log(this.$store.state.rooms);
      axios
        .post(
          this.$store.state.url + "/api/medical/flow_setting",
          {
            flow: this.$store.state.rooms,
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
          this.$store.state.rooms = [];
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
        EventBus.$emit("showHistory", "진료데이터 보여줌");
    },
  },
};
</script>