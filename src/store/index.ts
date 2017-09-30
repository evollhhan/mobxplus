import MobxPlus from "./MobxPlus";

const state = {
  name: "Alice",
  age: 12,
  school: {
    location: "Shanghai",
  },
};

const mutations = {
  UPDATE_USERINFO(newState: any, data: any) {
    console.log("[Mutations] Triggerred.");
    newState.name = data.name;
    newState.age = data.age;
    newState.school = { location: data.location };
  },
};

const actions = {
  LOAD_USERINFO({ commit, newState }: any, data: any) {
    console.log("[Actions] Triggerred.");
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
  report(currentState: any) {
    return `School Location: ${currentState.school.location}`;
  },
};

const watcher = function() {
  console.log(`[Watcher] Current Mobx+ instance =>`, this);
  console.log(`[Watcher] this.report changed =>`, this.report);
};

export const store = new MobxPlus({
  state,
  actions,
  mutations,
  getters,
  watcher,
});
