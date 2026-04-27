import BoardCard from '../components/BoardCard'
import styles from '../styles/DashboardPage.module.css'
import type { Board } from '../util/data'

function BoardGrid({ boards }: { boards: Board[] }) {
    return (
        <div className={styles.boardGrid} role="list">
            {boards.map((board, index) => (
                <BoardCard key={index} board={board} />
            ))}
        </div>
    )
}

function DashboardPage() {
    const starredBoards: Board[] = [{title: "test", favorite: false, tone: "blue"}]
    const recentlyViewed: Board[] = []
    const workspaceBoards: Board[] = []

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
                    </div>

                    <BoardGrid boards={workspaceBoards} />

                    <article className={`${styles.boardCard} ${styles.createCard}`} role="button" tabIndex={0}>
                        <div className={`${styles.boardStrip} ${styles.neutral}`} />
                        <div className={styles.boardMeta}>
                            <h3>Create new board</h3>
                            <p>{workspaceBoards.length} boards created</p>
                        </div>
                    </article>
                </section>
            </section>
        </main>
    )
}

export default DashboardPage