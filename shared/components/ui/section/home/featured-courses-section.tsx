"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Course } from "@/data/models/course.model";

import { CourseCardItem } from "@/shared/components/ui/course/course-card-item";
import { BannerStarfieldStatic } from "@/shared/components/ui/banner/banner-starfield-static";
import { Button } from "@/shared/components/ui/button";

type FeaturedCoursesSectionProps = {
  title: string;
  description: string;
  courses: Course[];
  onAddToCart: (courseId: number) => void | Promise<unknown>;
};

export const FeaturedCoursesSection = ({
  title,
  description,
  courses,
  onAddToCart,
}: FeaturedCoursesSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onEmblaSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onEmblaSelect();
    emblaApi.on("reInit", onEmblaSelect);
    emblaApi.on("select", onEmblaSelect);
    return () => {
      emblaApi.off("reInit", onEmblaSelect);
      emblaApi.off("select", onEmblaSelect);
    };
  }, [emblaApi, onEmblaSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className="relative overflow-hidden border-t border-border text-white"
      data-animate="stagger"
    >
      <div className="absolute inset-0">
        <BannerStarfieldStatic />
        <div className="absolute inset-0 bg-linear-to-br from-(--brand-950)/70 via-(--brand-925)/45 to-(--brand-750)/25"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 reveal-item text-center lg:text-left">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-white/70">
            {description}
          </p>
        </div>
        <div className="space-y-6">
          <div className="overflow-hidden lg:hidden" ref={emblaRef}>
            <div className="flex items-stretch gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="min-w-[14.5rem] shrink-0 basis-[calc(50%-0.5rem)] sm:min-w-[16rem] sm:basis-[55%] md:min-w-[17rem] md:basis-[40%] h-full"
                >
                  <CourseCardItem
                    course={course}
                    href={`/courses/${course.slug ?? course.id}`}
                    className="h-full"
                    actionLabel={course.enrolled ? "Tiếp tục học" : "Xem Chi Tiết"}
                    cartAction={
                      course.enrolled ? null : (
                        <Button
                          variant="outline"
                          size="icon"
                          className="group h-11 w-14 rounded-full bg-background hover:bg-background hover:text-foreground hover:border-primary/60 sm:w-11"
                          onClick={() => {
                            if (typeof course.id === "number") {
                              onAddToCart(course.id);
                            }
                          }}
                          aria-label="Thêm vào giỏ"
                        >
                          <span className="sr-only">Thêm Vào Giỏ</span>
                          <Image
                            src="https://img.icons8.com/ios/50/add-shopping-cart--v1.png"
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Button>
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
            <div className="hidden gap-6 lg:grid lg:grid-cols-4 items-stretch">
              {courses.map((course) => (
                <CourseCardItem
                  key={course.id}
                  course={course}
                  href={`/courses/${course.slug ?? course.id}`}
                  className="h-full"
                  actionLabel={course.enrolled ? "Tiếp tục học" : "Xem Chi Tiết"}
                  cartAction={
                    course.enrolled ? null : (
                    <Button
                      variant="outline"
                      size="icon"
                      className="group h-11 w-14 rounded-full bg-background hover:bg-background hover:text-foreground hover:border-primary/60 sm:w-11"
                      onClick={() => {
                        if (typeof course.id === "number") {
                          onAddToCart(course.id);
                        }
                      }}
                      aria-label="Thêm vào giỏ"
                    >
                      <span className="sr-only">Thêm Vào Giỏ</span>
                      <Image
                        src="https://img.icons8.com/ios/50/add-shopping-cart--v1.png"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </Button>
                    )
                  }
                />
              ))}
          </div>
          <div className="flex items-center justify-center gap-3 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Trượt về trước"
            >
              <span className="text-lg leading-none" aria-hidden="true">
                ‹
              </span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Trượt tiếp theo"
            >
              <span className="text-lg leading-none" aria-hidden="true">
                ›
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
