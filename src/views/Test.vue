<template>
  <div class="home">
    <Room />
    <FlowList />
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