<template>
  <q-page>
    <!--header-->
    <div rounded size="1000px" class="z-absolute bg-primary">
      <navbar @logout="goToAuth()" />
    </div>

    <!-- body -->
    <div class="row q-pt-xl">
      <!-- ASSIGNMENTS -->
      <div class="col q-pr-sm q-pl-md">
        <q-card
          v-ripple
          @click="goToAssignments()"
          class="my-box cursor-pointer q-hoverable"
        >
          <!--icon-->
          <div class="row q-pt-lg q-pl-md">
            <q-avatar class="col vertical-center text-secondary  q-pl-lg">
              <q-icon name="assignments" size="40px" />
            </q-avatar>
          </div>

          <!--name-->
          <div class="row q-pb-md">
            <div class="col text-center text-body2  text-grey-8">Assignments</div>
          </div>
        </q-card>
      </div>

      <!-- FEEDBACKS -->
      <div class="col q-pr-md q-pl-sm">
        <q-card
          v-ripple
          @click="goToFeedbacks()"
          class="my-box cursor-pointer q-hoverable"
        >
          <!--icon-->
          <div class="row q-pt-lg">
            <q-avatar class="col vertical-center text-secondary">
              <q-icon name="feedback" size="40px" />
            </q-avatar>
          </div>

          <!--name-->
          <div class="row q-pb-md">
            <div class="col text-center text-body2  text-grey-8">Feedback</div>
          </div>
        </q-card>
      </div>
    </div>

    <div class="row q-pt-md q-pb-xl">
      <!-- INSIGHTs -->
      <div class="col q-pr-sm q-pl-md">
        <q-card
          v-ripple
          @click="goToInsights()"
          class="my-box cursor-pointer q-hoverable"
        >
          <!--icon-->
          <div class="row q-pt-lg">
            <q-avatar class="col vertical-center text-secondary">
              <q-icon name="fas fa-solid fa-chart-line" size="40px" />
            </q-avatar>
          </div>

          <!--name-->
          <div class="row q-pb-md">
            <div class="col text-center text-body2 text-grey-8">Insights</div>
          </div>
        </q-card>
      </div>

      <!-- MEMBERS -->
      <div class="col q-pr-md q-pl-sm">
        <q-card
          v-ripple
          @click="goToMembers()"
          class="my-box cursor-pointer q-hoverable"
        >
          <!--icon-->
          <div class="row q-pt-lg">
            <q-avatar class="col vertical-center text-secondary">
              <q-icon name="people" size="40px" />
            </q-avatar>
          </div>

          <!--name-->
          <div class="row q-pb-md">
            <div class="col text-center text-body2  text-grey-8">Members</div>
          </div>
        </q-card>
      </div>
    </div>

        <q-page-sticky position="bottom-left" :offset="[18, 10]">
      <morphStep />
    </q-page-sticky>
  </q-page>
</template>

<!--script-->
<script>
export default {
  name: "PageHome",

  components: {
    navbar: require("components/Navbars/Navbar.vue").default,
   morphStep: require("src/components/Morph/morphStep.vue").default,
  },

  methods: {
    goToAuth() {
      this.$router.push("/");
    },
    goToAssignments() {
      this.$router.push("/assignments");
    },
    goToFeedbacks() {
      this.$router.push("/feedback");
    },
    goToInsights() {
      this.$router.push("/insights");
    },
    goToMembers() {
      this.$router.push("/members");
    },
  },
};
</script>
