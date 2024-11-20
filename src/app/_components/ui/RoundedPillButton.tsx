"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Button, type ButtonProps } from "./button";

type RoundedPillButtonProps = ButtonProps & {
	childClassName?: string;
}

const roundedPillButtonVariants = cva(
	"w-full border border-2 p-2 rounded-md items-center justify-center inline-flex",
	{
		variants: {
			variant: {
				default:
					"border-white",
				destructive:
					"border-white",
				outline:
					"border-accent text-accent hover:border-accent-foreground hover:text-accent-foreground",
				white: "border-primary",
				secondary: "",
				ghost: "border-primary text-primary hover:border-white hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export const RoundedPillButton = ({ className, variant, size, asChild = false, childClassName, ...props }: RoundedPillButtonProps) => {
	return (
		<Button
			className={cn("p-2 block h-auto", variant === "outline" ? "border-none" : "", className)}
			variant={variant}
			size={size}
			asChild={asChild}
			{...props}
		>
			<div className={cn(roundedPillButtonVariants({ variant, size, className: childClassName }))}>
				{props.children}
			</div>
		</Button>
	);
};
