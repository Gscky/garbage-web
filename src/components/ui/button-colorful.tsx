import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "navy" | "gold";
}

export function ButtonColorful({
  className,
  label = "Cotizar ahora",
  variant = "navy",
  ...props
}: ButtonColorfulProps) {
  const isGold = variant === "gold";

  return (
    <Button
      className={cn(
        "relative h-10 px-4 overflow-hidden",
        isGold ? "bg-[#C8A96E]" : "bg-[#0A1628]",
        "transition-all duration-200",
        "group",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0",
          isGold
            ? "bg-gradient-to-r from-[#C8A96E] via-[#E2C98A] to-[#C8A96E]"
            : "bg-gradient-to-r from-[#0A1628] via-[#C8A96E] to-[#0A1628]",
          "opacity-0 group-hover:opacity-60",
          "blur transition-opacity duration-500"
        )}
      />
      <div className="relative flex items-center justify-center gap-2">
        <span
          className={cn(
            "font-medium text-sm",
            isGold ? "text-black" : "text-white"
          )}
        >
          {label}
        </span>
        <ArrowUpRight
          className={cn(
            "w-3.5 h-3.5",
            isGold ? "text-black/70" : "text-white/90"
          )}
        />
      </div>
    </Button>
  );
}
