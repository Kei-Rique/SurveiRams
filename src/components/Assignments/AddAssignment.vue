<template>
  <header class="text-weight-bold q-pl-md text-h5 text-primary">
    Create new Assignment
  </header>

  <form @submit="submitForm">
    <!--Date-->
    <q-input
      rounded
      v-model="assignmentToSubmit.date"
      label="Date"
      outlined
      class="inputStyle"
      mask="date"
      :rules="['date']"
      ref="date"
    >
      <template v-slot:append>
        <q-icon
          v-if="assignmentToSubmit.date"
          @click="clearDate"
          class="cursor-pointer"
          name="close"
        />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="assignmentToSubmit.date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!--Time-->
    <div v-if="assignmentToSubmit.date">
      <q-input
        rounded
        v-model="assignmentToSubmit.time"
        label="Time"
        outlined
        class="inputStyle"
        mask="time"
        :rules="['time']"
        ref="time"
      >
        <template v-slot:append>
          <q-icon
            v-if="assignmentToSubmit.time"
            @click="assignmentToSubmit.time = ''"
            class="cursor-pointer"
            name="close"
          />
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="assignmentToSubmit.time">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    
    <!--add Security Personnel-->
    <q-select
      v-model="assignmentToSubmit.name"
      :options="name"
      ref="name"
      emit-value
      map-options
      class="inputStyle"
      label="Security Personnel"
      rounded
      outlined
      :rules="[(val) => !!val || 'Field is required']"
    >
      <template v-slot:append>
        <q-icon
          v-if="assignmentToSubmit.name"
          @click="assignmentToSubmit.name = ''"
          class="cursor-pointer"
          name="close"
        />
        <q-icon name="account_circle" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale" />
        </q-icon>
      </template>
    </q-select>

    <!--Post-->
    <q-input
      v-model="assignmentToSubmit.post"
      ref="post"
      emit-value
      map-options
      class="inputStyle"
      label="Post"
      rounded
      outlined
      :rules="[(val) => !!val || 'Field is required']"
    >
      <template v-slot:append>
        <q-icon
          rounded
          no-caps
          name="casino"
          class="fit"
          @click ="randomRoute()"
        />
      </template>
    </q-input>

    <!--Assign Now-->
    <q-card-actions align="center" class="q-pa-md">
      <q-btn
        rounded
        no-caps
        label="Assign Now"
        color="secondary"
        class="fit q-pa-md"
        type="submit"
      />
    </q-card-actions>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      assignmentToSubmit: {
        name: "",
        post: "",
        date: "",
        time: "",
        userUid: "",
        completed: false,
        feedback: false
      },

      name: [
        {
          label: "Pam Ram",
          value: "Pam Ram",
        },
      ],

    };
  },

  methods: {
    ...mapActions("assignments", ["addAssignment"]),

    clearDate() {
      this.assignmentToSubmit.date = "";
      this.assignmentToSubmit.time = "";
    },
    submitForm() {
      this.$refs.name.validate();
      this.$refs.post.validate();
      if (!this.$refs.name.hasError && !this.$refs.post.hasError) {
        this.addAssignment(this.assignmentToSubmit);
      }
    },

  // Random Route for all Building
    randomRoute() {
      let post = [
          "1st Floor", 
          "2nd Floor", 
          "3rd Floor", 
          "4th Floor", 
          "5th Floor", 
          "6th Floor", 
          "7th Floor", 
          "8th Floor", 
          "9th Floor", 
          "10th Floor", 
          "11th Floor", 
          "12th Floor", 
          "Basement 1", 
          "Basement 2", 
          "Basement 3"
        ]
      var item = post[Math.floor(Math.random()*post.length)]
      this.assignmentToSubmit.post = item
      //console.log("sucessfully generated")
    },

    
  },
};
</script>

<style>
.inputStyle {
  height: 80px;
  max-width: 1080px;
  max-height: 150px;
  padding: 10px;
  font-size: 20px;
}
</style>
