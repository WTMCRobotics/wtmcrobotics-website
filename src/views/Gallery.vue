<template>
  <v-container fluid>
    <div class="grid">
      <v-hover v-slot:default="{ hover }" open-delay="200" v-for="photo in photos" :key="photo.url">
        <v-img
          :src="photo.url"
          aspect-ratio="1.5"
          :class="`elevation-${hover ? 8 : 1}`"
          class="rounded transition-swing"
        ></v-img>
      </v-hover>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      photos: new Array(24).fill(undefined).map((value, i) => ({
        url: `http://wtmcrobotics.com/style/images/pioneerPhotos/${i + 1}.png`
      }))
    };
  }
});
</script>