/**
 * Button Variants - Different button designs from various web sources
 *
 * These are alternative button designs that users can switch between
 * in the variant gallery.
 */

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  className?: string;
}

/**
 * Glassmorphism Button
 * Inspired by modern glass UI designs with backdrop blur
 */
export function GlassmorphismButton({
  children,
  size = "default",
  disabled = false,
  className
}: ButtonProps) {
  const sizeClasses = {
    default: "h-10 px-6 py-2",
    sm: "h-8 px-4 text-sm",
    lg: "h-12 px-8 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl font-medium",
        "bg-white/10 backdrop-blur-xl border border-white/20",
        "text-white shadow-lg",
        "transition-all duration-300",
        "hover:bg-white/20 hover:border-white/30 hover:shadow-xl hover:scale-105",
        "active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        sizeClasses[size],
        className
      )}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      }}
    >
      {children}
    </button>
  );
}

/**
 * Neubrutalism Button
 * Bold, high-contrast design with thick borders and offset shadows
 */
export function NeubrutalistButton({
  children,
  size = "default",
  disabled = false,
  className
}: ButtonProps) {
  const sizeClasses = {
    default: "h-12 px-8 py-3",
    sm: "h-10 px-6 text-sm",
    lg: "h-14 px-10 text-lg",
    icon: "h-12 w-12",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center font-bold uppercase tracking-wide",
        "bg-yellow-300 border-4 border-black text-black",
        "transition-all duration-150",
        "hover:translate-x-[-4px] hover:translate-y-[-4px]",
        "active:translate-x-0 active:translate-y-0 active:shadow-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
      style={{
        boxShadow: "6px 6px 0px 0px #000000",
      }}
    >
      {children}
    </button>
  );
}

/**
 * Gradient Glow Button
 * Vibrant gradient with animated glow effect
 */
export function GradientGlowButton({
  children,
  size = "default",
  disabled = false,
  className
}: ButtonProps) {
  const sizeClasses = {
    default: "h-11 px-8 py-2.5",
    sm: "h-9 px-6 text-sm",
    lg: "h-13 px-10 text-lg",
    icon: "h-11 w-11",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-semibold",
        "text-white overflow-hidden",
        "transition-all duration-300",
        "hover:scale-105 hover:shadow-2xl",
        "active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        sizeClasses[size],
        className
      )}
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
      }}
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
        }}
      />
    </button>
  );
}

/**
 * Soft Shadow Button
 * Minimalist design with subtle soft shadows (neumorphism-inspired)
 */
export function SoftShadowButton({
  children,
  size = "default",
  disabled = false,
  className
}: ButtonProps) {
  const sizeClasses = {
    default: "h-11 px-7 py-2.5",
    sm: "h-9 px-5 text-sm",
    lg: "h-13 px-9 text-lg",
    icon: "h-11 w-11",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl font-medium",
        "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800",
        "transition-all duration-300",
        "hover:from-gray-100 hover:to-gray-200",
        "active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
      style={{
        boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
      }}
    >
      {children}
    </button>
  );
}

/**
 * Minimal Underline Button
 * Clean, minimal design with animated underline effect
 */
export function MinimalUnderlineButton({
  children,
  size = "default",
  disabled = false,
  className
}: ButtonProps) {
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center font-medium",
        "text-gray-900 bg-transparent",
        "transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "group",
        sizeClasses[size],
        className
      )}
    >
      {children}
      <span
        className={cn(
          "absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900",
          "transition-all duration-300",
          "group-hover:w-full"
        )}
      />
    </button>
  );
}

/**
 * 3D Depth Button
 * Button with 3D depth effect using multiple layers
 */
export function DepthButton({
  children,
  size = "default",
  disabled = false,
  className
}: ButtonProps) {
  const sizeClasses = {
    default: "h-11 px-8 py-2.5",
    sm: "h-9 px-6 text-sm",
    lg: "h-13 px-10 text-lg",
    icon: "h-11 w-11",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg font-semibold",
        "bg-blue-500 text-white",
        "transition-all duration-150",
        "hover:translate-y-[-2px]",
        "active:translate-y-[2px]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
      style={{
        boxShadow: "0 6px 0 #2563eb, 0 8px 12px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </button>
  );
}
