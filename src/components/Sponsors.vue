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
    <div class="carousel" v-resize="onResize">
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

@Component
export default class Sponsors extends Vue {
  sponsors = [
    {
      logo: "https://www.wccnet.edu/_media/logo-white.png",
      name: "Washtenaw Community College",
      website: "https://www.wccnet.edu"
    },
    {
      logo: "https://www.wccnet.edu/wtmc/_media/wtmclogo.png",
      name: "Washtenaw Technical Middle College",
      website: "https://www.wccnet.edu/wtmc"
    },
    {
      logo: "https://www.arborresearch.org/Portals/0/arborresearchlogo.png",
      name: "Arbor Research",
      website: "https://www.arborresearch.org"
    },
    {
      logo: "https://www.drkatherinekelly.com/assets/images/footer/ft-logo.png",
      name: "Kelly Orthodontics",
      website: "https://www.drkatherinekelly.com"
    },
    {
      logo: "https://plusco.de/images/logo.png",
      name: "PlusCode",
      website: "https://plusco.de"
    },
    {
      logo:
        "https://bwlawonline.com/wp-content/uploads/2019/08/logo_whitebkgd.jpg",
      name: "Blanchard & Walker PLLC",
      website: "https://bwlawonline.com/"
    }
  ];

  percent = 50;

  constructor() {
    super();
    this.onResize();
  }

  onResize() {
    this.percent = 100 / Math.floor(window.innerWidth / 200);
  }
}
</script>