<template>
  <v-container fluid>
    <h2>Our students are saying</h2>
    <div>
      <figure>
      <blockquote>
        <p>
          “It's fun getting to do small jobs with different machines and know
          that I can do that and that I was able to help build something.”
        </p>
      </blockquote>
      <figcaption>—Morgan Salzano</figcaption>
    </figure>
    <figure>
      <blockquote>
        <p>
          “I have learned how to program and wire a robot, and more importantly
          have had the wonderful experience of building said awesome robot with
          a bunch of awesome people and then see said awesome robot succeed.”
        </p>
      </blockquote>
      <figcaption>—Miranda McCarthy</figcaption>
    </figure>
    <figure>
      <blockquote>
        <p>
          "FIRST has impacted me because it has allowed me to put some of my
          skills into - practice. For example, I want to go into business, and
          currently I am taking an Excel spreadsheet class. With FIRST, I am
          able to use those same spreadsheet skills to make the budget for the
          Robotics team”
        </p>
      </blockquote>
      <figcaption>—Adrian Fazecas</figcaption>
    </figure>
    <figure>
      <blockquote>
        <p>
          “It's fun getting to do small jobs with different machines and know
          that I can do that and that I was able to help build something.”
        </p>
      </blockquote>
      <figcaption>—Morgan Salzano</figcaption>
    </figure>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
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