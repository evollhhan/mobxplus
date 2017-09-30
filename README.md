# Mobx Plus

> Use mobx like vuex. There are two versions of different usage. See branch dev-v1 & dev-v2 for more detail. The source code of mobxplus locates @ src/store/MobxPlus.ts

> Though this project needs further development, you could run demo now. This demo is based on typescript + react.

## Branch: dev-v1
```javascript
//
// Create Store
// ----
import MobxPlus from "./MobxPlus";

const store = new MobxPlus({
  state,
  actions,
  mutations,
  getters,
  watcher
})

//
// Just use it like vuex
// ----
// 1. commit
store.commit("EventName", EventData);
// 2. dispatch
store.dispatch("LOAD_USERINFO");
```

## How to view demo

1. clone / download source code
1. npm install
2. webpack
3. open index.html

