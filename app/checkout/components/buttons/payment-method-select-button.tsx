"use client";

import { ReactNode } from "react";

export interface PaymentMethodSelectButtonProps {
    icon?: ReactNode;
    title?: string;
    description?: string|ReactNode;
    onClick?: VoidFunction;
    isActive?: boolean;
}
export const PaymentMethodSelectButton = ({ 
    icon,
    title,
    description,
    onClick,
    isActive = false,
}: PaymentMethodSelectButtonProps) => {
    return (
        <button 
            type="button"
            onClick={onClick ?? (() => {})}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${isActive ? 'border-primary/50 bg-primary/5 text-(--brand-900)' : 'border-border/70 bg-background'}`}>
                {icon}
            <div>
                <p className="font-semibold">{title}</p>
                {
                    typeof description === 'string'
                        ? <p className="mt-0.5 text-sm text-muted-foreground">{description}</p> 
                        : description
                }
            </div>
        </button>
    );
}