import React from "react";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  theme: keyof typeof themes;
  highlightLines: string;
} & SyntaxHighlighterProps;

export const code: React.FC<Props> = ({
  className,
  theme = "dracula",
  children,
  showLineNumbers,
  highlightLines,
  ...props
}) => {
  const language = className.replace("language-", "");
  const highlightLinesArray = highlightLines?.split(",").map((x) => +x);
  return (
    <SyntaxHighlighter
      className={className}
      language={language}
      wrapLines={Boolean(highlightLines)}
      showLineNumbers={Boolean(highlightLines) || showLineNumbers}
      style={themes[theme]}
      lineProps={(lineNumber) => ({
        style: highlightLinesArray?.includes(lineNumber)
          ? {
              opacity: 1,
              backgroundColor: "rgb(255 255 255 / 0.08",
              padding: "5px",
              paddingTop: 0,
              paddingLeft: 0,
            }
          : { opacity: 0.5 },
      })}
      {...props}
    >
      {(children as string).trim()}
    </SyntaxHighlighter>
  );
};
