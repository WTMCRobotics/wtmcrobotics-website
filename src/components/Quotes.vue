<template>
  <div v-if="loading" class="spinnerWrapper">
    <v-progress-circular
      :size="48"
      :width="5"
      indeterminate
    ></v-progress-circular>
  </div>
  <div class="grid-container" v-else>
    <v-btn v-if="isEditor" text color="primary" :to="`/edit-quotes`">
      <v-icon left>edit</v-icon>Edit
    </v-btn>
    <figure v-for="quote in quotes" :key="quote.quote">
      <blockquote>
        <p>“{{ quote.quote }}”</p>
      </blockquote>
      <figcaption>—{{ quote.author }}</figcaption>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
.spinnerWrapper {
  height: 300px;
  display: grid;
  place-items: center;
}
.grid-container {
  position: relative;
  display: grid;
  grid-gap: 48px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  & > .v-btn {
    position: absolute;
    bottom: 100%;
    right: 20px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Quote } from "@/firebase";
import { State } from "vuex-class";

const quoteModule = namespace("quotes");

@Component
export default class Quotes extends Vue {
  @quoteModule.State loading!: boolean;
  @quoteModule.State quotes!: Quote[];
  @State isEditor!: boolean;

  constructor() {
    super();
    this.load();
  }

  @quoteModule.Action load!: () => void;
}
</script>