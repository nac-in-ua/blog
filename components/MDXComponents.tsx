import Link from 'next/link';
import Image from 'next/future/image';
import { ReactNode } from 'react';

// type PropsType = {
//   children: ReactNode;
//   href: string;
// };

// export const MDXLink = ({ href, children }: PropsType) => {
//   const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

//   if (isInternalLink) {
//     return (
//       <Link href={href}>
//         <a>{children}</a>
//       </Link>
//     );
//   }

//   return (
//     <a target="_blank" rel="noopener noreferrer" href={href}>
//       {children}
//     </a>
//   );
// };

const MDXLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXImage = (props: any) => {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
};

const Test = ({ children }: { children: ReactNode }) => (
  <div className="text-xl font-semibold text-red-500 underline">{children}</div>
);

const MDXComponents = {
  Image: MDXImage,
  a: MDXLink,
  Test,
};

export default MDXComponents;
