import styles from "@pages/auth/styles/form.module.scss"
import { useState } from "react"

export const PrivacySwitch = () => {
    const [isPrivate, setIsPrivate] = useState(false) // Կամ սկիզբը backend-ից ստացեք

    const togglePrivacy = () => {
        setIsPrivate((prev) => !prev)
        // Ավելացրեք API request, օրինակ՝
        // await api.updatePrivacy({ private: !isPrivate });
    }

    return (
        <div className={styles.privacySwitch}>
            <label>
                <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={togglePrivacy}
                />
                Private Account
            </label>
        </div>
    )
}
