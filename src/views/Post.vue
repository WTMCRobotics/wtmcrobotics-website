<template>
  <PostCard :post="post"></PostCard>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firestore, BlogPost } from "../firebase";
import PostCard from "../components/PostCard.vue";

@Component({
  components: { PostCard }
})
export default class Post extends Vue {
  post: BlogPost | false = false;

  beforeCreate() {
    if (this.$route.params.blogId) {
      firestore
        .doc(`blogs/${this.$route.params.blogId}`)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            this.post = snapshot.data() as BlogPost;
          } else {
            alert("there was an error loading the blog post");
            this.$router.back();
          }
        });
    }
  }
}
</script>