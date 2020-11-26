<template>
  <v-container fluid>
    <h2>Our students are saying</h2>
    <div v-if="loading" class="spinnerWrapper">
      <v-progress-circular
        :size="48"
        :width="5"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <figure v-for="quote in quotes" :key="quote.quote">
        <blockquote>
          <p>“{{ quote.quote }}”</p>
        </blockquote>
        <figcaption>—{{ quote.author }}</figcaption>
      </figure>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.spinnerWrapper {
  height: 300px;
  display: grid;
  place-items: center;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Quote } from "@/firebase";

const quoteModule = namespace("quotes");

@Component
export default class Quotes extends Vue {
  @quoteModule.State loading!: boolean;
  @quoteModule.State quotes!: Quote[];

  constructor() {
    super();
    this.load();
  }

  @quoteModule.Action load!: () => void;
}
</script>