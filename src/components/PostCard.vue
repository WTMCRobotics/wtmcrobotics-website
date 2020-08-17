<template>
  <v-card :tile="!card" :to="to">
    <v-img :aspect-ratio="card ? 2 : ''" max-height="70vh" :src="post.image"></v-img>

    <v-card-title>{{post.title}}</v-card-title>

    <v-card-subtitle class="pb-0">By: {{post.author}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div :class="card ? 'ellipsis' : ''">{{post.body}}</div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.ellipsis {
  height: 4.125rem;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>

<script lang="js">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})

export default class Post extends Vue {
  @Prop() post;
  @Prop() card;
  @Prop() to;
}
</script>