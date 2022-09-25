import Link from 'next/link';

export const PreviewInfoPanel = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 flex flex-row items-center gap-1 border-t border-slate-400 bg-slate-400/50 px-4 py-1 text-xl text-red-700 backdrop-blur-sm">
      <span className="flex text-lg">Preview mode.</span>
      <Link href="/api/exit-preview" prefetch={false}>
        <a className="flex underline transition-colors duration-300 hover:text-blue-700">
          Click here
        </a>
      </Link>
      <span className="flex text-lg">to exit preview mode.</span>
    </div>
  );
};
