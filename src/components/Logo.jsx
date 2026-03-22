import Image from "next/legacy/image";
import { useEffect, useState } from "react";

const APP_NAME = process.env.NEXT_PUBLIC_APP || "HR Portal";

export const LogoFull = ({ dark = false, className = "", showText = true, themeAware = false }) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (themeAware && typeof document !== "undefined") {
      setIsDark(document.body.classList.contains("dark"));
    }
  }, [themeAware]);
  const useDark = themeAware ? isDark : dark;
  const iconSrc = "/assets/images/stratis_logo.png";

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      title={APP_NAME}
    >
      <Image
        src={iconSrc}
        width={53}
        height={53}
        quality={100}
        priority={true}
        placeholder="blur"
        blurDataURL={iconSrc}
        alt={APP_NAME}
      />
      {showText && (
        <span
          className={`font-bold text-xl font-plusJakartaSans ${
            useDark ? "text-themeGrayscale300" : "text-themeGrayscale900"
          }`}
        >
          {APP_NAME}
        </span>
      )}
    </div>
  );
};

export const LogoMini = ({ className = "" }) => (
  <Image
    src="/assets/images/stratis_logo.png"
    width={100}
    height={100}
    quality={100}
    priority={true}
    placeholder="blur"
    blurDataURL="/assets/images/stratis_logo.png"
    alt={APP_NAME}
    className={className}
  />
);

export const LogoIcon = ({ dark = false, size = 32, className = "" }) => {
  const iconSrc = "/assets/images/stratis_logo.png";

  return (
    <Image
      src={iconSrc}
      width={size}
      height={size}
      quality={100}
      priority={true}
      placeholder="blur"
      blurDataURL={iconSrc}
      alt={APP_NAME}
      className={className}
    />
  );
};
