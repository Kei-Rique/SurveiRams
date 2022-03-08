<template>
  <div class="q-px-md q-py-lg bg-white full-width">
    <form>
      <textarea
        placeholder="Enter Feedback"
        v-model="message"
        @keypress.enter.prevent="handleSubmit"
        class="bg-grey-4"
      >
      </textarea>

      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import getUser from "src/composables/getUser";
import useCollection from "src/composables/useCollection";
import { timestamp } from "src/boot/firebase";
export default {
  setup() {
    const { user } = getUser();
    const { addDoc, error } = useCollection("feedbacks");
    const message = ref("");

    const handleSubmit = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp(),
      };
      await addDoc(chat);
      if (!error.value) {
        message.value = "";
      }
    };
    return { handleSubmit, message, error };
  },

  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 10px;
  font-family: inherit;
  outline: none;
}
.error {
  text-align: center;
  color: #ff2a58;
  font-size: 12px;
  padding: 10px 0;
}
</style>
