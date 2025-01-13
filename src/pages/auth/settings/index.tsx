import { UpdatePassword } from "./components/UpdatePassword"
import styles from "@pages/auth/styles/form.module.scss"
import { UpdateLogin } from "./components/UpdateLogin"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Settings = () => {
    return (
        <section className={styles.settingsContainer}>
            <UpdateLogin />
            <UpdatePassword />
            <ToastContainer />
        </section>
    )
}
