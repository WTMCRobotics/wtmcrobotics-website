<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" fixed temporary right>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed height="80">
      <v-img
        :src="require(this.$vuetify.theme.dark ? './assets/logo-dark.webp' : './assets/logo-light.webp')"
        max-height="48"
        max-width="48"
        contain
      />

      <v-toolbar-title class="px-1 unselectable" style="font-size: 2rem;">
        <b>WTMC</b>
        <span style="color: var(--v-primary-base);">Robotics</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tabs v-if="this.$vuetify.breakpoint.mdAndUp" right>
        <v-tab v-for="item in items" :key="item.title" :to="item.path">{{item.title}}</v-tab>
      </v-tabs>
      <v-app-bar-nav-icon v-else @click.stop="drawer = !drawer" aria-label="Navigation"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main style="min-height: calc(100vh - 36px);">
      <router-view></router-view>
    </v-main>

    <v-slide-y-reverse-transition>
      <v-btn
        fixed
        fab
        small
        bottom
        right
        v-show="showFab"
        v-scroll="onScroll"
        @click="scroolToTop"
        color="primary"
        aria-hidden="true"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>

    <v-footer>this is a v-footer</v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
.v-tabs {
  width: min-content;
}
</style>

<style lang="scss">
body {
  overflow: hidden;
}
.unselectable {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.v-btn.on-image {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth, firestore } from "@/firebase";
import { Unsubscribe, User } from "firebase";
import { Mutation } from "vuex-class";

@Component({
  components: {}
})
export default class App extends Vue {
  showFab = false;
  drawer = null;
  items = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Gallery", path: "/gallery" },
    { title: "Sponsor", path: "/sponsor" },
    { title: "Join", path: "/join" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" }
  ];
  unsubscribe: Unsubscribe | null = null;

  @Mutation setUser!: (user: User | null) => void;

  beforeCreate() {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.$vuetify.theme.dark = darkMediaQuery.matches;
    darkMediaQuery.addEventListener("change", event => {
      this.$vuetify.theme.dark = event.matches;
    });
    this.$router.afterEach(() => window.scrollTo({ top: 0 }));
    this.unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      this.setUser(user);
      console.log("loged in as:", user);
    });
  }

  beforeDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }

  onScroll() {
    this.showFab = window.scrollY > window.innerHeight;
  }
  scroolToTop() {
    window.scrollTo({ top: Math.trunc(window.scrollY) });
    this.$vuetify.goTo(0);
  }
}
</script>
