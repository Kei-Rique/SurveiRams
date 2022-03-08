<template>
  <nav v-if="user">
    <div class="row q-pa-sm text-white q-pt-lg">
      <div dense class="col text-center q-pl-xl"></div>
      <!--page title-->
      <div class="q-pr-md text-weight-bolder text-h6">
        {{ $route.name }}
      </div>
      <div class="col"></div>
      <!--logout-->
      <div class="row q-pr-sm">
        <q-icon
          name="fas fa-sign-out-alt"
          size="sm"
          color="white"
          @click="handleClick"
        />
      </div>
    </div>
    <!--profile picture-->
    <div class="row q-px-xl q-pt-md q-pb-sm">
      <q-avatar size="80px" class="col vertical-center">
        <img src="~assets/pamtheram.png" />
      </q-avatar>
    </div>
    <!--name-->
    <div class="row q-px-xl">
      <div class="col text-center text-weight-bold text-white">
        {{ user.displayName }}
      </div>
    </div>
    <!--id number-->
    <div class="row q-px-xl q-pb-md">
      <div class="col text-center text-grey-5">
        {{ user.email }}
      </div>
    </div>
  </nav>
</template>

<script>
import useLogout from "src/composables/useLogout";
import getUser from "src/composables/getUser";

export default {
  setup(props, context) {
    const { logout, error } = useLogout();
    const { user } = getUser();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        context.emit("logout");
      }
    };

    return { handleClick, user };
  },
};
</script>
