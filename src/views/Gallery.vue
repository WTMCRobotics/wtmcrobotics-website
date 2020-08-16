<template>
  <v-container fluid>
    <div class="grid">
      <v-hover v-slot:default="{ hover }" open-delay="200" v-for="photo in photos" :key="photo.url">
        <v-img
          :src="photo.url"
          aspect-ratio="1.5"
          :class="`elevation-${hover ? 8 : 1}`"
          class="rounded transition-swing"
          @click.stop="openModal(photo)"
        ></v-img>
      </v-hover>
    </div>
    <v-dialog fullscreen v-model="showModal" dark ref="fullscreen">
      <v-img :src="modalPhoto.url" contain></v-img>
      <v-btn icon large @click.stop="closeModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-dialog>
  </v-container>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Gallery extends Vue {
  photos = new Array(24).fill(undefined).map((value, i) => ({
    url: `http://wtmcrobotics.com/style/images/pioneerPhotos/${i + 1}.png`
  }));
  modalPhoto: Photo = {
    url:
      "https://static2.olympus-lifescience.com/modules/imageresizer/602/757/a7025f48fa/480x480p240x240.jpg"
  };
  showModal = false;

  openModal(photo: Photo) {
    this.modalPhoto = photo;
    this.showModal = true;
    if (document.fullscreenEnabled) {
      const element = (this.$refs["fullscreen"] as Vue).$el;
      element.requestFullscreen().then(() => {
        element.onfullscreenchange = () => {
          if (!document.fullscreenElement) {
            this.closeModal();
          }
        };
      });
    }
  }

  closeModal() {
    this.showModal = false;
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
}

interface Photo {
  url: string;
}
</script>