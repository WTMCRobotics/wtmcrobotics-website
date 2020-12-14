<template>
  <v-card
    :tile="!card"
    :to="card ? `/blog/${id}` : undefined"
    :class="{ card }"
  >
    <v-img :aspect-ratio="card ? 2 : ''" max-height="70vh" :src="post.image">
      <v-card-actions v-if="isEditor">
        <v-spacer></v-spacer>
        <v-btn text color="primary" :to="`/blog/${id}/edit`">
          <v-icon left>mdi-pencil</v-icon>Edit
        </v-btn>
      </v-card-actions>
    </v-img>

    <v-card-title>{{ post.title }}</v-card-title>

    <v-card-subtitle v-if="post.author" class="pb-0"
      >By: {{ post.author }}</v-card-subtitle
    >

    <v-card-text class="text--primary">
      <p :class="card ? 'ellipsis' : ''">{{ post.body }}</p>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
@media only screen and (min-width: 600px) {
  .text--primary div:not(.ellipsis) {
    text-align: justify;
  }
}
.ellipsis {
  height: 4.125rem;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.v-card:not(.card) {
  background: inherit;
  box-shadow: none;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BlogPost } from "@/firebase";
import { State } from "vuex-class";

@Component
export default class Post extends Vue {
  @Prop() post!: BlogPost;
  @Prop() card!: boolean;
  @Prop() id!: string;
  @State isEditor!: boolean;
}
</script>