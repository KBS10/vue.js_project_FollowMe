<template>
  <div id="NodeControl">
    <p>노드 추가</p>
     <table>
      <tr>
        <td>순번</td>
        <td>위도</td>
        <td>경도</td>
        <td>층수</td>
      </tr>
      <tr v-for="(nodeInfo, i) in this.$store.state.NodeInfo" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ nodeInfo.lat }}</td>
        <td>{{ nodeInfo.lng }}</td>
        <td>{{ nodeInfo.floor }}</td>
        <td></td>
      </tr>
    </table>
    <table>
      <tr>
        <td>순번</td>
        <td>출발점</td>
        <td>도착점</td>
        <td>거리</td>
        <td>층수</td>
      </tr>
      <tr v-for="(node, i) in this.$store.state.NodeDistance" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ node.node_A }}</td>
        <td>{{ node.node_B }}</td>
        <td>{{ node.distance }}</td>
        <td>{{ node.node_a_info.floor }}</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$store.state.NodeDistance)
  }
};
</script>
