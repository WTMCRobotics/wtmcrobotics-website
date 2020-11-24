<template>
  <div style="display: contents">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <h1>Who are The Strange Quarks?</h1>
    <p>
      Our team, The Strange Quarks, is a group of individuals who have come
      together to create something greater than ourselves. Like the subatomic
      particle, each quark has their own part in constructing a larger
      structure, and our team strives to enable each individual to seek their
      own interests and passions. Our mission is to inspire students and the
      surrounding community to pursue knowledge and progress in STEM and
      business fields through robotics.
    </p>
    <h1>Our Mission</h1>
    <p>
      Our mission is to inspire students and the community to pursue knowledge
      and progress in STEM and business fields through robotics.
    </p>
    <h1>what we do</h1>
    <h2>Education</h2>
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
    <h2>Teamwork</h2>
    <p>
      As The Strange Quarks, we come together to create something greater than
      ourselves, building a strong and supportive environment for commitment and
      creativity.
    </p>
    <h2>Community</h2>
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
    <h1>Team balance</h1>
    <p>
      Our Robotics team is divided up into several different groups, each with
      their own set of tasks that need to be completed in order to progress the
      team. Business is the group that handles anything ranging from fundraising
      to recruitment to managing the budget. Programming takes care of the
      robots software and coding. Mechanics is responsible for the creation of a
      robot specifically designed to be able to score the maximum possible
      points in the competition.
    </p>
    <label>Mechanical <meter min="0" max="100" value="50"></meter></label><br />
    <label>Business <meter min="0" max="100" value="25"></meter></label><br />
    <label>Programming <meter min="0" max="100" value="25"></meter></label>
    <h1>Our students are saying</h1>
    <figure>
      <blockquote>
        <p>
          “It's fun getting to do small jobs with different machines and know
          that I can do that and that I was able to help build something.”
        </p>
      </blockquote>
      <figcaption>—Morgan Salzano</figcaption>
    </figure>
    <figure>
      <blockquote>
        <p>
          “I have learned how to program and wire a robot, and more importantly
          have had the wonderful experience of building said awesome robot with
          a bunch of awesome people and then see said awesome robot succeed.”
        </p>
      </blockquote>
      <figcaption>—Miranda McCarthy</figcaption>
    </figure>
    <figure>
      <blockquote>
        <p>
          "FIRST has impacted me because it has allowed me to put some of my
          skills into - practice. For example, I want to go into business, and
          currently I am taking an Excel spreadsheet class. With FIRST, I am
          able to use those same spreadsheet skills to make the budget for the
          Robotics team”
        </p>
      </blockquote>
      <figcaption>—Adrian Fazecas</figcaption>
    </figure>
    <figure>
      <blockquote>
        <p>
          “It's fun getting to do small jobs with different machines and know
          that I can do that and that I was able to help build something.”
        </p>
      </blockquote>
      <figcaption>—Morgan Salzano</figcaption>
    </figure>
    <Sponsors />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import Sponsors from "@/components/Sponsors.vue";

@Component({
  components: {
    HelloWorld,
    Sponsors,
  },
  metaInfo: { titleTemplate: "" },
})
export default class Home extends Vue {}
</script>
