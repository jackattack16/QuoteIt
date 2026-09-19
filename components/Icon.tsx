import 'material-symbols';

interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
  iconColor?: string;
  size?: number;
}

export default function Icon({
  name = "",
  filled = false,
  className = "",
  iconColor,
  size = 24,
}: IconProps) {
  return (
    <span
      className={`material-symbols-rounded select-none inline-flex items-center justify-center transition-all ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        fontSize: `${size}px`,
        color: iconColor,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
