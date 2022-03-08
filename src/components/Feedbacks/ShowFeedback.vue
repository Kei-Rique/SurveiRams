<template>
  <div class="q-pa-md bg-primary full-width">
    <!-- header -->
    <div class="row">
        <div class="col text-h5 text-white text-bold q-pa-md">
          Feedback
        <q-icon color="white" name="chat" />   
      </div>
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="fas fa-times-circle"
            size="lg"
            class="col-2 text-white align-right"
          />      
    </div>
    <!-- body -->
    <q-scroll-area
      :thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle"
      style="height: 580px"
      class="bg-primary"
    >
      <div v-if="documents" class="messages ">
        <div v-for="doc in documents" :key="doc.id" class="single">
          <q-item-label  class="row">
            <div class=" text-body1 q-pb-sm">
              <!-- name and icon -->
              <div> 
                <span class="text-weight-bolder text-h8">
                  {{ doc.name }} 
                  </span>
                <q-icon color="primary" name="chat" />         
              </div>
              <!-- date & time -->
              <div class="text-weight-light text-grey-8 text-body2">
                {{ formatDate(doc.createdAt.toDate()) }}
              </div>

              <!-- content -->
              <div class="q-pt-md text-body1">
                <p>{{ doc.message }}</p>
              </div>
            </div>
          </q-item-label>

        </div>
      </div>
              
      <!-- error -->
      <div v-if="error">
        {{ error }}
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import getCollection from 'src/composables/getCollection'
import  moment  from 'moment'
export default {
  setup() {
    const { error, documents } = getCollection('feedbacks')
    return { 
      error, 
      documents,
       thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#f8c949",
        width: "5px",
        opacity: 0.5,
      },     
    }
  },
  computed: {
    niceDate() {
      return (value) => {
        return moment(value).fromNow(); // ...ago
      };
    },
    formatDate() {
      return (value) => {
        return moment(value).format('lll'); // February 24th 2022
      };
    },    
  }
}
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
</style>