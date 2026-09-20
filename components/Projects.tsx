"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolio, type Project } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const ALL = "ALL";

const CATEGORY_NUMBER: Record<string, string> = {
  "Graphic Designing": "01",
  Animation: "02",
  "Video Editing": "03",
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.1 }}
      data-cursor="view"
      data-cursor-label="VIEW"
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-cream/10 bg-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5">
            <span className="border border-cream/30 bg-ink/60 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.25em] text-cream backdrop-blur-sm">
              {project.category}
            </span>
            <span className="font-display text-xs uppercase tracking-[0.25em] text-cream">
              View ↗
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-cream transition-colors duration-300 group-hover:text-terra md:text-2xl">
          {project.title}
        </h3>
        <span className="font-display text-xs tracking-[0.25em] text-muted">
          {project.year}
        </span>
      </div>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        {project.description}
      </p>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string>(ALL);

  const projects =
    active === ALL
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative bg-navy section-pad"
    >
      <div className="container-x relative">
        <SectionHeading
          kicker={portfolio.showcase.kicker}
          title={
            <>
              MY <span className="text-stroke">SHOWCASE</span>
            </>
          }
        />

        {/* category tabs */}
        <div
          role="tablist"
          aria-label="Project categories"
          className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 md:mt-16"
        >
          <button
            type="button"
            role="tab"
            aria-selected={active === ALL}
            onClick={() => setActive(ALL)}
            className={cn(
              "group font-display text-sm uppercase tracking-[0.25em] transition-colors duration-300",
              active === ALL ? "text-cream" : "text-muted hover:text-cream"
            )}
          >
            <span className="mr-2 text-terra">✦</span>
            {ALL}
            <span
              className={cn(
                "block h-px w-full bg-terra transition-transform duration-300",
                active === ALL ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}
            />
          </button>

          {portfolio.showcase.categories.map((category) => {
            const isActive = active === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(category)}
                className={cn(
                  "group font-display text-sm uppercase tracking-[0.25em] transition-colors duration-300",
                  isActive ? "text-cream" : "text-muted hover:text-cream"
                )}
              >
                <span className="mr-2 font-display text-xs text-terra-light">
                  {CATEGORY_NUMBER[category]}
                </span>
                {category}
                <span
                  className={cn(
                    "block h-px w-full bg-terra transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* project grid — re-mounts on filter change to replay the reveal */}
        <div
          key={active}
          className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}