<template>
  <v-container fluid class="grid">
    <PostCard v-for="(post, id) in posts" :key="id" :to="`blog/${id}`" :post="post" :card="true"></PostCard>
  </v-container>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firestore, BlogPost } from "../firebase";
import PostCard from "../components/PostCard.vue";
@Component({
  components: { PostCard }
})
export default class Blog extends Vue {
  posts: { [key: string]: BlogPost } = {};

  beforeCreate() {
    firestore
      .collection("blogs")
      .get()
      .then(snapshot => {
        const posts: { [key: string]: BlogPost } = {};
        snapshot.forEach(doc => {
          if (doc.exists) {
            const data = doc.data() as BlogPost;
            posts[doc.id] = data;
          }
        });
        this.posts = posts;
      });
  }
}
</script>
