import { IMutationMap, MobxPlus } from "./MobxPlus";
import { IUserAction, IUserState } from "./refer";

const state: IUserState = {
  name: "Alice",
  age: 12,
  school: {
    location: "Shanghai",
  },
};

const mutations: IMutationMap = {
  UPDATE_USERINFO(newState: any, payload: any) {
    console.log("[Mutations] Triggerred.");
    newState.name = payload.name;
    newState.age = payload.age;
    newState.school = { location: payload.location };
  },
};

const actions: IUserAction = {
  LOAD_USERINFO({ commit, newState }, data) {
    console.log("[Actions] Triggerred.");
    setTimeout(() => {
      commit.UPDATE_USERINFO({
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
