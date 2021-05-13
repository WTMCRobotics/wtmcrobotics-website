<template>
  <v-container fluid>
    <div v-if="user">
      <v-btn @click="logout" color="primary">Log out</v-btn>
    </div>
    <Login v-else></Login>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "@/firebase";
import Login from "@/components/Login.vue";
import { State } from "vuex-class";
import { User } from "firebase";
import { Meta } from "@sophosoft/vue-meta-decorator";

@Component({
  components: { Login },
})
export default class Account extends Vue {
  @State isEditor!: boolean;
  @State user!: User | null;

  @Meta
  getMetaInfo() {
    return {
      title: this.user ? "Account" : "Login",
    };
  }

  logout() {
    auth.signOut();
  }
}
</script>
