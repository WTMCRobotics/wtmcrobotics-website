<template>
  <v-container fluid class="grid" ref="container">
    <v-card to="/blog/new" v-if="isEditor">
      <v-responsive :aspect-ratio="2" max-height="70vh">
        <v-sheet
          class="d-flex align-center justify-center"
          height="100%"
          color="rgba(128, 128, 128, 0.2"
        >
          <v-icon aria-hidden="true" style="font-size: 64px;">mdi-plus</v-icon>
        </v-sheet>
      </v-responsive>
      <v-card-title>Add a New Blog Post</v-card-title>
      <v-card-subtitle>By: you</v-card-subtitle>
      <v-card-text class="text--primary">
        <p>Click here to start writing a new blog post.</p>
      </v-card-text>
    </v-card>
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :post="post.data()"
      :card="true"
    ></PostCard>
    <div v-if="!doneLoading" class="load-more">
      <v-btn text :loading="loading" @click="loadMorePosts">Load more</v-btn>
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
import PostCard from "../components/PostCard.vue";
import { BlogPost } from "../firebase";
import { namespace, State } from "vuex-class";

const blogModule = namespace("blog");

@Component({
  components: { PostCard },
  metaInfo: { title: "Blog" },
})
export default class Blog extends Vue {
  @blogModule.State
  posts!: firebase.firestore.QueryDocumentSnapshot<BlogPost>[];
  @blogModule.State loading!: boolean;
  @blogModule.State doneLoading!: boolean;
  @blogModule.Action loadMore!: (payload: {
    limit: number;
    publicOnly: boolean;
  }) => Promise<void>;
  @State isEditor!: boolean;

  get width() {
    return Math.max(
      1,
      Math.floor(((this.$refs["container"] as Element).clientWidth - 8) / 316)
    );
  }

  mounted() {
    if (!this.posts || this.posts.length === 0) {
      this.loadMorePosts();
    }
  }

  loadMorePosts() {
    let limit =
      Math.max(20, (window.innerHeight * window.innerWidth) / 45000) +
      this.posts.length;
    limit = Math.ceil(limit / this.width) * this.width - this.posts.length;
    if (this.isEditor) {
      limit--;
    }
    this.loadMore({ publicOnly: !this.isEditor, limit });
  }
}
</script>
