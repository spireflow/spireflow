import { cn } from "../../../utils/classNames";

/**
 * Skeleton loader component for displaying placeholder content while data is loading.
 * Uses pulse animation to indicate loading state.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply for custom sizing and positioning
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props
 *
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-full" />
 * ```
 */
const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-skeletonBg", className)}
      {...props}
    />
  );
};

export { Skeleton };
