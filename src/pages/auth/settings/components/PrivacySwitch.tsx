import { FormControlLabel, styled, Switch } from "@mui/material"
import { METHODS, useHttpMutation } from "@hooks/useHttp"
import styles from "@pages/auth/styles/form.module.scss"
import { useState } from "react"

const IOSSwitch = styled(Switch)(() => ({
    width: 48,
    height: 28,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 2,

        "&.Mui-checked": {
            transform: "translateX(20px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: "#57cf5b",
                opacity: 1,
                border: "none",
                boxShadow: "0px 0px 6px rgba(76, 175, 80, 0.5)",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        width: 24,
        height: 24,
        borderRadius: "50%",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.3)",
    },
    "& .MuiSwitch-track": {
        borderRadius: 14,
        backgroundColor: "gray",
    },
}))

export const PrivacySwitch = () => {
    const [isPrivate, setIsPrivate] = useState(false)

    const [togglePrivacyRequest, error, loading] = useHttpMutation(() => {
        console.log("Privacy status updated successfully.")
    })

    const togglePrivacy = () => {
        setIsPrivate((prev) => !prev)
        togglePrivacyRequest("/account/set", METHODS.PATCH)
    }

    return (
        <section>
            <div className={styles.container}>
                <h1 className={styles.heading}>Privacy Settings</h1>
                <div className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}
                    <FormControlLabel
                        control={
                            <IOSSwitch
                                sx={{ m: 1 }}
                                checked={isPrivate}
                                onChange={togglePrivacy}
                                disabled={!!loading}
                            />
                        }
                        label="Private Account"
                    />
                </div>
            </div>
        </section>
    )
}
