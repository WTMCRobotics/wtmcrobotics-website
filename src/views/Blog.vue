<template>
  <v-container fluid class="grid" ref="container">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :to="`blog/${post.id}`"
      :post="post.data()"
      :card="true"
    ></PostCard>
    <div v-if="!loadedAll" class="load-more">
      <v-btn text :loading="loading" @click="loadMore">Load more</v-btn>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 90%), 1fr));
}
.load-more {
  grid-column: 1 / -1;
  justify-self: center;
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
  posts: firebase.firestore.QueryDocumentSnapshot<BlogPost>[] = [];
  loadedAll = false;
  loading = false;

  mounted() {
    this.loadMore();
  }

  loadMore() {
    if (this.loadedAll || this.loading) {
      return;
    }
    this.loading = true;
    let collection = (firestore.collection(
      "blogs"
    ) as firebase.firestore.CollectionReference<BlogPost>).orderBy(
      "date",
      "desc"
    );
    // eslint-disable-next-line no-constant-condition
    if (true) {
      // TODO make this if not an editor
      collection = collection.where("public", "==", true);
    }
    const length = this.posts.length;
    if (length > 0) {
      collection = collection.startAfter(this.posts[length - 1]);
    }
    const limit = this.makeEven(2 + length) - length; // TODO make this not 2
    collection
      .limit(limit)
      .get()
      .then(snapshot => {
        this.loadedAll = limit !== snapshot.docs.length;
        this.posts = this.posts.concat(snapshot.docs);
        this.loading = false;
      });
  }

  makeEven(input: number) {
    const width = Math.floor(
      ((this.$refs["container"] as Element).clientWidth - 8) / 316
    );
    return Math.ceil(input / width) * width;
  }
}
</script>
