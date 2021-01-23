<template>
  <div class="AdminPage">
    <!-- 메인메뉴 card-box (vTabs) -->
    <v-card-title class="adminpage_header">
      <router-link :to="{ name: 'Admin' }">
        <img
          src="../img/logo.png"
          class="AdminPage_logo"
          width="200"
          height="50"
        />
      </router-link>
      <v-tabs class="admin_menubar" v-model="tab">
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-card-title>
    <hr />
    <!-- 메인메뉴 card-box (vTabs) -->

    <!-- 메인template card-box (vTabsItems) -->
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card v-if="item === items[0]" flat>
          <v-card-text id="AdminMain">
            <AdminMain></AdminMain>
          </v-card-text>
        </v-card>
        <v-card v-else-if="item === items[1]" flat>
          <v-card-text id="AdminBeacon">
            <AdminBeacon></AdminBeacon>
          </v-card-text>
        </v-card>
        <v-card v-else-if="item === items[2]" flat>
          <v-card-text id="AdminNode">
            <AdminNode></AdminNode>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <!-- 메인template card-box (vTabsItems) -->
  </div>
</template>

<script>
import AdminMain from "../components/Admin/AdminMain";
import AdminBeacon from "../components/Admin/AdminBeacon";
import AdminNode from "../components/Admin/AdminNode";

export default {
  components: {
    AdminMain,
    AdminBeacon,
    AdminNode
  },
  data: () => ({
    tab: null,
    items: ["Main", "비콘 설정 및 관리", "실내 동선 설정 및 관리"],
  })
};
</script>

<style>
@import url("../css/Admin.css");
</style>
