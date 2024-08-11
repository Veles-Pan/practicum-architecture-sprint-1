import { UserListState } from "./store";

export const getUser = (state: UserListState) => state.user.user;
