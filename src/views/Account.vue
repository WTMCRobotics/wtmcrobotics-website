<template>
  <v-container fluid>
    <div v-if="logedIn">
      <v-btn @click="logout" color="primary">Log out</v-btn>
    </div>
    <Login v-else></Login>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth, firestore } from "../firebase";
import Login from "../components/Login.vue";
import { Unsubscribe } from "firebase";
@Component({
  components: { Login }
})
export default class Account extends Vue {
  logedIn = true;
  unsubscribe: Unsubscribe | null = null;

  beforeCreate() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      this.logedIn = !!user;
      console.log("loged in as:", user);
    });
  }
  logout() {
    auth.signOut();
  }
  beforeDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }
}
</script>