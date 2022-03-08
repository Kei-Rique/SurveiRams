<template>
  <q-card>
    <header
      class="text-weight-bold q-pl-md text-h5 text-primary text-center"
      style="padding: 15px"
    >
      Edit Assignment
    </header>

    <form @submit="submitForm">
      <!--add Security Personnel-->
      <q-select
        rounded
        label="Security Personnel"
        outlined
        v-model="assignmentToSubmit.name"
        class="inputStyle"
        :rules="[(val) => !!val || 'Field is required']"
        ref="name"
        autofocus
        :options="name"
        emit-value
        map-options
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
      <q-select
        rounded
        label="Post"
        outlined
        v-model="assignmentToSubmit.post"
        class="inputStyle"
        :rules="[(val) => !!val || 'Field is required']"
        ref="post"
        :options="post"
        emit-value
        map-options
      >
        <template v-slot:append>
          <q-icon
            v-if="assignmentToSubmit.post"
            @click="assignmentToSubmit.post = ''"
            class="cursor-pointer"
            name="close"
          />
          <q-icon name="schedule" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale" />
          </q-icon>
        </template>
      </q-select>

      <!--Date-->
      <q-input
        rounded
        v-model="assignmentToSubmit.date"
        label="Date"
        outlined
        class="inputStyle"
        mask="date"
        :rules="['date']"
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
      <div>
        <q-input
          rounded
          v-model="assignmentToSubmit.time"
          label="Time"
          outlined
          class="inputStyle"
          mask="time"
          :rules="['time']"
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

      <!--Confirm Edit-->
      <q-card-actions align="center">
        <q-btn
          rounded
          no-caps
          label="Confirm Edit"
          color="secondary"
          class="fit"
          type="submit"
        />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["assignment", "id"],

  data() {
    return {
      assignmentToSubmit: {},
      name: [
        {
          label: "Pam Ram",
          value: "Pam Ram",
        },
      ],
      post: [
        {
          label: "Basement 1",
          value: "Basement 1",
        },
        {
          label: "Basement 2",
          value: "Basement 2",
        },
        {
          label: "Basement 3",
          value: "Basement 3",
        },
        {
          label: "1st Floor",
          value: "1st Floor",
        },
        {
          label: "2nd Floor",
          value: "2nd Floor",
        },
        {
          label: "3rd Floor",
          value: "3rd Floor",
        },
        {
          label: "4th Floor",
          value: "4th Floor",
        },
        {
          label: "5th Floor",
          value: "5th Floor",
        },
        {
          label: "6th Floor",
          value: "6th Floor",
        },
        {
          label: "7th Floor",
          value: "7th Floor",
        },
        {
          label: "8th Floor",
          value: "8th Floor",
        },
        {
          label: "9th Floor",
          value: "9th Floor",
        },
        {
          label: "10th Floor",
          value: "10th Floor",
        },
        {
          label: "11th Floor",
          value: "11th Floor",
        },
        {
          label: "12th Floor",
          value: "12th Floor",
        },
      ],
    };
  },

  methods: {
    ...mapActions("assignments", ["updateAssignment"]),

    clearDate() {
      this.assignmentToSubmit.date = "";
      this.assignmentToSubmit.time = "";
    },
    submitForm() {
      this.$refs.name.validate();
      this.$refs.post.validate();
      if (!this.$refs.name.hasError && !this.$refs.post.hasError) {
        this.updateAssignment({
          id: this.id,
          updates: this.assignmentToSubmit,
        });
        console.log("updated: ", this.assignmentToSubmit);
        this.$emit("close");
      }
    },
  },

  mounted() {
    this.assignmentToSubmit = Object.assign({}, this.assignment);
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
