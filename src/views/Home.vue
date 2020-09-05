<template>
  <div style="display: contents;">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <Sponsors />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import Sponsors from "@/components/Sponsors.vue";

@Component({
  components: {
    HelloWorld,
    Sponsors
  },
  metaInfo: { titleTemplate: null }
})
export default class Home extends Vue {}
</script>
