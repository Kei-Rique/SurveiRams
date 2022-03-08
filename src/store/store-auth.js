import { LocalStorage, Loading } from "quasar";
import { projectAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/functions-show-error-message";

const state = {};

const mutations = {};

const actions = {
  loginUser({}, payload) {
    Loading.show();
    projectAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {})
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  handleAuthStateChange({ commit, dispatch }) {
    projectAuth.onAuthStateChanged((user) => {
      Loading.hide();
      if (user) {
        //User is signed in
        this.$router.push("/home").catch((err) => {});
        dispatch("assignments/fbReadData", null, { root: true });
      } else {
        //user is logout
        this.$router.replace("/").catch((err) => {});
      }
    });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
