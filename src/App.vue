<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" fixed temporary right>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      fixed
      height="80"
      :class="{
        scrollable,
        'safe-pad-top': true,
        'safe-pad-left': true,
        'safe-pad-right': true
      }"
    >
      <router-link to="/" class="home" tabindex="-1">
        <v-img
          :src="
            require(this.$vuetify.theme.dark
              ? './assets/logo-dark.webp'
              : './assets/logo-light.webp')
          "
          height="48"
          width="48"
          contain
        />
        <v-toolbar-title class="px-1 unselectable" style="font-size: 2rem;">
          <b>WTMC</b>
          <span style="color: var(--v-primary-base);">Robotics</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-tabs v-if="this.$vuetify.breakpoint.mdAndUp" right>
        <v-tab v-for="item in items" :key="item.title" :to="item.path">{{
          item.title
        }}</v-tab>
      </v-tabs>
      <v-app-bar-nav-icon
        v-else
        @click.stop="drawer = !drawer"
        aria-label="Navigation"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main
      style="min-height: calc(100vh - 36px);"
      class="safe-mar-left safe-mar-right"
    >
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
        @click="scrollToTop"
        color="primary"
        aria-hidden="true"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>

    <v-footer class="safe-pad-bottom safe-pad-left safe-pad-right"
      >this is a v-footer</v-footer
    >
  </v-app>
</template>

<style lang="scss" scoped>
.home {
  text-decoration: inherit;
  color: inherit;
  display: flex;
}
.v-tabs {
  width: min-content;
}
body.style-scrollbars header:not(.scrollable) {
  padding-right: 12px;
}
</style>

<style lang="scss">
html {
  overflow-y: auto !important;
}
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
body.style-scrollbars,
body.style-scrollbars * {
  --track: #e2e2e2;
  --thumb: #bebebe;
  @media (prefers-color-scheme: dark) {
    --track: #323232;
    --thumb: #565656;
  }
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--track);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--thumb);
    border-radius: 6px;
  }
}
body.style-scrollbars::-webkit-scrollbar-track {
  border-radius: 0;
}
.v-input.theme--dark input:-webkit-autofill {
  filter: grayscale(1) invert(1);
}
.v-input.theme--light input:-webkit-autofill {
  filter: grayscale(1) contrast(2);
}
.safe-pad-top {
  padding-top: env(safe-area-inset-top);
}
.safe-pad-bottom {
  padding-bottom: env(safe-area-inset-bottom);
  &.v-footer {
    padding-right: max(env(safe-area-inset-bottom), 6px);
  }
}
.safe-pad-left {
  padding-left: env(safe-area-inset-left);
  &.v-footer {
    padding-left: max(env(safe-area-inset-left), 16px);
  }
}
.safe-pad-right {
  padding-right: env(safe-area-inset-right);
  &.v-footer {
    padding-right: max(env(safe-area-inset-right), 16px);
  }
}
.safe-mar-left {
  margin-left: env(safe-area-inset-left);
}
.safe-mar-right {
  margin-right: env(safe-area-inset-right);
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth, Claims } from "@/firebase";
import { Unsubscribe, User } from "firebase";
import { Mutation } from "vuex-class";
import Meta from "vue-meta";

Vue.use(Meta);

@Component({
  metaInfo: {
    title: "WTMC Robotics",
    titleTemplate: "%s | WTMC Robotics"
  }
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

  scrollable = true;

  @Mutation setUser!: (user: User | null) => void;
  @Mutation handleClaims!: (claims: Claims) => void;

  constructor() {
    super();
    this.unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      this.setUser(user);
      console.log("loged in as:", user);
      if (user) {
        user?.getIdTokenResult().then(idTokenResult => {
          // this.handleClaims(idTokenResult.claims);
          this.handleClaims({ isEditor: true }); // TODO remove this
        });
      } else {
        this.handleClaims({});
      }
    });
  }

  beforeCreate() {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.$vuetify.theme.dark = darkMediaQuery.matches;
    darkMediaQuery.addEventListener("change", event => {
      this.$vuetify.theme.dark = event.matches;
    });
    this.$router.afterEach(() => window.scrollTo({ top: 0 }));
  }

  updated() {
    const root = document.querySelector("html") as HTMLHtmlElement;
    this.scrollable = root.clientHeight !== root.scrollHeight;
  }

  beforeDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }

  onScroll() {
    this.showFab = window.scrollY > window.innerHeight;
  }
  scrollToTop() {
    window.scrollTo({ top: Math.trunc(window.scrollY) });
    this.$vuetify.goTo(0);
  }
}

{
  const scrollBarTester = document.createElement("div");
  scrollBarTester.style.position = "fixed";
  scrollBarTester.style.overflowY = "scroll";
  document.body.appendChild(scrollBarTester);
  setTimeout(() => {
    if (scrollBarTester.offsetWidth > 0) {
      document.body.classList.add("style-scrollbars");
    } else {
      document.body.classList.remove("style-scrollbars");
    }
    scrollBarTester.remove();
  });
}
</script>
