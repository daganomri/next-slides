import React from "react";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = { theme: keyof typeof themes } & SyntaxHighlighterProps;

export const code: React.FC<Props> = ({
  className,
  theme = "dracula",
  children,
  ...props
}) => {
  const language = className.replace("language-", "");
  return (
    <SyntaxHighlighter
      className={className}
      language={language}
      style={themes[theme]}
      {...props}
    >
      {(children as string).trim()}
    </SyntaxHighlighter>
  );
};
