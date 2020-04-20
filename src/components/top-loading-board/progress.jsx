import React from "react";
import { useNProgress } from "@tanem/react-nprogress";
import PropTypes from "prop-types";
import Bar from "./bar";
import Container from "./container";

const Progress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container isFinished={isFinished} animationDuration={animationDuration}>
      <Bar progress={progress} animationDuration={animationDuration} />
    </Container>
  );
};

Progress.propTypes = {
  isAnimating: PropTypes.bool.isRequired,
};

export default Progress;
