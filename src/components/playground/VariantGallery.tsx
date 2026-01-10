/**
 * ============================================
 * VARIANT GALLERY - Component Variant Selector
 * ============================================
 *
 * This component displays a gallery of button variants that users
 * can click to switch between different design styles.
 *
 * Features:
 * - Grid layout of variant cards
 * - Preview of each variant
 * - Click to select and switch
 * - Visual indication of selected variant
 */

"use client";

import { ButtonVariant } from "@/registry/types";
import { cn } from "@/lib/utils";

interface VariantGalleryProps {
  variants: ButtonVariant[];
  selectedVariantId: string;
  onSelectVariant: (variantId: string) => void;
  currentProps: Record<string, unknown>;
}

/**
 * VariantGallery Component
 *
 * Displays a horizontal scrollable gallery of component variants
 */
export function VariantGallery({
  variants,
  selectedVariantId,
  onSelectVariant,
  currentProps,
}: VariantGalleryProps) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="w-full border-t bg-background">
      <div className="px-4 py-3 border-b">
        <h3 className="text-sm font-semibold">Variants</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Choose a design style
        </p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => onSelectVariant(variant.id)}
              className={cn(
                "group relative flex flex-col items-center justify-center",
                "p-4 rounded-lg border-2 transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                selectedVariantId === variant.id
                  ? "border-primary bg-accent shadow-md"
                  : "border-border bg-card"
              )}
            >
              {/* Variant Preview */}
              <div className="flex items-center justify-center w-full h-24 mb-3 overflow-hidden">
                <div className="scale-75 pointer-events-none">
                  {variant.render(currentProps)}
                </div>
              </div>

              {/* Variant Info */}
              <div className="text-center">
                <h4
                  className={cn(
                    "text-sm font-medium mb-1",
                    selectedVariantId === variant.id
                      ? "text-primary"
                      : "text-foreground"
                  )}
                >
                  {variant.name}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {variant.description}
                </p>
              </div>

              {/* Selected Indicator */}
              {selectedVariantId === variant.id && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-primary-foreground"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
