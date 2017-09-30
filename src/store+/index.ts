import Store from "./store";

const state = {
  name: "Alice",
  age: 12,
  school: {
    location: "Shanghai",
  },
};

const mutations = {
  UPDATE_USERINFO(newState: any, data: any) {
    newState.name = data.name;
    newState.age = data.age;
    newState.school = { location: data.location };
  },
};

const actions = {
  LOAD_USERINFO({ commit, newState }: any, data: any) {
    console.log("wait for location update.", newState.name);
    setTimeout(() => {
      commit("UPDATE_USERINFO", {
        name: "Jackie",
        age: 15,
        location: "Beijing",
      });
    });
  },
};

const getters = {
  report(newState: any) {
    return `UPDATE USER LOCATION: -> ${state.school.location}`;
  },
};

const watcher = function() {
  console.log(this);
  console.log(this.report);
};

export const storex = new Store({
  state,
  actions,
  mutations,
  getters,
  watcher,
});
