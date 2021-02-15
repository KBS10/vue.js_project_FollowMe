<template>
  <div class="AdminNode">
    <h1>실내 동선 설정 및 관리</h1>

    <div class="adminnode_GoogleMap">
      <GoogleMap />
    </div>
    <div class="adminnode_NodeControl">
      <NodeControl />
    </div>
  </div>
</template>

<script>
import GoogleMap from "../GoogleMap/NodeControlGoogleMap";
import NodeControl from "../Admin/Node/NodeControl";
import axios from "axios";
export default {
  components: {
    GoogleMap,
    NodeControl,
  },
  data() {
    return {
      nodeImage:
        "https://user-images.githubusercontent.com/53847348/107948135-c7297700-6fd6-11eb-98d6-d618a826b52f.png",
    };
  },
  mounted() {
    this.searchNodeInfo();
  },
  methods: {
    searchNodeInfo() {
      axios
        .get(this.$store.state.url + "/api/admin/node_setting_main", {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("accesstoken"),
          },
        })
        .then((response) => {
          console.log(response);
          for (let i = 0; i < response.data.node_info.length; i++) {
            this.$store.state.NodeInfo.push(response.data.node_info[i]);
            this.addMarker(
              response.data.node_info[i].node_id,
              response.data.node_info[i].lat,
              response.data.node_info[i].lng
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addMarker(nodeId, lat, lng) {
      
      const icons = {
        url: this.nodeImage,
        scaledSize: new window.google.maps.Size(20, 25),
        anchor: new window.google.maps.Point(10, 10),
      };
      const marker = new window.google.maps.Marker({
        node_id: nodeId,
        position: { lat, lng },
        map: this.$store.state.nodeInfoMap,
        icon: icons,
      });
      this.$store.state.nodeInfoMarkers.push(marker);
    },
  },
};
</script>

