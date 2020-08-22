<template>
  <v-container fluid class="grid" ref="container">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :to="`blog/${post.id}`"
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
import { namespace } from "vuex-class";

const blogModule = namespace("blog");

@Component({
  components: { PostCard }
})
export default class Blog extends Vue {
  @blogModule.State posts!: firebase.firestore.QueryDocumentSnapshot<
    BlogPost
  >[];
  @blogModule.State loading!: boolean;
  @blogModule.State doneLoading!: boolean;
  @blogModule.Action loadMore!: (payload: {
    limit: number;
    publicOnly: boolean;
  }) => Promise<void>;

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
    const isEditor = false; // TODO make this if not an editor

    let limit =
      Math.max(20, (window.innerHeight * window.innerWidth) / 45000) +
      this.posts.length;
    limit = Math.ceil(limit / this.width) * this.width - this.posts.length;
    this.loadMore({ publicOnly: !isEditor, limit });
  }
}
</script>
