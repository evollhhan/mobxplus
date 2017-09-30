# Mobx Plus

> Use mobx like vuex. Still Working on it. There are two versions of different usage. See branch dev-v1 & dev-v2 for more detail. The source code of mobxplus locates @ src/store/MobxPlus.ts

> This demo is based on typescript + react.

## Branch: dev-v1
```javascript
//
// Just use it like vuex
//
import store from "./store";

// commit
store.commit("EventName", EventData);
// dispatch
store.dispatch("LOAD_USERINFO");
```

## Branch: dev-v2
```javascript
// Consider ts lint.
commit.EventName(EventData)
```

## View Demo

1. npm install
2. webpack
3. open index.html

