<template>
  <div class="AdminNode">
    <h1>실내 동선 설정 및 관리</h1>
    <div class="adminNode_menubar">
      <v-btn
        v-for="item in componentsArray"
        :key="item"
        @click="swapComponent(item)"
      >
        {{ item }}
      </v-btn>
    </div>

    <div class="adminnode_content">
      <!-- 비콘을 설정할 수 있는 지도 표시 -->
      <div class="adminnode_GoogleMap">
        <div v-switch="component">
          <div v-case="'노드 추가 및 삭제'">
            <NodeControlGoogleMap :handelOnClick="eventOn" />
          </div>
          <div v-case="'노드 거리 설정'">
            <NodeInfoGoogleMap />
          </div>
        </div>
      </div>

       <div>
        <div v-switch="component">
          <div v-case="'노드 추가 및 삭제'">
            <NodeControl />
          </div>
          <div v-case="'노드 거리 설정'">
            <NodeInfo />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NodeControlGoogleMap from "../GoogleMap/NodeControlGoogleMap";
import NodeInfoGoogleMap from "../GoogleMap/NodeInfoGoogleMap";
import NodeControl from "../Admin/Node/NodeControl";
import NodeInfo from "../Admin/Node/NodeInfo"
export default {
  components: {
    NodeControlGoogleMap,
    NodeInfoGoogleMap,
    NodeControl,
    NodeInfo
  },
  data() {
    return {
      eventOn: true,
      component: "노드 추가 및 삭제",
      componentsArray: ["노드 추가 및 삭제", "노드 거리 설정"],
      nodeImage:
        "https://user-images.githubusercontent.com/53847348/107948135-c7297700-6fd6-11eb-98d6-d618a826b52f.png",
      node_distance: [],
    };
  },
  mounted() {
  },
  methods: {
    swapComponent(item) {
      this.component = item;
      console.log(this.component);
      if (this.component == "노드 추가 및 삭제") {
        this.eventOn = true;
      } else if (this.component == "노드 거리 설정") {
        this.eventOn = false;
      }
    },
  },
};
</script>

