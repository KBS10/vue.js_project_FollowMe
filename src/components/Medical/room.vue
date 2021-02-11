<template>
  <div class="room">
    <div>
      <v-btn
        v-for="item in componentsArray"
        :key="item"
        @click="sortRoom(item)"
      >
        {{ item }}
      </v-btn>
    </div>
    <div>
      <div v-switch="component">
        <div v-case="'진료실'">
          <v-btn
            v-for="medical_office in medical_office_list"
            :key="medical_office.room_location_id"
            @click="flow_setting(medical_office)"
          >
            {{ medical_office.room_name }}
          </v-btn>
        </div>
        <div v-case="'검사실'">
          <v-btn
            v-for="examination_room in examination_room_list"
            :key="examination_room.room_location_id"
            @click="flow_setting(examination_room)"
          >
            {{ examination_room.room_name }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from "../../utils/bus";
export default {
  name: "Room",
  data() {
    return {
      component: "진료실",
      componentsArray: ["진료실", "검사실"],
      room_list: {},
      medical_office_list: {},
      examination_room_list: {},
    };
  },
  mounted() {
    axios
      .get(this.$store.state.url + "/api/medical/room_info", {
        headers: {
          Authorization: "Bearer " + this.$cookie.get("accesstoken"),
        },
      })
      .then((res) => {
        console.log(res)
        this.room_list = res.data.room_list;
        this.medical_office_list_set();
        this.examination_room_list_set();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    medical_office_list_set() {
      this.medical_office_list = this.room_list.filter(
        (room) => room.room_info === this.componentsArray[0]
      );
    },
    examination_room_list_set() {
      this.examination_room_list = this.room_list.filter(
        (room) => room.room_info === this.componentsArray[1]
      );
    },
    sortRoom(item) {
      this.component = item;
    },
    flow_setting(room) {
      EventBus.$emit("room", room);
    },
  },
};
</script>