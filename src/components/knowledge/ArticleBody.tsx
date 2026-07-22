import ReactMarkdown from "react-markdown";

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        components={{
          h2: (props) => (
            <h2 className="mt-10 text-h2 font-bold text-slate-900 first:mt-0" {...props} />
          ),
          h3: (props) => (
            <h3 className="mt-6 text-h3 font-semibold text-slate-900" {...props} />
          ),
          p: (props) => <p className="mt-4 text-body-lg leading-relaxed text-slate-700" {...props} />,
          ul: (props) => <ul className="mt-4 list-disc space-y-2 ps-6 text-body-lg text-slate-700" {...props} />,
          li: (props) => <li {...props} />,
          strong: (props) => <strong className="font-semibold text-slate-900" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
