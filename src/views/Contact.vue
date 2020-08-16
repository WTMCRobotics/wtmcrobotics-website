<template>
  <v-container fluid>
    <h1>Get in Touch</h1>
    <p>If you’re interested in joining, mentoring, sponsoring, or just learning more about us, feel free to contact us using any of the methods below. We’d love to hear from you.</p>
    <div class="contact-links">
      <div v-for="link in contactLinks" :key="link.href">
        <a :href="link.href" target="_blank" rel="noopener noreferrer">{{link.text}}</a>
      </div>
    </div>
    <ContactForm></ContactForm>
  </v-container>
</template>

<style lang="scss" scoped>
.contact-links {
  div {
    a {
      white-space: pre;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactForm from "@/components/ContactForm.vue";

@Component({
  components: {
    ContactForm
  }
})
export default class Contact extends Vue {
  data() {
    return {
      contactLinks: [
        {
          href: "https://goo.gl/maps/msvuRMgf6iygDQoXA",
          text:
            "Building TI, Technical and Industrial,\n4800 E Huron River Dr #214,\nAnn Arbor, MI 48105"
        },
        {
          href: "tel:+17344778513",
          text: "(734) 477-8513"
        },
        {
          href: "mailto:wtmcrobotics@wccnet.edu",
          text: "wtmcrobotics@wccnet.edu"
        }
      ]
    };
  }
}
</script>