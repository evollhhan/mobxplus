import {
  IActionMap,
  IActionOptions,
  IFunctionMap,
  IMutationMap,
  TMutation,
  TPayloadFunction,
} from "./MobxPlus";

/**
 * State
 */
export interface IUserState {
  /**
   * 姓名
   */
  name: string;

  /**
   * 年龄
   */
  age: number;

  /**
   * 学校信息
   */
  school: any;
}

/**
 * Mutation For Commit Calls
 */
export interface IUserCommit extends IFunctionMap {
  /**
   * 更新用户信息。
   */
  UPDATE_USERINFO: TPayloadFunction;
}

/**
 * Mutation
 */
export interface IUserMutation extends IMutationMap {
  UPDATE_USERINFO: TMutation;
}

/**
 * Action For Dispatch Calls
 */
export interface IUserDispatch extends IFunctionMap {
  /**
   * 加载用户信息。
   */
  LOAD_USERINFO: TPayloadFunction;
}

/**
 * Action
 */
interface IUserDispatchOptions {
  commit?: IUserCommit;
  dispatch?: IUserDispatch;
  newState?: IUserState;
}
type TUserActionFunction = (options: IUserDispatchOptions, data: any) => any;
export interface IUserAction extends IActionMap {
  LOAD_USERINFO: TUserActionFunction;
}
