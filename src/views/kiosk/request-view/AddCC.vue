<template>
  <div >
    <v-card flat class="p-2 ml-2 mt-5" color="transparent font-weight-bold">
      <b-icon scale="1" class="mr-2" icon="envelope"></b-icon> CC UPON APPROVAL
    </v-card>
    <b-row> 
      <b-col sm="">
        <v-card flat class="ml-4 mt-1" color="transparent"> Email </v-card>
      </b-col>
      <b-col sm="7" >
        <v-chip
          v-for="(selection, i) in selections"
          :key="selection.id"
          class="shrink mr-2"
          :disabled="loading"
          close
          @click:close="remove(i)"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span color="transparent" v-bind="attrs" v-on="on">
                {{ selection.Name }}
              </span>
            </template>
            <span> {{ selection.Email }}</span>
          </v-tooltip>
        </v-chip>
      </b-col>
      <b-col sm="4" >
        <ModalAddEmployee class="float-right mr-4"></ModalAddEmployee
      ></b-col>
    </b-row>
    <!-- <v-toolbar flat color="transparent" class="mb-4">
      <v-card flat class="" color="transparent"> Email </v-card>
      <v-col
        v-for="(selection, i) in selections"
        :key="selection.id"
        class="shrink"
      >
        <v-chip
          :disabled="loading"
          close
          @click:close="selectedCC.splice(i, 1)"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span color="transparent" v-bind="attrs" v-on="on">
                {{ selection.Name }}
              </span>
            </template>
            <span> {{ selection.Email }}</span>
          </v-tooltip>
        </v-chip>
      </v-col>
      <v-spacer></v-spacer>
      <ModalAddEmployee></ModalAddEmployee>
    </v-toolbar> -->
  </div>
</template>
<script>
import { EventBus } from "../../../bus/bus";
import ModalAddEmployee from "../modal/AddCCEmployee.vue";

export default {

  components: {
    ModalAddEmployee,
  },

  data() {
    return {
      data:{
        
      },
      loading: false,
      selectedCC: [],
    };
  },
  created() {
    EventBus.$on("addCC", (data) => {
      this.selectedCC = data;
    });
  },
  computed: {
    selections() {
      const selections = [];

      for (const selection of this.selectedCC) {
        selections.push(selection);
      }
      return selections;
    },
  },

  methods:{
    remove(i){
      this.selectedCC.splice(i, 1)
      EventBus.$emit("addCC", this.selectedCC);
    }
  }
};
</script>
