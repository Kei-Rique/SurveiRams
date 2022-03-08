import { projectFirestore } from "src/boot/firebase";
import { ref } from "vue";

const getAssignment = () => {
  const assignments = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await projectFirestore.collection("assignments").get();
      console.log("res.docs: ", res.docs);
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { assignments, error, load };
};

export default getAssignment;
