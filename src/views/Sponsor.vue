<template>
  <v-container fluid>
    <h1>This is a sponsor page</h1>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({ metaInfo: { title: "Sponsor" } })
export default class Sponsor extends Vue {}
</script>
