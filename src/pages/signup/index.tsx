import { METHODS, useHttpMutation } from "@hooks/useHttp"
import { IResponse, IUser } from "@helpers/types"
import { useForm } from "react-hook-form"
import styles from "./style.module.scss"
import { Link, useNavigate } from "react-router-dom"

export const Signup = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUser>()
    const [postSignUp, error] = useHttpMutation<IResponse, IUser>(reset)

    const handleSignUp = (data: IUser) => {
        postSignUp("/signup", METHODS.POST, data)
        navigate("/")
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Create Account</h2>
                <p className={styles.subtitle}>Join us and start your journey</p>
                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    className={styles.form}
                >
                    {error && <p className={styles.error}>{error}</p>}
                    {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Name
                        </label>
                        <input
                            {...register("name", { required: "Please fill your name" })}
                            placeholder="Enter your name"
                            className={styles.input}
                        />
                    </div>
                    {errors.surname && <p className={styles.error}>{errors.surname.message}</p>}
                    <div className={styles.inputGroup}>
                        <label htmlFor="surname" className={styles.label}>
                            Surname
                        </label>
                        <input
                            {...register("surname", { required: "Please fill your surname" })}
                            placeholder="Enter your surname"
                            className={styles.input}
                        />
                    </div>
                    {errors.login && <p className={styles.error}>{errors.login.message}</p>}
                    <div className={styles.inputGroup}>
                        <label htmlFor="login" className={styles.label}>
                            Login
                        </label>
                        <input
                            {...register("login", { required: "Please fill your login" })}
                            placeholder="Enter your login"
                            className={styles.input}
                        />
                    </div>
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Please fill your password",
                                minLength: {
                                    value: 7,
                                    message: "Password is too short",
                                },
                            })}
                            type="password"
                            placeholder="Enter your password"
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Sign Up
                    </button>
                </form>
                <div className={styles.footer}>
                    <p>
                        Already have an account?{" "}
                        <Link to="/" className={styles.link}>
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

