<template>
  <table class="table">
    <tbody>
      <tr v-for="(column, key, index) in data" :key="'column' + index">
        <template v-if="index<=startIndex && beginning==true">

          <th >{{ key }}</th>
          <td >
            {{ column }}
          </td>
        </template>
          <template v-if="index>startIndex && beginning==false">

          <th >{{ key }}</th>
          <td >
            {{ column }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>
<script>

export default {
  props:["data","startIndex","endIndex","beginning"],

  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {

  },
};
</script>
