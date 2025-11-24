import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'icon' | 'icon-ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Button content */
  children: ReactNode;
  /** Whether the button should take full width on mobile */
  fullWidthMobile?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
  icon: 'text-blue-600 bg-blue-50 hover:bg-blue-100 focus:ring-blue-500',
  'icon-ghost': 'text-gray-600 bg-white hover:bg-gray-100 focus:ring-blue-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs sm:text-sm',
  md: 'px-4 py-2 text-sm sm:text-base',
  lg: 'px-6 py-3 text-base sm:text-lg',
};

const baseStyles =
  'rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidthMobile = false,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const widthClass = fullWidthMobile ? 'w-full sm:w-auto' : '';
  const combinedClassName =
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
