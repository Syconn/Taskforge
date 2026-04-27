import { useLiveQuery } from 'dexie-react-hooks';
import DashboardPage from './page/DashboardPage';
import { db } from './util/database';

function App() {
	const projects = useLiveQuery(() => db.projects.toArray());

  	return (
		<DashboardPage />
	)
}

export default App

