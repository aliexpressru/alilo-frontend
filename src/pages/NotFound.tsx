import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
	<div style={{ height: '100%' }}>
		<h2>Nothing to see here!</h2>
		<Link to="/">Go to the home page</Link>
	</div>
);
