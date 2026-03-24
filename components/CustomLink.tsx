import Link from 'next/link';

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
};

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, className = '', isExternal = false }) => {
  const baseClasses = 'text-blue-600 hover:underline';
  const fullClassName = `${baseClasses} ${className}`.trim();

  const externalProps = isExternal ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <Link 
      href={href}
      className={fullClassName}
      {...externalProps}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
