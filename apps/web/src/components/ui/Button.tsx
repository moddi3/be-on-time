'use client';

export type ButtonProps = {
	children: React.ReactNode;
	click?: () => void | any;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, click, ...props }) => {
	const styles = {};
	return (
		// bg-blue-500 hover:bg-blue-700
		<button
			className="text- font-medium bg-gray-200 hover:bg-slate-200 py-0 px-4 rounded-md h-[35px] leading-4 "
			// style={styles}
			onClick={click}
			{...props}>
			{children}
		</button>
	);
};
