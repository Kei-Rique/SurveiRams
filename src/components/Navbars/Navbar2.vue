<template>
  <nav v-if="user">
    <div class="row q-pa-sm text-white q-pt-lg">
      <!-- <div class="text-grey-5">
        {{ user.displayName }}
      </div> -->
      <div dense class="col text-center q-pl-xl"></div>
      <!--page title-->
      <div class="q-pr-md text-weight-bolder text-h5">
        {{ $route.name }}
      </div>
      <div class="col"></div>
      <!--home-->
      <div class="row q-pr-sm">
        <q-icon
          name="fas fa-solid fa-house-user"
          size="sm"
          color="white"
          @click="handleClick"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import getUser from "src/composables/getUser";

export default {
  setup(props, context) {
    const { user } = getUser();

    const handleClick = async () => {
      context.emit("home");
    };

    return { handleClick, user };
  },
};
</script>
