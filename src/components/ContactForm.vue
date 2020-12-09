<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            outlined
            v-model="values.name"
            :rules="nameRules"
            type="text"
            autocomplete="name"
            label="Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            outlined
            v-model="values.email"
            :rules="emailRules"
            type="email"
            autocomplete="email"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            outlined
            auto-grow
            v-model="values.message"
            :rules="messageRules"
            label="Message"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="submit" :disabled="!valid" color="primary">
            <v-icon left>send</v-icon>Send Message
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ContactForm extends Vue {
  values = {
    name: "",
    message: "",
    email: ""
  };
  valid = false;
  nameRules = [(v: string) => !!v || "Name is required"];
  emailRules = [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+/.test(v) || "E-mail must be valid"
  ];
  messageRules = [(v: string) => !!v || "Message is required"];
  submit() {
    console.log(this.values);
  }
}
</script>