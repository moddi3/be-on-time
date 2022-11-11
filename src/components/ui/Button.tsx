'use client';

export type ButtonProps = {
    children: React.ReactNode;
    click?: () => void | any;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, click, ...props }) => {

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(click)}
            {...props}
        >
            {children}
        </button>
    );
};
