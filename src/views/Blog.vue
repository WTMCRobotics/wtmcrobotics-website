<template>
  <v-container fluid class="grid">
    <PostCard
      v-for="post in posts"
      :key="post.data.title"
      :to="`blog/${post.id}`"
      :post="post.data"
      :card="true"
    ></PostCard>
  </v-container>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 90%), 1fr));
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
  posts: { data: BlogPost; id: string }[] = [];

  beforeCreate() {
    firestore
      .collection("blogs")
      .where("public", "==", true)
      .orderBy("date", "desc")
      .limit(100) // TODO make a propper system
      .get()
      .then(snapshot => {
        snapshot.docs.forEach((doc, i) => {
          if (doc.exists) {
            this.$set(this.posts, i, {
              data: doc.data() as BlogPost,
              id: doc.id
            });
          }
        });
      });
  }
}
</script>
