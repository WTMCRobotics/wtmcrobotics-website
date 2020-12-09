<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" md="12">
          <draggable class="grid-container" v-model="data.quotes" group="quotes" @start="drag=true" @end="drag=false">
            <div class="quote" v-for="(quote, i) in data.quotes" :key="i">
              <v-textarea
                outlined
                auto-grow
                v-model="data.quotes[i].quote"
                :rules="validators.quote"
                label="Quote"
                required
              ></v-textarea>
              <v-text-field
                outlined
                v-model="data.quotes[i].author"
                :rules="validators.author"
                :counter="authorLength"
                label="Quotee Name"
                required
              ></v-text-field>
              <v-btn outlined x-large color="primary" @click="removeQuote(i)">Remove</v-btn>
            </div>
          </draggable>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="right">
          <v-btn color="primary" class="mr-4" @click="newQuote">Add New Quote</v-btn>
          <v-btn color="primary" class="mr-4" :disabled="!valid" @click="save">Save</v-btn>
          <v-btn color="primary" @click="reset">Reset</v-btn>
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
.grid-container {
  display: grid;
  grid-gap: 48px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
}
.quote {
  display: grid;
  grid-template: 
    "quote quote" 1fr
    "author remove" auto
    / 1fr auto;
    gap: 16px;
  .v-textarea{
    grid-area: quote;
  }
  button {
    height: 56px !important;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  firestore,
  QuotesDoc,
  authorLength,
} from "@/firebase";
import { namespace } from "vuex-class";
import draggable from 'vuedraggable'

const quotesModule = namespace("quotes");

@Component({
  metaInfo: { title: "Quotes Editor" },
  components: { draggable }
})
export default class EditQuotes extends Vue {
  doc: firebase.firestore.DocumentReference<QuotesDoc>;
  data: QuotesDoc = { quotes: [] };

  valid = false;
  authorLength = authorLength;
  validators = {
    author: [
      (v: string) => !!v || "Quotee Name is required",
      (v: string) =>
        v?.length <= authorLength ||
        `Quotee Name must be less than ${authorLength} characters`
    ],
    quote: [(v: string) => !!v || "Quote is required"]
  };

  @quotesModule.Mutation resetQuotes!: () => void;

  constructor() {
    super();
    this.doc = firestore.doc(`main/quotes`) as firebase.firestore.DocumentReference<QuotesDoc>;
  }

  newQuote() {
    this.data.quotes.push({quote: '', author: ''});
  }

  removeQuote(index: number) {
    this.data.quotes.splice(index, 1);
  }

  created() {
    this.reset();
  }

  save() {
    this.doc.set(this.data);
    this.resetQuotes();
  }

  reset() {
    this.doc.get().then(snapshot => {
      this.data = snapshot.data() as QuotesDoc;
    });
  }
}
</script>