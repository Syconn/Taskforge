import styles from '../styles/DashboardPage.module.css'
import type { Board } from '../util/data'

function BoardCard({ board }: { board: Board }) {

    return (
        <article className={styles.boardCard} role="listitem">
            <div className={`${styles.boardStrip} ${styles[board.tone]}`}>
                <button className={styles.starBtn} aria-label={`Star ${board.title}`}>
                    ★
                </button>
            </div>
            <div className={styles.boardMeta}>
                <h3>{board.title}</h3>
            </div>
        </article>
    )
}

export default BoardCard