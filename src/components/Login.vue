<template>
  <div id="firebaseui-auth-container"></div>
</template>

<style src='firebaseui/dist/firebaseui.css'></style>
<style lang="scss">
.mdl-button--raised.mdl-button--colored {
  background-color: var(--v-primary-base) !important;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth, ui, signInOptions, credentialHelper } from "@/firebase";
import router from "@/router";
@Component
export default class Login extends Vue {
  mounted() {
    const uiConfig: firebaseui.auth.Config = {
      callbacks: {
        signInSuccessWithAuthResult: authResult => {
          this.$emit("logged-in", authResult);
          return false;
        }
      },
      credentialHelper,
      signInOptions,
      signInFlow: "popup",
      tosUrl: "/terms-of-service",
      privacyPolicyUrl: "/privacy-policy"
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
}
</script>
