import { icons } from "./Icons";

type CategoryIconProps = {
  category: keyof typeof icons;
  size?: number;
};

export default function CategoryIcon({
  category,
  size = 20,
}: CategoryIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[category]}
    </svg>
  );
}
