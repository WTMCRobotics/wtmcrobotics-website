import Vue from "vue";
import Vuex, { Module } from "vuex";
import { firestore, BlogPost } from "../firebase";

Vue.use(Vuex);

interface BlogState {
  posts: firebase.firestore.QueryDocumentSnapshot<BlogPost>[];
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
    addPosts: (state, newPosts: firebase.firestore.QueryDocumentSnapshot<BlogPost>[]) => {
      state.posts.push(...newPosts);
    },
    setLoading: (state, loading: boolean) => {
      state.loading = loading;
    },
    doneLoading: (state) => {
      state.doneLoading = true;
    },
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

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { blog }
});