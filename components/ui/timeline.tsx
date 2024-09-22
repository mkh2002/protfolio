"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();

      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full font-sans">
      <div className="mx-auto w-full px-4 py-20">
        <h2 className="mb-4 text-lg text-black dark:text-white md:text-4xl">
          My learning experience
        </h2>
        <p className="max-w-sm text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
          I have been in contact with the web for more than four years.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-[60vw]">
              <div className="absolute left-3 flex size-10 items-center justify-center rounded-full bg-muted md:left-3">
                <div className="size-4 rounded-full border bg-muted-foreground/30 p-2" />
              </div>
              <h3 className="hidden text-xl font-bold text-muted-foreground md:block md:pl-20 md:text-5xl ">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-muted-foreground md:hidden">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-muted to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]  md:left-8 "
          style={{
            height: height + "px",
          }}
        >
          <motion.div
            className="absolute inset-x-0 top-0  w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-0% via-primary via-10% to-transparent"
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
          />
        </div>
      </div>
    </div>
  );
};
