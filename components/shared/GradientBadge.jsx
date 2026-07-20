import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export default function GradientBadge({ text, icon: Icon, className = "" }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary-light shadow-badge backdrop-blur-xl light:border-primary/20 light:bg-primary/5 light:text-primary",
        className
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{text}</span>
    </div>
  );
}

GradientBadge.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType,
  text: PropTypes.string.isRequired
<<<<<<< HEAD
};
=======
};
>>>>>>> dev
