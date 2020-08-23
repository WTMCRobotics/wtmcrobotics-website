<template>
  <v-container fluid>
    <div v-if="loading" class="center">
      <v-progress-circular :size="80" :width="7" indeterminate></v-progress-circular>
    </div>
    <div v-else class="grid">
      <v-hover
        v-slot:default="{ hover }"
        open-delay="200"
        v-for="(photo, i) in photos"
        :key="photo.url"
      >
        <v-img
          :src="getPhotoUrl(photo.url.name, photo.url.token)"
          :alt="photo.alt"
          aspect-ratio="1.5"
          :class="`elevation-${hover ? 8 : 1}`"
          class="rounded transition-swing"
          @click.stop="openModal(i)"
        ></v-img>
      </v-hover>
    </div>
    <v-dialog fullscreen v-model="showModal" dark ref="fullscreen">
      <v-btn icon class="close" @click.stop="showModal = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-carousel
        height="100%"
        hide-delimiters
        show-arrows-on-hover
        :value="modalPhoto"
        :continuous="false"
      >
        <v-carousel-item v-for="(photo, i) in photos" :key="i">
          <v-img :src="getPhotoUrl(photo.url.name, photo.url.token)" :alt="photo.alt" contain></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 90%), 1fr));
}
.center {
  height: 100%;
  display: grid;
  place-items: center;
}
.v-dialog {
  .v-image {
    height: 100%;
    width: 100%;
    background-color: #000;
  }
  .v-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Photo } from "@/firebase";

const galleryModule = namespace("gallery");

@Component
export default class Gallery extends Vue {
  @galleryModule.State loading!: boolean;
  @galleryModule.State photos!: Photo[];
  // photos = new Array(24).fill(undefined).map((value, i) => ({
  //   url: `http://wtmcrobotics.com/style/images/pioneerPhotos/${i + 1}.png`
  // }));
  modalPhoto = 0;
  showModal = false;

  @galleryModule.Action load!: () => void;

  constructor() {
    super();
    this.load();
  }

  openModal(index: number) {
    this.modalPhoto = index;
    this.showModal = true;
  }

  getPhotoUrl(name: string, token: string) {
    return `https://firebasestorage.googleapis.com/v0/b/wtmcrobotics-website.appspot.com/o/${name}?alt=media&token=${token}`;
  }
}
</script>