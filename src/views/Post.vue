<template>
  <FullscreenSpinner v-if="loading"></FullscreenSpinner>
  <PostCard v-else :post="post" :id="id"></PostCard>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firestore, BlogPost } from "../firebase";
import PostCard from "../components/PostCard.vue";
import FullscreenSpinner from "../components/FullscreenSpinner.vue";
import { namespace } from "vuex-class";
import { Meta } from "@sophosoft/vue-meta-decorator";

const blogModule = namespace("blog");

@Component({
  components: { PostCard, FullscreenSpinner }
})
export default class Post extends Vue {
  @blogModule.Getter getPostById!: (
    id: string
  ) => firebase.firestore.QueryDocumentSnapshot<BlogPost> | undefined;

  @Meta
  getMetaInfo() {
    return {
      title: this.post?.title ?? "Blog"
    };
  }

  post: BlogPost | null = null;
  loading = false;

  get id() {
    return this.$route.params.blogId;
  }

  created() {
    if (this.id) {
      this.post = (this.getPostById(this.id)?.data() as BlogPost) || false;
    }
    if (!this.post) {
      this.loading = true;
      firestore
        .doc(`blogs/${this.id}`)
        .get()
        .then(snapshot => {
          this.post = snapshot.data() as BlogPost;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
</script>