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
      tosUrl: process.env.VUE_APP_TERMS_OF_SERVICE_URL,
      privacyPolicyUrl: process.env.VUE_APP_PRIVACY_POLICY_URL
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
}
</script>
