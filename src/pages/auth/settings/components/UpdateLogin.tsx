import { METHODS, useHttpMutation } from "@hooks/useHttp"
import { IResponse, IUpdateLogin } from "@helpers/types"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "@pages/auth/styles/form.module.scss"
import { toast } from "react-toastify"

export const UpdateLogin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUpdateLogin>()
    const [updateLogin, error] = useHttpMutation<IResponse, IUpdateLogin>(reset)

    const handleUpdate: SubmitHandler<IUpdateLogin> = async (data: IUpdateLogin) => {
        updateLogin("/update/login", METHODS.PATCH, data)
        toast.success("Login updated successfully!")
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Update Login</h2>
            <form onSubmit={handleSubmit(handleUpdate)} className={styles.form}>
                {error && <p className={styles.error}>{error}</p>}
                {errors.login && <p className={styles.errorText}>{errors.login.message}</p>}
                <div className={styles.space}>
                    <input
                        {...register("login", {
                            required: "Login is required",
                            minLength: { value: 3, message: "Login must be at least 3 characters" }
                        })}
                        placeholder="Enter new login"
                        className={styles.input}
                    />
                </div>
                {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
                <div className={styles.space}>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 7, message: "Password must be at least 6 characters" }
                        })}
                        placeholder="Enter password"
                        className={styles.input}
                    />
                </div>
                <button
                    type="submit"
                    className={styles.button}
                >
                    Update Login
                </button>
            </form>
        </div >
    )
}
