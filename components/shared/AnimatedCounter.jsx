"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

const easeOutExpo = (value) => (value === 1 ? 1 : 1 - 2 ** (-10 * value));

export default function AnimatedCounter({ end, prefix = "", suffix = "", duration = 2000 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const decimals = useMemo(() => {
    const parts = `${end}`.split(".");
    return parts[1]?.length || 0;
  }, [end]);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasStarted) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    let frame = 0;
    let start;

    const step = (timestamp) => {
      if (!start) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [duration, end, hasStarted]);

  const formatted = useMemo(() => {
    const number = Number(value.toFixed(decimals));
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    }).format(number);
  }, [decimals, value]);

  return (
    <span ref={ref} className="inline-flex items-end gap-1">
      <span>{prefix}</span>
      <span>{formatted}</span>
      <span>{suffix}</span>
    </span>
  );
}

AnimatedCounter.propTypes = {
  duration: PropTypes.number,
  end: PropTypes.number.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string
};
