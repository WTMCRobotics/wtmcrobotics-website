<template>
  <v-container fluid fill-height>
    <div>
      <h1>Page not found!</h1>
      <p>
        The page "{{$route.path}}" doesn't exist.
        <br />If you think this is a mistake you can
        <router-link to="/contact">Contact Us</router-link>.
        <br />You can go to the
        <router-link to="/">WTMC Robotics Home Page</router-link>.
      </p>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
div {
  max-width: max-content;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({ metaInfo: { titleTemplate: null } })
export default class Blog extends Vue {}
</script>
