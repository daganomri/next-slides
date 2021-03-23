import React from "react";
import styled from "styled-components";

type Props = {
  rows?: number;
  columns?: number;
  children?: React.ReactNode;
};

const GridWrapper = styled.section<{ $rows: number; $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const InnerWrapper = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  max-height: 100%;
`;

const Grid = ({ rows = 1, columns = 1, children, ...props }: Props) => {
  return (
    <GridWrapper $rows={rows} $columns={columns} {...props}>
      {rows === 1 && columns === 1 ? (
        <InnerWrapper>{children}</InnerWrapper>
      ) : (
        children
      )}
    </GridWrapper>
  );
};

export default Grid;
