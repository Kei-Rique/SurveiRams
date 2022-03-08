<template>
  <q-item
    v-ripple
    :class="!assignment.completed ? 'bg-orange-1' : 'bg-green-1'"
    class="q-mb-sm"
    clickable
    @click="
      updateAssignment({
        id: id,
        updates: { completed: !assignment.completed },
      })
    "
  >
    <q-item-section avatar>
      <q-icon name="assignment" color="accent" size="md" />
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
          name="edit"
          color="green"
          size="md"
          @click.stop="showEditTask = true"
        />
        <q-icon
          name="delete"
          color="red"
          size="md"
          @click.stop="prompToDelete(id)"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-assignment
        @close="showEditTask = false"
        :assignment="assignment"
        :id="id"
      />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from "vuex";
import { date } from "quasar";
const { addToDate } = date;

export default {
  props: ["assignment", "id"],

  methods: {
    ...mapActions("assignments", ["updateAssignment", "deleteAssignment"]),
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

  data() {
    return {
      showEditTask: false,
    };
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

  components: {
    "edit-assignment": require("src/components/Modals/EditAssignment.vue")
      .default,
  },
};
</script>
