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

export interface IFunctionMap {
  [key: string]: (...args: any[]) => any;
}

export type TMutation = (newState: any, payload: any) => void;

export interface IMutationMap {
  [key: string]: TMutation;
}

export type TPayloadFunction = (payload?: any) => void;

export interface IActionOptions {
  commit?: any;
  dispatch?: any;
  newState?: any;
}

export interface IActionMap {
  [key: string]: (options: IActionOptions, payload: any) => any;
}

interface IStoreConstructor {
  state?: object;
  mutations?: IFunctionMap;
  actions?: IFunctionMap;
  getters?: IFunctionMap;
  watcher?: () => any;
  errorHandler?: () => void;
}

export class MobxPlus {
  /**
   * 提交一个同步变更。
   */
  public commit: any;

  /**
   * 提交一个异步变更。
   */
  public dispatch: any;

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

    // Init state, commit, dispatch
    this.state = state;
    this.actions = actions;
    this.commit = Object.create(null);
    this.dispatch = Object.create(null);

    // Bind getters
    this.bindGetters(getters);

    // Bind this to exposed functions
    this.bindCommit(mutations);
    this.bindDispatch(actions);

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
  public confirmCommit(state: any) {
    Object.assign(this.state, state);
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

  /**
   * 将mutations绑定到commit上
   * @param mutations 需要绑定的mutations
   */
  private bindCommit(mutations: IFunctionMap) {
    Object.keys(mutations).map((key) => {
      this.commit[key] = (eventData: any) => {
        const newState = {...this.state};
        mutations[key](newState, eventData);
        this.confirmCommit(newState);
      };
    });
  }

  /**
   * 将actions绑定到
   * @param actions 需要绑定的actions
   */
  private bindDispatch(actions: IFunctionMap) {
    Object.keys(actions).map((key) => {
      this.dispatch[key] = (eventData: any) => {
        this.actions[key].call(
          null,
          {
            commit: this.commit,
            newState: {...this.state},
          },
          eventData,
        );
      };
    });
  }
}
