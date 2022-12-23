import { NextPage } from 'next';
import { Button } from '../../components/ui/Button';

const TestPage: NextPage = () => {
	return (
		<div className="flex justify-center items-center h-full">
			<Button>Hey</Button>
		</div>
	);
};

export default TestPage;
