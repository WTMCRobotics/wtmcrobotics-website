<template>
  <div style="display: contents">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <h2>Who are The Strange Quarks?</h2>
    <p>
      Our team, The Strange Quarks, is a group of individuals who have come
      together to create something greater than ourselves. Like the subatomic
      particle, each quark has their own part in constructing a larger
      structure, and our team strives to enable each individual to seek their
      own interests and passions. Our mission is to inspire students and the
      surrounding community to pursue knowledge and progress in STEM and
      business fields through robotics.
    </p>
    <h2>Our Mission</h2>
    <p>
      Our mission is to inspire students and the community to pursue knowledge
      and progress in STEM and business fields through robotics.
    </p>
    <h2>what we do</h2>
    <h3>Education</h3>
    <p>
      Through the FIRST program, our students enjoy hands-on opportunities to
      learn and practice skills in STEM and business fields.
    </p>
    <p>
      Being on the Robotics team is a valuable learning experience in several
      different subjects. In Business, students have the opportunity to learn
      money management and professional communication skills. Students in
      Mechanics gain experience in operating machinery and design. Programming
      students learn how to code.
    </p>
    <p>
      he students of today will become the innovators of tomorrow. Through
      robotics, we seek to educate and inspire today’s youth so they will be
      well equipped to become tomorrow’s leaders.
    </p>
    <h3>Teamwork</h3>
    <p>
      As The Strange Quarks, we come together to create something greater than
      ourselves, building a strong and supportive environment for commitment and
      creativity.
    </p>
    <h3>Community</h3>
    <p>
      Our team is dedicated to serving our local community in a variety of
      efforts, from spreading our STEM knowledge through a summer camp to
      bringing together our team members to volunteer with nonprofit
      organizations.
    </p>
    <p>
      Our team seeks out opportunities to give back to our community. In the
      past, we’ve hosted a summer camp to educate children in STEM fields and
      volunteered at places like Food Gatherers, Maker Faire, and the Ann Arbor
      Summer Festival
    </p>
    <h2>Our students are saying</h2>
    <Quotes />
    <h2>Our sponsors</h2>
    <Sponsors />
  </div>
</template>

<style lang="scss" scoped>
h2 {
  text-align: center;
  padding-top: 1em;
  text-transform: capitalize;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import Sponsors from "@/components/Sponsors.vue";
import Quotes from "@/components/Quotes.vue";

@Component({
  components: {
    HelloWorld,
    Sponsors,
    Quotes,
  },
  metaInfo: { titleTemplate: "" },
})
export default class Home extends Vue {}
</script>
