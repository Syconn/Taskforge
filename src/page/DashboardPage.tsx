import styles from '../styles/DashboardPage.module.css'

type BoardCard = {
    id: number
    title: string
    subtitle?: string
    tone: 'red' | 'blue' | 'violet' | 'slate'
}

const starredBoards: BoardCard[] = [
    { id: 1, title: 'Syconn Super Hero Mod', tone: 'red' },
    { id: 2, title: 'Spaceward Expansion', subtitle: 'Development', tone: 'blue' },
    { id: 3, title: 'Survivor Game', tone: 'violet' },
    { id: 4, title: "Syconn's Star Wars Mod", subtitle: 'RoadMap', tone: 'slate' },
]

const recentlyViewed: BoardCard[] = [
    { id: 5, title: "Syconn's Star Wars Mod", subtitle: 'RoadMap', tone: 'slate' },
    { id: 6, title: 'Spaceward Expansion', subtitle: 'Development', tone: 'blue' },
    { id: 7, title: 'Syconn Super Hero Mod', tone: 'red' },
    { id: 8, title: 'Survivor Game', tone: 'violet' },
]

const workspaceBoards: BoardCard[] = [
    { id: 9, title: 'Spaceward Expansion', subtitle: 'Development', tone: 'blue' },
    { id: 10, title: 'Survivor Game', tone: 'violet' },
    { id: 11, title: 'Syconn Super Hero Mod', tone: 'red' },
    { id: 12, title: "Syconn's Star Wars Mod", subtitle: 'RoadMap', tone: 'slate' },
]

function BoardGrid({ boards }: { boards: BoardCard[] }) {
    return (
        <div className={styles.boardGrid} role="list">
            {boards.map((board) => (
                <article key={board.id} className={styles.boardCard} role="listitem">
                    <div className={`${styles.boardStrip} ${styles[board.tone]}`}>
                        <button className={styles.starBtn} aria-label={`Star ${board.title}`}>
                            ★
                        </button>
                    </div>
                    <div className={styles.boardMeta}>
                        <h3>{board.title}</h3>
                        {board.subtitle ? <p>{board.subtitle}</p> : null}
                    </div>
                </article>
            ))}
        </div>
    )
}

function DashboardPage() {
    return (
        <main className={styles.dashShell}>
            <aside className={styles.dashSidebar}>
                <div className={styles.brand}>Taskforge</div>
                <nav>
                    <button className={`${styles.sideLink} ${styles.active}`}>Boards</button>
                    <button className={`${styles.sideLink}`}>Favorites</button>
                </nav>
                <div className={styles.workspaceBlock}>
                    <small>Recent</small>
                </div>
            </aside>

            <section className={styles.dashContent}>
                <header className={styles.dashTopbar}>
                    <input aria-label="Search boards" placeholder="Search" />
                    <button className={styles.createBtn}>Create</button>
                </header>

                <section className={styles.contentBlock}>
                    <h2>Starred boards</h2>
                    <BoardGrid boards={starredBoards} />
                </section>

                <section className={styles.contentBlock}>
                    <h2>Recently viewed</h2>
                    <BoardGrid boards={recentlyViewed} />
                </section>

                <section className={styles.contentBlock}>
                    <div className={styles.workspaceHeader}>
                        <h2>Your Workspaces</h2>
                        <div className={styles.workspaceActions}>
                            <button>Boards</button>
                            <button>Members</button>
                            <button>Settings</button>
                        </div>
                    </div>

                    <BoardGrid boards={workspaceBoards} />

                    <article className={`${styles.boardCard} ${styles.createCard}`} role="button" tabIndex={0}>
                        <div className={`${styles.boardStrip} ${styles.neutral}`} />
                        <div className={styles.boardMeta}>
                            <h3>Create new board</h3>
                            <p>6 remaining</p>
                        </div>
                    </article>
                </section>
            </section>
        </main>
    )
}

export default DashboardPage