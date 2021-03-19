import { useRouter } from "next/router";
import React from "react";

import { clamp, getPath } from "@/lib/Utils";

const useCurrentSlide = (totalSlides: number) => {
  const router = useRouter();
  const currentSlide = parseInt((router.query.slide as string) ?? "1");

  const setCurrentSlide = React.useCallback(
    (slide: number) => {
      const newPath = getPath(router.asPath, clamp(1, slide, totalSlides));
      const nextPath = getPath(router.asPath, clamp(1, slide + 1, totalSlides));
      const prevPath = getPath(router.asPath, clamp(1, slide - 1, totalSlides));
      router.push(newPath);
      router.prefetch(nextPath);
      router.prefetch(prevPath);
    },
    [router, totalSlides]
  );

  return [currentSlide, setCurrentSlide] as const;
};

export default useCurrentSlide;
