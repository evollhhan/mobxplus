import {
  action,
  autorun,
  computed,
  extendObservable,
  extras,
  observable,
  useStrict,
} from "mobx";

useStrict(true);

interface IFunctionMap {
  [key: string]: (...args: any[]) => any;
}

interface IStoreConstructor {
  state?: object;
  mutations?: IFunctionMap;
  actions?: IFunctionMap;
  getters?: IFunctionMap;
  watcher?: () => any;
  errorHandler?: () => void;
}

export default class MobxPlus {
  /**
   * 状态容器。一个Store对象维护一份状态容器。
   */
  @observable private state: object;

  /**
   * 所有改变state的行为只能在mutations中完成，约定mutations内只能发生同步行为。
   */
  private mutations: IFunctionMap;

  /**
   * 所有异步操作可以在actions中进行。
   */
  private actions: IFunctionMap;

  /**
   * 构建一个新的Store对象。
   * @param opt 初始化参数
   */
  constructor(opt: IStoreConstructor) {
    const { state, mutations, actions, getters, errorHandler } = opt;

    // Init state, actions, mutations
    this.state = state;
    this.actions = actions;
    this.mutations = mutations;

    // Bind getters
    this.bindGetters(getters);

    // Bind this to exposed functions
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    // Bind Watcher
    let { watcher }  = opt;
    if (watcher) {
      watcher = watcher.bind(this);
      autorun(() => watcher());
    }

    // Error Handling
    if (errorHandler) {
      extras.onReactionError(errorHandler);
    }
  }

  /**
   * 发起一个同步的更新State行为。
   * @param eventName 事件名称
   * @param eventData 事件状态
   */
  @action
  public commit(eventName: string, eventData?: any) {
    const newState = {...this.state};
    this.mutations[eventName](newState, eventData);
    Object.assign(this.state, newState);
  }

  /**
   * 发起一个异步的更新Store行为。
   * @param eventName 事件名称
   * @param eventData 事件状态
   */
  public dispatch(eventName: string, eventData?: any) {
    this.actions[eventName].call(
      null,
      {
        commit: this.commit,
        newState: {...this.state},
      },
      eventData,
    );
  }

  /**
   * 将getters绑定的store内部。
   * @param getters 需要绑定的getters
   */
  private bindGetters(getters: IFunctionMap) {
    Object.keys(getters).map((key) => {
      extendObservable(this, {
        [key]: computed(getters[key].bind(null, this.state)),
      });
    });
  }
}
