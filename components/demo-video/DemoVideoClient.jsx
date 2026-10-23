import { ArrowRight } from "lucide-react";

export default function InvoiceDemoSection() {
    return (
        <section
            className="bg-[#0A0E1A] px-4 py-20 sm:px-6"
            aria-labelledby="invoice-demo-heading"
        >
            <div className="mx-auto max-w-6xl">
                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="font-[IBM_Plex_Mono] text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                        See Invoicezy in action
                    </p>

                    <h2
                        id="invoice-demo-heading"
                        className="mt-3 font-[Space_Grotesk] text-3xl font-semibold text-white sm:text-4xl"
                    >
                        Watch How to Create a GST Invoice
                    </h2>

                    <p className="mt-4 leading-7 text-white/60">
                        See how easy it is to create a professional GST invoice,
                        calculate taxes automatically, and download your PDF
                        — all in just a few clicks.
                    </p>
                </div>

                {/* Video Player */}
                <div className="mx-auto mt-10 max-w-4xl">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-cyan-950/20">
                        <div className="relative mt-10 mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                            <div className="aspect-video w-full">
                                <iframe
                                    className="h-full w-full"
                                    src="https://www.youtube.com/embed/k8mD73jAZXo"
                                    title="Invoicezy Demo Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <div>
                                <h3 className="font-[Space_Grotesk] text-lg font-semibold text-white">
                                    Create your first invoice with Invoicezy
                                </h3>
                                <p className="mt-1 text-sm text-white/50">
                                    Watch the demo, then try it yourself for free.
                                </p>
                            </div>

                            <a
                                href="/register"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-[#0A0E1A] transition hover:opacity-90"
                            >
                                Start for Free
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-xs text-white/40">                       
                        No complicated setup. Create and download invoices online.
                    </p>
                </div>
            </div>
        </section>
    );
}