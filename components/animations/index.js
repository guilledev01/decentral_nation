"use client";

import { Fade, Zoom, LightSpeed } from "@successtar/react-reveal";

export const FadeEffect = ({ children, ...props }) => {
  return <Fade {...props}>{children}</Fade>;
};

export const ZoomEffect = ({ children, ...props }) => {
  return <Zoom {...props}>{children}</Zoom>;
};

export const LightSpeedEffect = ({ children, ...props }) => {
  return <LightSpeed {...props}>{children}</LightSpeed>;
};
