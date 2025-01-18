import { METHODS, useHttpMutation, useHttpQuery } from '@hooks/useHttp'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import mainStyles from '@pages/auth/styles/main.module.scss'
import styles from '@pages/auth/styles/layout.module.scss'
import { ClipLoader } from 'react-spinners'
import { IResponse } from '@helpers/types'

const links = [
    { name: 'Home', href: '/profile' },
    { name: 'Settings', href: '/profile/settings' },
    { name: 'Followers', href: '/profile/followers' },
    { name: 'Followings', href: '/profile/followings' },
    { name: 'Messages', href: '/profile/requests' }
]

export const Layout = () => {
    const navigate = useNavigate()
    const [logout] = useHttpMutation(() => navigate("/"))
    const { data, loading, refetch } = useHttpQuery<IResponse>("/verify")

    const Logout = () => logout("/logout", METHODS.POST)

    if (loading) {
        return (
            <section className={mainStyles.loading}>
                <ClipLoader
                    size={50}
                    color="#3498db"
                    loading={loading}
                />
            </section>
        )
    }

    return (
        <section className={styles.layout}>
            <nav className={styles.navbar}>
                <div className={styles.navContent}>
                    <h1 className={styles.title}>My Profile</h1>
                    <ul className={styles.navLinks}>
                        {links.map(({ href, name }) => (
                            <li key={name}>
                                <Link
                                    to={href}
                                    className={styles.navLink}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                type='button'
                                onClick={Logout}
                                className={styles.logoutButton}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className={styles.content}>
                <Outlet context={{ user: data.user, refetch }} />
            </main>
        </section>
    )
}