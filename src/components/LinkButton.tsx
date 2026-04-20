import { MouseEvent, ReactNode } from 'react';

type LinkButtonProps = {
  href: string;
  onNavigate?: (href: string) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
};

export function LinkButton({
  href,
  onNavigate,
  variant = 'primary',
  children,
}: LinkButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || href.startsWith('http') || href.startsWith('mailto:')) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  };

  return (
    <a
      className={`button button--${variant}`}
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
