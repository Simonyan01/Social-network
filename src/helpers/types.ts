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
  posts: IPost[]
  isPrivate: number
  connection: {
    followsMe: boolean
    following: boolean
    requested: boolean
  }
}

export interface IRequest {
  id: string
  username: string
  userId: number
  picture: string
  createdAt: string
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
  id: string
  picture: string
  title: string
  isLiked: boolean
  likes: IUser[]
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

export type PostProps = {
  post: IPost
  onLike: (id: string) => void
  refetch: () => void
}

export type ModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onDelete: () => void
}

export type UserPosts = Partial<{
  userPosts: IPost[]
}>
