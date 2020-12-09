<template>
  <v-container fluid>
    <h1>Get in Touch</h1>
    <p>If you’re interested in joining, mentoring, sponsoring, or just learning more about us, feel free to contact us using any of the methods below. We’d love to hear from you.</p>
    <div class="contact-links">
      <v-btn v-for="link in contactLinks" :key="link.href" :color="link.color" dark rounded :href="link.href" target="_blank" rel="noopener noreferrer">
        <v-icon left>{{link.icon}}</v-icon>
        {{link.text}}
      </v-btn>
    </div>
    <ContactForm></ContactForm>
  </v-container>
</template>

<style lang="scss" scoped>
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
.v-btn {
  text-transform: none;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactForm from "@/components/ContactForm.vue";

@Component({
  components: {
    ContactForm
  },
  metaInfo: { title: "Contact" }
})
export default class Contact extends Vue {
  contactLinks = [
    {
      href: "https://goo.gl/maps/msvuRMgf6iygDQoXA",
      text: "WTMC Office, 4800 E. Huron River Dr.",
      color: "#34a853",
      icon: "mdi-google-maps"
    },
    {
      href: "mailto:wtmcrobotics@wccnet.edu",
      text: "wtmcrobotics@wccnet.edu",
      color: "#d93224",
      icon: "mdi-email-outline"
    },
    // {
    //   href: "tel:+17344778513",
    //   text: "(734) 477-8513",
    //   color: "#1a73e8",
    //   icon: "mdi-phone"
    // },
    {
      href: "https://twitter.com/wtmcrobotics",
      text: "@wtmcrobotics",
      color: "#1ca2f2",
      icon: "mdi-twitter"
    },
    {
      href: "https://www.instagram.com/wtmcrobotics/",
      text: "@wtmcrobotics",
      color: "#f03a74",
      icon: "mdi-instagram"
    },
    {
      href: "https://www.facebook.com/wtmcrobotics",
      text: "@wtmcrobotics",
      color: "#3b5998",
      icon: "mdi-facebook"
    },
    {
      href: "https://www.youtube.com/channel/UCXHNZrx2SV1Fo0_VAF2lRkw",
      text: "WTMC Robotics",
      color: "#FF0000",
      icon: "mdi-youtube"
    }
  ];
}
</script>