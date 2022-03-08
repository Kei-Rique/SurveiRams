<template>
  <q-item
    v-ripple
    :class="assignment.completed ? 'bg-orange-1' : 'bg-green-1'"
    class="q-mb-sm"
    clickable
    @click="showAsignmentDetails = true"
  >
    <q-item-section avatar>
      <q-icon name="check_circle_outline" color="accent" size="md" />
    </q-item-section>

    <!-- assignments  -->
    <q-item-section class="q-py-lg">
      <q-item-label class="text-weight-bold text-grey-8">
        {{ assignment.name }}
      </q-item-label>
      <!-- Date -->
      <q-item-label class="row" caption>
        {{ assignment.post }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <div class="col justify-center">
          <!-- Date -->
          <q-item-label class="row text-bold" caption v-if="assignment.date">
            {{ niceDate(assignment.date) }}
          </q-item-label>
          <!-- Time -->
          <q-item-label class="row" caption v-if="assignment.time">
            {{ assignmentTime }}
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div>
        <q-icon
          name="check"
          color="green"
          size="md"
          @click.stop="
            updateAssignment({
              id: id,
              updates: { feedback: !assignment.feedback },
            })
          "
        />
        <q-icon
          name="delete"
          color="red"
          size="md"
          @click.stop="prompToDelete(id)"
        />
      </div>
    </q-item-section>
  </q-item>

  <q-dialog v-model="showAsignmentDetails">
    <!-- ASSIGNMENT DETAILS MODAL -->
    <assignment-details
      v-if="!assignment.completed"
      :key="key"
      :assignment="assignment"
    />
    <!-- FEEDBACK DETAILS MODAL -->
    <report-details v-else :key="key" :assignment="assignment" />
  </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
const { addToDate } = date;

export default {
  props: ["assignment", "id"],

  methods: {
    ...mapActions("assignments", ["updateAssignment", "deleteAssignment"]),
    ...mapGetters("assignments", ["assignments"]),
    prompToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm Delete",
          message: "Do you really want to delete the assignment?",
          ok: {
            push: true,
          },
          cancel: {
            color: "negative",
          },
          persistent: true,
        })
        .onOk(() => {
          this.deleteAssignment(id);
        });
    },
  },

  computed: {
    niceDate() {
      return (value) => {
        return date.formatDate(value, "MMM DD, YYYY");
      };
    },
    assignmentTime() {
      return date.formatDate(
        this.assignment.date + " " + this.assignment.time,
        "h:mm A"
      );
    },
  },

  data() {
    return {
      showAsignmentDetails: false,
    };
  },

  components: {
    "assignment-details": require("src/components/Modals/AssignmentDetails.vue")
      .default,
    "report-details": require("src/components/Modals/ReportDetails.vue")
      .default,
  },
};
</script>
