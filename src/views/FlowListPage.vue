<template>
  <div class="FlowListPage">
    <div class="room">
      <Room />
    </div>
    <div class="flowlist">
      <FlowList />
    </div>
  </div>
</template>

<script>
import Room from "@/components/Medical/room.vue";
import FlowList from "@/components/Medical/flow_list.vue";
export default {
  name: "Home",
  components: {
    Room,
    FlowList,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
@import url("../css/flowList.css");
</style>