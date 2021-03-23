import { AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 280px;
  height: 280px;
`;

export function MotionLayoutDemo() {
  const [selected, setSelected] = React.useState(colors[0]);

  return (
    <AnimateSharedLayout>
      <Wrapper>
        {colors.map((color) => (
          <Item
            key={color}
            color={color}
            isSelected={selected === color}
            onClick={() => setSelected(color)}
          />
        ))}
      </Wrapper>
    </AnimateSharedLayout>
  );
}

const StyledItem = styled.li`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
`;

const Outline = styled(motion.div)`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border: 10px solid white;
  border-radius: 50%;
`;

function Item({ color, isSelected, onClick }) {
  return (
    <StyledItem onClick={onClick} style={{ backgroundColor: color }}>
      {isSelected && (
        <Outline
          layoutId="outline"
          initial={false}
          animate={{ borderColor: color }}
          transition={spring}
        />
      )}
    </StyledItem>
  );
}

const colors = ["#ff0055", "#0099ff", "#22cc88", "#ffaa00"];

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};
