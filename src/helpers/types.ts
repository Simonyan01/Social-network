export interface IUser {
  id: number
  name: string
  surname: string
  login: string
  password: string
  cover: string
  picture: string
  followers: IUser[]
  following: IUser[]
}

export interface IAccount extends IUser {
  posts: unknown
  isPrivate: number
  connection: {
    followsMe: boolean
    following: boolean
    requested: boolean
  }
}

export interface IUpdateLogin {
  login: string
  password: string
}

export interface IUpdatePassword {
  old: string
  newpwd: string
}

export interface IResponse {
  status: string
  message: string
  payload: unknown
  user?: IUser
  post?: IPost[]
}

export interface IPost {
  id: number
  picture: string
  title: string
}

export interface IContext {
  user: IUser | null
  refetch: () => void
}

export interface IAccountContext {
  account: IAccount | null
  refetch: () => void
}

export type IAuth = Pick<IUser, "login" | "password">
