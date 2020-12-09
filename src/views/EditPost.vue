<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field outlined v-model="data.image" label="Image" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            outlined
            v-model="data.title"
            :rules="validators.title"
            :counter="titleLength"
            label="Title"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            outlined
            v-model="data.author"
            :rules="validators.author"
            :counter="authorLength"
            label="Author"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            outlined
            v-model="dateText"
            :rules="validators.date"
            label="Date"
            required
            type="date"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <quillEditor
            v-model="data.body"
            :options="{}"
            :class="$vuetify.theme.dark ? 'theme--dark':'theme--light'"
          ></quillEditor>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-checkbox v-model="data.public" label="Public"></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="right">
          <v-btn color="primary" class="mr-4" :disabled="!valid" @click="save" :loading="saving">Save</v-btn>
          <v-btn color="primary" class="mr-4" @click="reset">Reset</v-btn>
          <v-btn color="primary" :disabled="!doc" @click="deleteDoc">Delete</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style lang="scss" scoped>
.right {
  display: flex;
  justify-content: flex-end;
}
</style>

<style lang="scss">
.v-input.theme--dark input[type="date"] {
  &::-webkit-calendar-picker-indicator {
    filter: contrast(0) brightness(2);
  }
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  firestore,
  BlogPost,
  authorLength,
  titleLength,
  isTimestamp
} from "@/firebase";
import { namespace } from "vuex-class";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "@/quill-snow-vuetifier.scss";
import { quillEditor } from "vue-quill-editor";

const blogModule = namespace("blog");

@Component({
  metaInfo: { title: "Blog Editor" },
  components: { quillEditor }
})
export default class EditPost extends Vue {
  doc: firebase.firestore.DocumentReference<BlogPost> | null = null;
  data: BlogPost = {
    image: "",
    title: "",
    author: "",
    date: new Date(),
    public: true,
    body: ""
  };

  get dateText(): string {
    if (isTimestamp(this.data.date)) {
      this.data.date = this.data.date.toDate();
    }
    if (!this.data.date) {
      return "";
    }
    let dd = (this.data.date.getDate() + 1).toString();
    let mm = (this.data.date.getMonth() + 1).toString();
    let yyyy = this.data.date.getFullYear().toString();
    if (dd.length === 1) {
      dd = "0" + dd;
    }
    if (mm.length === 1) {
      mm = "0" + mm;
    }
    while (yyyy.length < 4) {
      yyyy = "0" + yyyy;
    }
    return `${yyyy}-${mm}-${dd}`;
  }
  set dateText(date: string) {
    this.data.date = new Date(date);
  }

  saving = false;

  valid = false;
  authorLength = authorLength;
  titleLength = titleLength;
  validators = {
    image: [(v: string) => !!v || "Image is required"],
    author: [
      (v: string) => !!v || "Author is required",
      (v: string) =>
        v?.length <= authorLength ||
        `Author must be less than ${authorLength} characters`
    ],
    title: [
      (v: string) => !!v || "Title is required",
      (v: string) =>
        v?.length <= titleLength ||
        `Title must be less than ${titleLength} characters`
    ],
    date: [
      (v: string) => !!v || "Date is required",
      (v: string) => !!Date.parse(v) || "Date must be a valid date"
    ],
    body: [(v: string) => !!v || "Content is required"]
  };

  @Watch("$route.params.blogId") handelRouteParam(to: string | undefined) {
    console.log(to);
  }

  @blogModule.Mutation removePost!: (id: string) => void;
  @blogModule.Mutation removeAll!: () => void;

  created() {
    this.reset();
  }

  save() {
    const data = this.data;
    this.saving = true;
    if (this.doc) {
      this.doc.set(data).then(() => {
        this.saving = false;
      });
    } else {
      firestore
        .collection("blogs")
        .add(data)
        .then(doc => {
          this.doc = doc as firebase.firestore.DocumentReference<BlogPost>;
          this.$router.replace({ params: { blogId: doc.id } });
          this.removeAll();
          this.saving = false;
        });
    }
  }

  reset() {
    if (this.$route.params.blogId) {
      this.doc = firestore.doc(
        `blogs/${this.$route.params.blogId}`
      ) as firebase.firestore.DocumentReference<BlogPost>;
      this.doc
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            const data = snapshot.data() as BlogPost;
            data.date = (data.date as firebase.firestore.Timestamp).toDate();
            this.data = data;
          } else {
            throw "404";
          }
        })
        .catch(() => {
          alert("404");
          this.$router.replace("/blog");
        });
    } else {
      console.log("new");
    }
  }

  deleteDoc() {
    if (this.doc) {
      this.doc.delete();
      this.removePost(this.doc.id);
      this.doc = null;
      this.$router.replace("/blog");
    }
  }
}
</script>