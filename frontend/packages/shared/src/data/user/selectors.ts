import { UserListState } from "./store";

export const getUser = (state: UserListState) => state.user.user;

export const getEmail = (state: UserListState) => state.user.email;

export const getToken = (state: UserListState) => state.user.jwt;
