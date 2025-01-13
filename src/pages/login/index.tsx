import { METHODS, useHttpMutation } from "@hooks/useHttp"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { IAuth, IResponse } from "@helpers/types"
import styles from "./style.module.scss"

export const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IAuth>()
  const [postLogin, error] = useHttpMutation<IResponse, IAuth>(() => navigate("/profile"))

  const handleLogin: SubmitHandler<IAuth> = (data: IAuth) => {
    postLogin("/login", METHODS.POST, data)
    reset()
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Login to continue</p>
        <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          {errors.login && <p className={styles.error}>{errors.login.message}</p>}
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          <div className={styles.inputGroup}>
            <label htmlFor="login" className={styles.label}>
              Login
            </label>
            <input
              {...register("login", { required: "Please fill your login" })}
              id="login"
              placeholder="Enter your login"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              {...register("password", { required: "Please fill your password" })}
              id="password"
              type="password"
              placeholder="Enter your password"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
