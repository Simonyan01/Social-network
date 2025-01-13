import { IResponse, IUpdatePassword } from "@helpers/types"
import { METHODS, useHttpMutation } from "@hooks/useHttp"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "@pages/auth/styles/form.module.scss"
import { toast } from "react-toastify"

export const UpdatePassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUpdatePassword>()
    const [updatePassword, error] = useHttpMutation<IResponse, IUpdatePassword>(reset)

    const handleUpdate: SubmitHandler<IUpdatePassword> = (data: IUpdatePassword) => {
        updatePassword("/update/password", METHODS.PATCH, data)
        toast.success("Password updated successfully!")
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Update Password</h2>
            <form onSubmit={handleSubmit(handleUpdate)} className={styles.form}>
                {error && <p className={styles.error}>{error}</p>}
                {errors.old && <p className={styles.errorText}>{errors.old.message}</p>}
                <div className={styles.space}>
                    <input
                        {...register("old", {
                            required: "Current password is required"
                        })}
                        type="password"
                        placeholder="Enter current password"
                        className={styles.input}
                    />
                </div>
                {errors.newpwd && <p className={styles.errorText}>{errors.newpwd.message}</p>}
                <div className={styles.space}>
                    <input
                        {...register("newpwd", {
                            required: "New password is required",
                            minLength: { value: 7, message: "Password must be at least 7 characters" }
                        })}
                        type="password"
                        placeholder="Enter new password"
                        className={styles.input}
                    />
                </div>
                <button
                    type="submit"
                    className={styles.button}
                >
                    Update Password
                </button>
            </form>
        </div>
    )
}
