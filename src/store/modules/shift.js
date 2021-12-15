import axios from "axios";

const state = () => ({
  shifts: [],
});

const mutations = {
  setShifts(state, data) {
    state.shifts = JSON.parse(data).data;
  },
};

const actions = {
  createShift({ dispatch }, data) {
    return axios
      .post("createShift", data)
      .then(async (result) => {
        try {
          await dispatch("retrieveShifts");
          return result;
        } catch (error) {
          return error;
        }
      })
      .catch((err) => {
        return err.response;
      });
  },

  retrieveShifts() {
    return axios
    .get("getAllShifts")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  },

  updateShift({state}, props) {
    return axios
    .post("updateShift", props.ciphertext)
    .then((result) => {
      state.shifts[props.index] = props.editedData;
      return result;
    })
    .catch((err) => {
      return err.response;
    });
  },

  deleteShift({ state }, props) {
    const index = state.shifts.indexOf(props.item);
    return axios
      .delete("shift/delete/" + props.id)
      .then((result) => {
        state.shifts.splice(index, 1);
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  },
};

const getters = {
  allShifts: (state) => state.shifts,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
