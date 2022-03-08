<template>
  <!--logo name-->
  <div class="row q-pr-xl q-mr-xl">
    <div class="col"></div>
    <div class="col">
      <img
        src="~assets/Ramslogo.png"
        style="min-height: 25px; max-width: 200px"
      />
    </div>
    <div class="col"></div>
  </div>

  <!--background-->
  <div class="row gt-xs bg-image">
    <div class="col">
      <q-img src="~assets/Artboard2.png" class="absolute-full" />
    </div>
  </div>

  <div class="row absolute-center">
    <q-card style="width: 750px; max-width: 100vw">
      <q-card-section class="row">
        <!--col 0-->
        <div class="col">
          <!--Welcome-->
          <div class="text-h4 text-primary text-bold q-pa-md">
            Welcome Back!
          </div>
          <div class="subtitletext-h1 text-grey-7 text-light q-px-md">
            We are excited to see you again!
          </div>
          <!--Login-->
          <div name="login">
            <login @login="enterHome()" />
          </div>
        </div>
        <!--col 1-->
        <div class="row items-center">
          <!--RAMS logo-->
          <div class="col gt-xs">
            <img
              src="~assets/Ramslogo.png"
              style="height: 270px; max-width: 270px"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    return {
      tab: "login",
    };
  },

  setup() {
    const showLogin = ref(true);
    return { showLogin };
  },

  components: {
    login: require("components/Login.vue").default,
  },

  methods: {
    enterHome() {
      this.$router.push("/home");
    },
  },
};
</script>
