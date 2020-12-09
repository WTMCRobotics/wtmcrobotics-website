import Vue from "vue";
import Vuex, { Module } from "vuex";
import { firestore, BlogPost, Gallery, Photo, auth, Claims, Sponsor, SponsorsDoc, Quote, QuotesDoc } from "@/firebase";
import { User } from 'firebase';

Vue.use(Vuex);

interface BlogState {
  posts: firebase.firestore.DocumentSnapshot<BlogPost>[];
  doneLoading: boolean;
  loading: boolean;
}

const blog: Module<BlogState, {}> = {
  namespaced: true,
  state: {
    posts: [],
    doneLoading: false,
    loading: false,
  },
  mutations: {
    addPosts: (state, newPosts: firebase.firestore.DocumentSnapshot<BlogPost>[]) => {
      state.posts.push(...newPosts);
    },
    setLoading: (state, loading: boolean) => {
      state.loading = loading;
    },
    doneLoading: (state) => {
      state.doneLoading = true;
    },
    removePost: (state, id: string) => {
      state.posts = state.posts.filter(post => post.id !== id)
    },
    removeAll: (state) => {
      state.posts = [];
      state.doneLoading = false;
    }
  },
  actions: {
    loadMore: ({ commit, state }, { limit, publicOnly }: { limit: number; publicOnly: boolean }) => {
      if (state.doneLoading || state.loading) {
        return;
      }
      commit('setLoading', true);
      let collection = (firestore.collection(
        "blogs"
      ) as firebase.firestore.CollectionReference<BlogPost>).orderBy(
        "date",
        "desc"
      );

      if (publicOnly) {
        collection = collection.where("public", "==", true);
      }
      const length = state.posts.length;
      if (length > 0) {
        collection = collection.startAfter(state.posts[length - 1]);
      }

      collection
        .limit(limit)
        .get()
        .then(snapshot => {
          if (limit !== snapshot.docs.length) {
            commit('doneLoading');
          }
          commit('addPosts', snapshot.docs);
        }).finally(() => {
          commit('setLoading', false);
        });
    }
  },
  getters: {
    getPostById: (state) => (id: string) => {
      return state.posts.find(post => post.id === id);
    }
  },
};

interface GalleryState {
  photos: Photo[];
  loading: boolean;
}

const gallery: Module<GalleryState, {}> = {
  namespaced: true,
  state: {
    photos: [],
    loading: false,
  },
  mutations: {
    setPhotos: (state, photos: Photo[]) => {
      state.photos = photos;
    },
    setLoading: (state, loading: boolean) => {
      state.loading = loading;
    }
  },
  actions: {
    load: ({ commit, state }) => {
      if (state.photos.length > 0 || state.loading) {
        return;
      }
      commit('setLoading', true);
      firestore.doc('main/gallery').get().then(snapshot => {
        commit('setPhotos', (snapshot.data() as Gallery).photos.sort());
      }).finally(() => {
        commit('setLoading', false);
      });
    }
  },
};

interface SponsorsState {
  sponsors: Sponsor[];
  loading: boolean;
}

const sponsors: Module<SponsorsState, {}> = {
  namespaced: true,
  state: {
    sponsors: [],
    loading: false,
  },
  mutations: {
    setSponsors: (state, sponsors: Sponsor[]) => {
      state.sponsors = sponsors;
    },
    setLoading: (state, loading: boolean) => {
      state.loading = loading;
    }
  },
  actions: {
    load: ({ commit, state }) => {
      if (state.sponsors.length > 0 || state.loading) {
        return;
      }
      commit('setLoading', true);
      firestore.doc('main/sponsors').get().then(snapshot => {
        commit('setSponsors', (snapshot.data() as SponsorsDoc).sponsors);
      }).finally(() => {
        commit('setLoading', false);
      });
    }
  },
};

interface QuoteState {
  quotes: Quote[];
  loading: boolean;
}

const quotes: Module<QuoteState, {}> = {
  namespaced: true,
  state: {
    quotes: [],
    loading: false,
  },
  mutations: {
    setQuotes: (state, quotes: Quote[]) => {
      state.quotes = quotes;
    },
    setLoading: (state, loading: boolean) => {
      state.loading = loading;
    },
    resetQuotes: (state) => {
      state.quotes = [];
    }
  },
  actions: {
    load: ({ commit, state }) => {
      if (state.quotes.length > 0 || state.loading) {
        return;
      }
      commit('setLoading', true);
      firestore.doc('main/quotes').get().then(snapshot => {
        commit('setQuotes', (snapshot.data() as QuotesDoc).quotes);
      }).finally(() => {
        commit('setLoading', false);
      });
    }
  },
};

export default new Vuex.Store({
  state: {
    isAdmin: false,
    isEditor: false,
    user: null as User | null,
  },
  mutations: {
    handleClaims(state, claims: Claims) {
      state.isEditor = !!claims.isEditor;
      state.isAdmin = !!claims.isAdmin;
    },
    setUser(state, user: User | null) {
      state.user = user;
    }
  },
  actions: {},
  modules: { blog, gallery, sponsors, quotes }
});