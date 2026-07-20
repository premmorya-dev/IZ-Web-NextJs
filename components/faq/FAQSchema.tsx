// components/faq/FAQSchema.tsx
import { faqData, toPlainText } from "@/lib/faq-data";

/**
 * Renders a valid FAQPage JSON-LD schema for all FAQ items.
 * Place once, server-side, inside app/faq/page.tsx.
 * Keeping this driven by lib/faq-data.ts guarantees the visible
 * accordion and the structured data never fall out of sync.
 */
export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(item.answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
