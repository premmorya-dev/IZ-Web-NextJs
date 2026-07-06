import Image from "next/image";
import PropTypes from "prop-types";
import { Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <article className="glass-card glass-card-hover min-w-[300px] p-6">
      <div className="mb-4 flex gap-1 text-amber-300">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="min-h-[96px] text-base italic leading-7 text-slate-300 light:text-slate-600">
        "{testimonial.text}"
      </p>
      <div className="mt-6 flex items-center gap-4">
        <div className="overflow-hidden rounded-full border border-white/10">
          <Image
            alt={`${testimonial.name} avatar`}
            height={52}
            src={testimonial.avatar}
            width={52}
          />
        </div>
        <div>
          <p className="font-semibold text-white light:text-slate-950">{testimonial.name}</p>
          <p className="text-sm text-slate-400 light:text-slate-600">{testimonial.role}</p>
          <p className="text-xs text-slate-500">{testimonial.company}</p>
        </div>
      </div>
    </article>
  );
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};