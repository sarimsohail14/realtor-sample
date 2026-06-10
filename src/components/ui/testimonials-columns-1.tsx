/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 md:p-10 rounded-3xl border border-black/5 bg-white shadow-lg shadow-black/5 max-w-xs w-full text-left transition duration-300 hover:border-black/15" 
                  key={`${index}-${i}`}
                >
                  <div className="text-[14px] leading-relaxed text-[#1D1D1F] italic">"{text}"</div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-neutral-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <div className="text-xs font-bold tracking-tight text-[#1D1D1F] leading-5">{name}</div>
                      <div className="text-[10px] font-medium leading-5 text-[#6E6E73] tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
