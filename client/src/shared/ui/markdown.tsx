import ReactMarkdown, { type Options } from 'react-markdown';
import { Typograpghy } from './typography';

export const Markdown = ({ children, ...mdProps }: Readonly<Options>) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children, className, ...other }) => (
          <Typograpghy tagVariant="h1" className="mb-5" {...other}>
            {children}
          </Typograpghy>
        ),
        h2: ({ children, className, ...other }) => (
          <Typograpghy tagVariant="h2" className="mb-5" {...other}>
            {children}
          </Typograpghy>
        ),
        h3: ({ children, className, ...other }) => (
          <Typograpghy tagVariant="h3" className="mb-5" {...other}>
            {children}
          </Typograpghy>
        ),
        h4: ({ children, className, ...other }) => (
          <Typograpghy tagVariant="h4" className="mb-5" {...other}>
            {children}
          </Typograpghy>
        ),
        h5: ({ children, className, ...other }) => (
          <Typograpghy tagVariant="h5" className="mb-4" {...other}>
            {children}
          </Typograpghy>
        ),
        h6: ({ children, className, ...other }) => (
          <Typograpghy tagVariant="h6" className="mb-4" {...other}>
            {children}
          </Typograpghy>
        ),
        p: ({ children, className, ...other }) => (
          <Typograpghy tagVariant="p" className="text-foreground mb-4" {...other}>
            {children}
          </Typograpghy>
        ),
        a: ({ children, ...other }) => (
          <a className="text-primary underline" {...other}>
            {children}
          </a>
        ),
        ul: ({ children, ...other }) => (
          <ul className="text-foreground mb-4 list-disc space-y-2 pl-6" {...other}>
            {children}
          </ul>
        ),
        ol: ({ children, ...other }) => (
          <ol className="text-foreground mb-4 list-decimal space-y-2 pl-6" {...other}>
            {children}
          </ol>
        ),
        em: ({ children, ...other }) => (
          <em className="text-foreground" {...other}>
            {children}
          </em>
        ),
        blockquote: ({ children, ...other }) => (
          <blockquote className="bg-accent mb-4 rounded-md px-3 py-2" {...other}>
            {children}
          </blockquote>
        ),
      }}
      {...mdProps}
    >
      {children}
    </ReactMarkdown>
  );
};
