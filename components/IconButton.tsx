'use client';

import Icon from "./Icon";

interface IconButtonProps {
  icon: string;
  fill?: boolean;
  padding?: number;
  className?: string;
  iconColor?: string;
  size?: number;
  onClick?: () => void;
  title?: string;
  "aria-label"?: string;
}

export default function IconButton({
  icon = "",
  fill = false,
  className = "",
  iconColor,
  size = 24,
  onClick,
  title,
  "aria-label": ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title || ariaLabel || icon}
      aria-label={ariaLabel || title || icon}
      className={`inline-flex items-center justify-center rounded-md p-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer ${className}`}
    >
      <Icon name={icon} filled={fill} iconColor={iconColor} size={size} />
    </button>
  );
}
