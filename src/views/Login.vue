<template>
  <v-container fluid>
    <div id="firebaseui-auth-container"></div>
  </v-container>
</template>

<style src='firebaseui/dist/firebaseui.css'></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth, ui, signInOptions } from "../firebase";
import router from "@/router";
@Component({
  components: {}
})
export default class Login extends Vue {
  mounted() {
    const uiConfig: firebaseui.auth.Config = {
      callbacks: {
        signInSuccessWithAuthResult() {
          router.push("loged-in"); // TODO
          return false;
        }
      },
      signInOptions,
      signInFlow: "popup",
      tosUrl: () => router.push("terms-of-service"), // TODO
      privacyPolicyUrl: () => router.push("privacy-policy") // TODO
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
}
</script>
