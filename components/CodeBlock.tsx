import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { useEffect, useRef } from 'react';
import { ClipboardCopyIcon } from '@heroicons/react/outline';

type PropsType = {
  children: React.ReactNode;
};

const CodeBlock = ({ children }: PropsType) => {
  useEffect(() => {
    hljs.configure({
      languages: ['typescript', 'javascript', 'json', 'css', 'scss', 'html'],
      ignoreUnescapedHTML: true,
    });
    hljs.highlightAll();
  }, []);

  const codeBlock = useRef<HTMLElement>(null);

  const handleCopyToClipboard = () => {
    if (codeBlock.current) {
      navigator.clipboard.writeText(codeBlock.current.innerText);
    }
  };

  return (
    <div className="relative my-2">
      <pre className="">
        <div onClick={handleCopyToClipboard} className="absolute right-2 top-2">
          <ClipboardCopyIcon className="h-6 w-6 cursor-pointer text-slate-500 hover:text-slate-600" />
        </div>
        <code className="border text-sm" ref={codeBlock}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
