<template>
  <nav v-if="user">
    <div class="row q-pa-sm text-white q-pt-xl">
      <!-- <div class="text-grey-5">
        {{ user.displayName }}
      </div> -->
            <!--home-->
      <div class="row q-pl-md">
        <q-icon
          name="fas fa-solid fa-house-user"
          size="sm"
          color="white"
          @click="handleClick"
        />
      </div>
      <div dense class="col text-center" />
      <!--page title-->
      <div class="q-pr-md text-weight-bolder text-h5">
        {{ $route.name }}
      </div>
      <div class="col" />
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
