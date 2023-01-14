"use client";

import { Fade, Zoom } from "@successtar/react-reveal";

export const FadeEffect = ({ children, ...props }) => {
  return <Fade {...props}>{children}</Fade>;
};

export const ZoomEffect = ({ children, ...props }) => {
  return <Zoom {...props}>{children}</Zoom>;
};
