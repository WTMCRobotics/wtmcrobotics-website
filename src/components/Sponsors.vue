<template>
  <v-container fluid>
    <filter id="logoFilterWhite">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0 0 0 0 1
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 1 0"
      />
    </filter>
    <filter id="logoFilterBlack">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0"
      />
    </filter>
    <h2>Our Sponsors</h2>
    <div v-if="loading" class="spinnerWrapper">
      <v-progress-circular :size="48" :width="5" indeterminate></v-progress-circular>
    </div>
    <div
      class="carousel"
      v-resize="onResize"
      v-else
      ref="carousel"
      @scroll="wasScrolled = Date.now();"
    >
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.name"
        :href="sponsor.website"
        target="_blank"
        :style="'width: '+ percent +'%;'"
      >
        <v-img
          :src="sponsor.logo"
          contain
          width="100%"
          :aspect-ratio="4/3"
          :alt="sponsor.name + ' logo'"
        ></v-img>
      </a>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
.spinnerWrapper {
  height: 200px;
  display: grid;
  place-items: center;
}
.carousel {
  scroll-snap-type: x mandatory;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  text-align: center;
  a {
    display: inline-block;
    padding: 16px;
    scroll-snap-align: start;
    .v-image {
      &.theme--dark {
        filter: url(#logoFilterWhite);
      }
      &.theme--light {
        filter: url(#logoFilterBlack);
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Sponsor } from "@/firebase";

const sponsorModule = namespace("sponsors");

@Component
export default class Sponsors extends Vue {
  @sponsorModule.State loading!: boolean;
  @sponsorModule.State sponsors!: Sponsor[];

  percent = 50;

  scrollIntervalID = 0;
  wasScrolled = Date.now();

  constructor() {
    super();
    this.load();
    this.onResize();
  }

  @sponsorModule.Action load!: () => void;

  onResize() {
    this.percent = 100 / Math.floor(window.innerWidth / 200);
  }

  mounted() {
    this.scrollIntervalID = setInterval(() => {
      if (Date.now() - this.wasScrolled < 3_000) {
        this.wasScrolled = Date.now();
        return;
      }
      const carousel = this.$refs.carousel as Element;
      if (carousel) {
        if (
          Math.abs(
            carousel.scrollLeft + carousel.clientWidth - carousel.scrollWidth
          ) < 1
        ) {
          carousel.scrollTo({
            left: 0,
            behavior: "smooth"
          });
        } else {
          carousel.scrollBy({
            left: carousel.querySelector("a")?.clientWidth || 200,
            behavior: "smooth"
          });
        }
      }
    }, 5_000);
  }

  beforeDestroy() {
    if (this.scrollIntervalID !== 0) {
      clearInterval(this.scrollIntervalID);
    }
  }
}
</script>