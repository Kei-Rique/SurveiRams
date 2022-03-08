<template>
  <q-page>
    <!--header-->
    <div rounded size="1000px" class="z-absolute bg-primary">
      <navbar2 @home="goToHome()" />
    </div>

    <q-list separator bordered>
      <!-- Guard -->
      <q-item v-ripple>
        <q-item-section avatar class="q-py-lg">
          <q-avatar>
            <img src="~assets/pamtheram.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section class="q-py-lg">
          <q-item-label class="text-weight-bold text-grey-8">
            Pam Ram
          </q-item-label>
          <q-item-label class="row" caption> Guard </q-item-label>
        </q-item-section>
        <!-- Status -->
        <q-item-section side>
          <div class="row">
            <div class="col justify-center">
              <q-item-label class="row text-bold" caption style="color: orange">
                Not Patrolling
              </q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>

      <!-- Head Guard -->
      <q-item v-ripple>
        <q-item-section avatar class="q-py-lg">
          <q-avatar>
            <img src="~assets/pamtheram.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section class="q-py-lg">
          <q-item-label class="text-weight-bold text-grey-8">
            Mervin Quilang
          </q-item-label>
          <q-item-label class="row" caption> Head Guard </q-item-label>
        </q-item-section>
        <!-- Status -->
        <q-item-section side>
          <div class="row">
            <div class="col justify-center">
              <q-item-label class="row text-bold" caption style="color: green">
                Active
              </q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>

      <!-- BMO -->
      <q-item v-ripple>
        <q-item-section avatar class="q-py-lg">
          <q-avatar>
            <img src="~assets/pamtheram.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section class="q-py-lg">
          <q-item-label class="text-weight-bold text-grey-8">
            Manuel Garcia
          </q-item-label>
          <q-item-label class="row" caption> BMO Admin </q-item-label>
        </q-item-section>
        <!-- Status -->
        <q-item-section side>
          <div class="row">
            <div class="col justify-center">
              <q-item-label class="row text-bold" caption style="color: red">
                Not Active
              </q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  components: {
    navbar2: require("components/Navbars/Navbar2.vue").default,
  },

  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },
};
</script>
