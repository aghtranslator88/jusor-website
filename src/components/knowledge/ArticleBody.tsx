import React from "react";
import ReactMarkdown from "react-markdown";
import { slugifyHeading } from "@/lib/toc";

function getNodeText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getNodeText).join("");
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props && props.children) {
      return getNodeText(props.children);
    }
  }
  return "";
}

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        components={{
          h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
            const text = getNodeText(children);
            const id = slugifyHeading(text);
            return (
              <h2 id={id} className="mt-10 text-h2 font-bold text-slate-900 first:mt-0 scroll-mt-24" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => {
            const text = getNodeText(children);
            const id = slugifyHeading(text);
            return (
              <h3 id={id} className="mt-6 text-h3 font-semibold text-slate-900 scroll-mt-24" {...props}>
                {children}
              </h3>
            );
          },
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
