<template>
  <div class="AdminNode">
    <h1>실내 동선 설정 및 관리</h1>
    <div class="adminnode_menubar">
      <v-btn
        v-for="item in componentsArray"
        :key="item"
        @click="swapComponent(item)"
      >
        {{ item }}</v-btn
      >
    </div>

    <div class="adminnode_GoogleMap">
      <GoogleMap />
    </div>

    <div v-switch="component" class="adminnode_nodeInfo">
      <div v-case="'노드 추가 및 삭제'">
        <NodeControl />
      </div>
      <div v-case="'노드 연결'">
        <NodeConnect />
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap/GoogleMap";
import NodeControl from "./Node/NodeControl";
import NodeConnect from "./Node/NodeConnect";

export default {
  components: {
    GoogleMap,
    NodeControl,
    NodeConnect
  },
  data() {
    return {
      component: "노드 추가 및 삭제",
      componentsArray: ["노드 추가 및 삭제", "노드 연결"]
    };
  },
  methods: {
    swapComponent: function(item) {
      this.currentComponent = item;
      console.log(this.currentComponent);
      this.component = item;
    }
  }
};
</script>

<style>
.AdminNode {
  display: block;
}

.AdminNode .adminnode_menubar {
  padding: 10px;
}

.AdminNode .adminnode_GoogleMap {
  display: inline-block;
}

.AdminNode .adminnode_nodeInfo {
  float: right;
  width: 350px;
  background-color: chartreuse;
}
</style>
