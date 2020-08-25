import Vue from "vue";
import Vuex, { Module } from "vuex";
import { firestore, BlogPost, Gallery, Photo } from "../firebase";
import { User } from 'firebase';

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
      firestore.doc('gallery/main').get().then(snapshot => {
        commit('setPhotos', (snapshot.data() as Gallery).photos.sort((a, b) => b.date.toMillis() - a.date.toMillis()));
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
    setEditor(state, isEditor: boolean) {
      // TODO use this for something
      state.isEditor = isEditor;
    },
    setUser(state, user: User | null) {
      state.user = user;
    }
  },
  actions: {},
  modules: { blog, gallery }
});