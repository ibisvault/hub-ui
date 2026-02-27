import React from "react";
import { cn } from "@/lib/utils";

export interface EicCanLogoIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  useCurrentColor?: boolean;
  variant?: "primary" | "accent" | "foreground" | "leica-red" | "leica-white" | "leica-black" | "can-purple";
  className?: string;
  style?: React.CSSProperties;
}

export const EicCanLogoIcon: React.FC<EicCanLogoIconProps> = ({
  width = 360,
  height,
  color,
  useCurrentColor = false,
  variant = "primary",
  className = "",
  style = {},
}) => {
  const calculatedHeight = height || width;

  const variantToColor = (v: NonNullable<EicCanLogoIconProps["variant"]>): string => {
    switch (v) {
      case "accent":
        return "hsl(var(--accent))";
      case "foreground":
        return "hsl(var(--foreground))";
      case "can-purple":
        return "var(--can-purple)";
      case "leica-red":
        return "var(--leica-red)";
      case "leica-white":
        return "var(--leica-white)";
      case "leica-black":
        return "var(--leica-black)";
      case "primary":
      default:
        return "hsl(var(--primary))";
    }
  };

  const fillColor = useCurrentColor ? "currentColor" : color || variantToColor(variant);

  return (
    <svg
      width={calculatedHeight}
      height={calculatedHeight}
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      style={style}
      aria-hidden
      focusable={false}
    >
      <g clipPath="url(#clip0_564_2275)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M260 50C260 65.1433 266.732 78.7142 277.367 87.8833C285.193 94.6308 292 103.477 292 113.81L292 116.19C292 126.523 285.193 135.369 277.367 142.117C266.732 151.286 260 164.857 260 180C260 195.143 266.732 208.714 277.367 217.883C285.193 224.631 292 233.476 292 243.81L292 246.19C292 256.523 285.192 265.369 277.367 272.117C266.732 281.286 260 294.857 260 310C260 337.614 282.386 360 310 360C337.614 360 360 337.614 360 310C360 294.616 353.052 280.855 342.124 271.683C334.058 264.914 327 255.948 327 245.418L327 244.582C327 234.052 334.058 225.086 342.124 218.317C353.052 209.145 360 195.384 360 180C360 164.616 353.052 150.855 342.124 141.683C334.058 134.914 327 125.948 327 115.418L327 114.582C327 104.052 334.058 95.0861 342.124 88.3169C353.052 79.1449 360 65.3838 360 50C360 22.3858 337.614 -9.78513e-07 310 -2.18557e-06C282.386 -3.39263e-06 260 22.3858 260 50Z"
          fill={fillColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-2.18557e-06 50C-2.8475e-06 65.1433 6.73201 78.7142 17.3665 87.8833C25.1925 94.6308 32 103.477 32 113.81L32 116.19C32 126.523 25.1925 135.369 17.3665 142.117C6.732 151.286 -7.20612e-06 164.857 -7.86805e-06 180C-8.52998e-06 195.143 6.73201 208.714 17.3665 217.883C25.1925 224.631 32 233.476 32 243.81L32 246.19C32 256.523 25.1925 265.369 17.3665 272.117C6.73199 281.286 -1.28886e-05 294.857 -1.35505e-05 310C-1.47576e-05 337.614 22.3857 360 50 360C77.6142 360 100 337.614 100 310C100 294.616 93.0524 280.855 82.1237 271.683C74.0579 264.914 67 255.948 67 245.418L67 244.582C67 234.052 74.0579 225.086 82.1237 218.317C93.0524 209.145 100 195.384 100 180C100 164.616 93.0524 150.855 82.1238 141.683C74.0579 134.914 67 125.948 67 115.418L67 114.582C67 104.052 74.0579 95.0861 82.1238 88.3169C93.0524 79.1449 100 65.3838 100 50C100 22.3858 77.6142 -9.78513e-07 50 -2.18557e-06C22.3858 -3.39263e-06 -9.78513e-07 22.3858 -2.18557e-06 50Z"
          fill={fillColor}
        />
        <circle cx="180" cy="180" r="50" fill={fillColor} />
        <circle cx="180" cy="50" r="50" fill={fillColor} />
        <circle cx="180" cy="310" r="50" fill={fillColor} />
      </g>
      <defs>
        <clipPath id="clip0_564_2275">
          <rect width="360" height="360" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EicCanLogoIcon;
