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
import { auth, firestore } from "@/firebase";
import Login from "@/components/Login.vue";
import { State } from "vuex-class";
@Component({
  components: { Login }
})
export default class Account extends Vue {
  @State isEditor!: boolean;
  @State user!: boolean;

  logout() {
    auth.signOut();
  }
}
</script>