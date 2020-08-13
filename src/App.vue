<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app absolute scroll-target="#scroll" height="80">
      <v-img
        :src="require(this.$vuetify.theme.dark ? './assets/logo-dark.png' : './assets/logo-light.png')"
        max-height="48"
        max-width="48"
        contain
      />

      <v-toolbar-title class="px-1" style="font-size: 2rem;">
        <b>WTMC</b>
        <span style="color: var(--v-primary-base);">Robotics</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tabs v-if="this.$vuetify.breakpoint.mdAndUp" right>
        <v-tab v-for="item in items" :key="item.title" :to="item.path">{{item.title}}</v-tab>
      </v-tabs>
      <v-app-bar-nav-icon v-else @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <div id="scroll" style="height:100vh;" class="overflow-y-auto">
      <v-main style="min-height: calc(100vh - 36px);">
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
      <v-footer>this is a v-footer</v-footer>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.v-tabs {
  width: min-content;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    console.log(this.$vuetify.theme.dark);
  },
  name: "App",

  beforeCreate() {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", event => {
        this.$vuetify.theme.dark = event.matches;
      });
  },

  components: {},

  data: () => ({
    drawer: null,
    items: [
      { title: "Home", path: "/" },
      { title: "About", path: "/about" },
      { title: "Gallery", path: "/gallery" },
      { title: "Sponsor", path: "/sponsor" },
      { title: "Join", path: "/join" },
      { title: "Blog", path: "/blog" },
      { title: "Contact", path: "/contact" }
    ]
  })
});
</script>
