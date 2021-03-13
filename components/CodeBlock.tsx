import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";
import styled from "styled-components";

const Pre = styled.pre`
  font-size: 0.75rem;
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: auto;
  max-width: 100%;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  font-size: 0.75rem;
`;

const WithLineNumbers = ({ code, chosenLanguage }) => (
  <Highlight
    {...defaultProps}
    code={code}
    theme={dracula}
    language={chosenLanguage}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <Line key={i} {...getLineProps({ line, key: i })}>
            <LineNo>{i + 1}</LineNo>
            <LineContent>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </LineContent>
          </Line>
        ))}
      </Pre>
    )}
  </Highlight>
);

const CodeBlock = ({ children, className, live, render }) => {
  const language = className.replace(/language-/, "");

  return (
    <Wrapper>
      <WithLineNumbers code={children.trim()} chosenLanguage={language} />
    </Wrapper>
  );
};

export default CodeBlock;
