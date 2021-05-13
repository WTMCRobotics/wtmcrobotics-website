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
        'safe-pad-right': true,
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
        <v-toolbar-title class="px-1 unselectable" style="font-size: 2rem">
          <b>WTMC</b>
          <span style="color: var(--v-primary-base)">Robotics</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-tabs v-if="this.$vuetify.breakpoint.mdAndUp" right ref="vTabs">
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
      :style="{ minHeight: `calc(100vh - ${footerHeight}px)` }"
      class="safe-pad-left safe-pad-right"
      ref="main"
    >
      <router-view></router-view>
    </v-main>

    <v-slide-y-reverse-transition>
      <v-btn
        fixed
        fab
        small
        v-show="showFab"
        v-scroll="onScroll"
        @click="scrollToTop"
        color="primary"
        aria-label="Scroll to top"
      >
        <v-icon>{{ mdiChevronUp }}</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>

    <v-footer class="safe-pad-bottom safe-pad-left safe-pad-right" ref="footer">
      <p>
        <span>© 2020 WTMC Robotics.</span>
        &nbsp;
        <span>
          Source code available on
          <a
            href="https://github.com/WTMCRobotics/wtmcrobotics-website"
            class="github"
          >
            <img
              decoding="async"
              importance="low"
              width="1"
              height="1"
              :src="
                require(this.$vuetify.theme.dark
                  ? './assets/github/GitHub-Mark-Light-32px.webp'
                  : './assets/github/GitHub-Mark-32px.webp')
              "
              aria-hidden="true"
            />GitHub</a
          >.
        </span>
      </p>
    </v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
.home {
  text-decoration: inherit;
  color: inherit;
  display: flex;
  span {
    font-weight: 500;
  }
}
.v-footer {
  --padding-bottom-min: 6px;
  --padding-left-min: 16px;
  --padding-right-min: 16px;
  p {
    margin: 0;
    span {
      display: inline-block;
      a {
        color: inherit;
        &.github > img {
          width: auto;
          height: 1.1em;
          margin-inline-end: 0.1em;
          vertical-align: text-top;
        }
      }
    }
  }
}
.v-btn--fab {
  bottom: max(16px, env(safe-area-inset-bottom));
  right: max(16px, env(safe-area-inset-right));
}
.style-scrollbars header:not(.scrollable) .v-tabs {
  padding-right: var(--scrollbar-size);
}
</style>

<style lang="scss">
html {
  overflow-y: auto !important;
  --scrollbar-size: 12px;
  --track: #e2e2e2;
  --thumb: #bebebe;
  @media (prefers-color-scheme: dark) {
    --track: #323232;
    --thumb: #565656;
  }
  scrollbar-color: var(--thumb) var(--track);
  &,
  body.style-scrollbars * {
    &::-webkit-scrollbar {
      width: var(--scrollbar-size);
      height: var(--scrollbar-size);
    }
    &::-webkit-scrollbar-track {
      background-color: var(--track);
      border-radius: calc(var(--scrollbar-size) / 2);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--thumb);
      border-radius: calc(var(--scrollbar-size) / 2);
    }
  }
}
body {
  overflow: hidden;
  &.style-scrollbars::-webkit-scrollbar-track {
    border-radius: 0;
  }
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
.v-input.theme--dark input:-webkit-autofill {
  filter: grayscale(1) invert(1);
}
.v-input.theme--light input:-webkit-autofill {
  filter: grayscale(1) contrast(2);
}
:root {
  --padding-top-min: 0px;
  --padding-bottom-min: 0px;
  --padding-left-min: 0px;
  --padding-right-min: 0px;
  --padding-top-add: 0px;
  --padding-bottom-add: 0px;
  --padding-left-add: 0px;
  --padding-right-add: 0px;
}
.safe-pad-top {
  padding-top: var(--padding-top-min) !important;
  padding-top: max(
    var(--padding-top-min),
    calc(var(--padding-top-add) + env(safe-area-inset-top))
  ) !important;
}
.safe-pad-bottom {
  padding-bottom: var(--padding-bottom-min) !important;
  padding-bottom: max(
    var(--padding-bottom-min),
    calc(var(--padding-bottom-add) + env(safe-area-inset-bottom))
  ) !important;
}
.safe-pad-left {
  padding-left: var(--padding-left-min) !important;
  padding-left: max(
    var(--padding-left-min),
    calc(var(--padding-left-add) + env(safe-area-inset-left))
  ) !important;
}
.safe-pad-right {
  padding-right: var(--padding-right-min) !important;
  padding-right: max(
    var(--padding-right-min),
    calc(var(--padding-right-add) + env(safe-area-inset-right))
  ) !important;
}
*:focus:not(:focus-visible) {
  outline: none;
}
.blackBackground {
  &::before {
    content: "";
    position: fixed;
    top: -100vh;
    bottom: -100vh;
    left: -100vw;
    right: -100vw;
    background: black;
  }
}
</style>

<script lang="ts">
/// <reference types="resize-observer-browser" />
import { Component, Vue } from "vue-property-decorator";
import { auth, Claims } from "@/firebase";
import { Unsubscribe, User } from "firebase";
import { Mutation } from "vuex-class";
import Meta from "vue-meta";
import { mdiChevronUp } from "@mdi/js";

Vue.use(Meta);

@Component({
  metaInfo: {
    title: "WTMC Robotics",
    titleTemplate: "%s | WTMC Robotics",
    meta: [
      {
        name: "description",
        content:
          "Team 6101, Strange Quarks, is the Official FRC team of Washtenaw Technical Middle Collage.",
      },
    ],
  },
})
export default class App extends Vue {
  mdiChevronUp = mdiChevronUp;

  showFab = false;
  drawer = null;
  items = [
    { title: "Home", path: "/" },
    { title: "Gallery", path: "/gallery" },
    { title: "Sponsor", path: "/sponsor" },
    { title: "Join", path: "/join" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
  ];
  unsubscribe: Unsubscribe | null = null;

  scrollable = true;
  footerHeight = 36;

  mainResizeObserver: ResizeObserver;
  footerResizeObserver: ResizeObserver;

  @Mutation setUser!: (user: User | null) => void;
  @Mutation handleClaims!: (claims: Claims) => void;

  constructor() {
    super();
    this.unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      this.setUser(user);
      console.log("loged in as:", user);
      if (user) {
        user?.getIdTokenResult().then((idTokenResult) => {
          this.handleClaims(idTokenResult.claims);
        });
      } else {
        this.handleClaims({});
      }
    });
    this.mainResizeObserver = new ResizeObserver(this.checkScroll);
    this.footerResizeObserver = new ResizeObserver(this.updateFooterHeight);
  }

  beforeCreate() {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.$vuetify.theme.dark = darkMediaQuery.matches;
    darkMediaQuery.addEventListener("change", (event) => {
      this.$vuetify.theme.dark = event.matches;
    });
    this.$router.afterEach(() => window.scrollTo({ top: 0 }));
  }

  mounted() {
    this.checkScroll();
    this.mainResizeObserver.observe((this.$refs.main as Vue).$el);
    this.footerResizeObserver.observe((this.$refs.footer as Vue).$el, {
      box: "border-box",
    });
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

  checkScroll() {
    const root = document.querySelector("html") as HTMLHtmlElement;
    this.scrollable = root.clientHeight !== root.scrollHeight;
    (this.$refs.vTabs as Vue & {callSlider: () => void})?.callSlider();
  }

  updateFooterHeight() {
    this.footerHeight = (this.$refs.footer as Vue).$el.clientHeight;
  }
}

{
  const scrollBarTester = document.createElement("div");
  scrollBarTester.style.position = "fixed";
  scrollBarTester.style.overflowY = "scroll";
  document.body.appendChild(scrollBarTester);
  setTimeout(() => {
    document.body.classList.toggle(
      "style-scrollbars",
      scrollBarTester.offsetWidth > 0
    );
    scrollBarTester.remove();
  });
}
</script>
