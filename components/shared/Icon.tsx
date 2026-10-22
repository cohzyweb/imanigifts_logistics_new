type IconProps = {
  name: string;
  size?: number | string;
  fill?: boolean;
  className?: string;
};

export default function Icon({ name, size, fill, className = "" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: fill ? "\"FILL\" 1" : undefined,
      }}
    >
      {name}
    </span>
  );
}
