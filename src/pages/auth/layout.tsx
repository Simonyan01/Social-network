import { METHODS, useHttpMutation, useHttpQuery } from '@hooks/useHttp'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styles from '@pages/auth/styles/layout.module.scss'
import { IResponse } from '@helpers/types'

const links = [
    { name: 'Home', href: '/profile' },
    { name: 'Settings', href: '/profile/settings' },
    { name: 'Followers', href: '/profile/followers' },
    { name: 'Followings', href: '/profile/followings' },
    { name: 'Messages', href: '/profile/messages' }
]

export const Layout = () => {
    const navigate = useNavigate()
    const [logout] = useHttpMutation(() => navigate("/"))
    const { data, loading, refetch } = useHttpQuery<IResponse>("/verify")

    const Logout = () => logout("/logout", METHODS.POST)

    if (loading) return <p>Loading...</p>

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