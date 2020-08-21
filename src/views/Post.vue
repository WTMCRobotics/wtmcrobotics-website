<template>
  <PostCard :post="post"></PostCard>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firestore, BlogPost } from "../firebase";
import PostCard from "../components/PostCard.vue";
import { namespace } from "vuex-class";

const blogModule = namespace("blog");

@Component({
  components: { PostCard }
})
export default class Post extends Vue {
  @blogModule.Getter getPostById!: (
    id: string
  ) => firebase.firestore.QueryDocumentSnapshot<BlogPost> | undefined;

  post: BlogPost | false = false;

  created() {
    const id = this.$route.params.blogId;
    if (id) {
      this.post = (this.getPostById(id)?.data() as BlogPost) || false;
    }
    if (!this.post) {
      firestore
        .doc(`blogs/${id}`)
        .get()
        .then(snapshot => {
          this.post = snapshot.data() as BlogPost;
        });
    }
  }
}
</script>