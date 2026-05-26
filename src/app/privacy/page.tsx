import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Database, 
  Share2, 
  ShieldCheck, 
  ExternalLink, 
  Mail 
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Craving",
  description: "Learn how we handle data and protect your privacy at Craving.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-secondary font-sans selection:bg-brand-primary/10">
      <div className="max-w-3xl mx-auto px-6 py-8 md:px-12 lg:px-16">
        
        {/* Navigation & Brand Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-tertiary pb-8 mb-12">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <div className="text-3xl font-serif tracking-tight text-brand-primary font-bold flex items-center">
              <Image
                src="/logo.png"
                alt="Craving Logo"
                width={45}
                height={45}
                priority
                className="object-contain"
              />
              <span className="-ml-2">raving</span>
            </div>
          </Link>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to App
          </Link>
        </header>

        {/* Title Header */}
        <div className="space-y-4 mb-12 text-center sm:text-left animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-brand-secondary">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium">
            Last Updated: <span className="text-brand-primary font-semibold">May 26, 2026</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          
          {/* Section 1 */}
          <section className="bg-white border border-brand-tertiary rounded-2xl p-6 md:p-8 shadow-sm space-y-4 transition-all hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-secondary flex items-center gap-3">
              <Database className="w-5 h-5 text-brand-primary flex-shrink-0" />
              <span>1. Information We Collect and Process</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Because we aim to minimize our data footprint, we strictly collect only what is essential to deliver core application functionality and ensure platform stability:
            </p>
            <ul className="list-disc pl-5 space-y-2.5 text-slate-600 text-sm md:text-base">
              <li>
                <strong className="text-brand-secondary font-semibold">Recipe Parameters:</strong> We process the text lists of ingredients, meal categories, target calorie values, and cuisine types that you intentionally input to generate custom recipes.
              </li>
              <li>
                <strong className="text-brand-secondary font-semibold">Device and Telemetry Logs:</strong> To maintain platform uptime and protect our application layer against malicious server exploitation or automated spamming, our security systems securely track temporary edge network details, such as client IP addresses and transaction handshakes.
              </li>
              <li>
                <strong className="text-brand-secondary font-semibold">Usage Performance:</strong> We utilize localized analytics tools (including PostHog) to understand user engagement levels, track successful generation run frequencies, and identify standard client script exceptions to continuously improve system features.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white border border-brand-tertiary rounded-2xl p-6 md:p-8 shadow-sm space-y-4 transition-all hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-secondary flex items-center gap-3">
              <Share2 className="w-5 h-5 text-brand-primary flex-shrink-0" />
              <span>2. How Your Data Is Shared</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We never rent, lease, sell, or monetize user data. To generate recipe results, your intentional ingredient inputs are transmitted to the following subprocessors:
            </p>
            <ul className="list-disc pl-5 space-y-2.5 text-slate-600 text-sm md:text-base">
              <li>
                <strong className="text-brand-secondary font-semibold">OpenAI Inc.:</strong> Ingredient parameters and nutrition limits are sent securely via API structures to OpenAI models (<code className="text-xs bg-brand-tertiary px-1.5 py-0.5 rounded font-mono border border-slate-200 text-slate-800">gpt-4o-mini</code>) to construct premium culinary recommendations. This data is handled according to enterprise API parameters and is not used to train future public language models.
              </li>
              <li>
                <strong className="text-brand-secondary font-semibold">Upstash Inc.:</strong> Client IP data signatures are securely cross-referenced via stateless distributed database nodes (Upstash Redis) to calculate running rate limits, ensuring platform operations stay protected against service degradation.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white border border-brand-tertiary rounded-2xl p-6 md:p-8 shadow-sm space-y-4 transition-all hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-secondary flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-primary flex-shrink-0" />
              <span>3. Data Storage, Security, and Cookies</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              <strong className="text-brand-secondary font-semibold block mb-2 text-base md:text-lg">Volatile Storage & Operations</strong> 
              We do not maintain heavy, permanent central relational databases storing individual user profiles. Application states and rate histories naturally expire via automated time-to-live configurations. We leverage production-grade platforms (Vercel edge routers, encrypted TLS network layers, and hard organizational budget ceilings) to guarantee that input routing transitions remain shielded from unauthorized exposure vectors.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white border border-brand-tertiary rounded-2xl p-6 md:p-8 shadow-sm space-y-4 transition-all hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-secondary flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-brand-primary flex-shrink-0" />
              <span>4. Third-Party Integrations</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Our website may contain operational elements connecting out to source providers (such as GitHub reference links or deployment platforms). We hold no oversight over external domains and advise inspecting individual corporate privacy statements if navigating out of our environment bounds.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white border border-brand-tertiary rounded-2xl p-6 md:p-8 shadow-sm space-y-4 transition-all hover:shadow-md">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-secondary flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-primary flex-shrink-0" />
              <span>5. Contact and Modifications</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We reserve the right to revise this document as our system configuration boundaries mature. Your continued interaction with the app interface implies complete acknowledgment of active parameters. For inquiries regarding this privacy framework, you can contact us directly via our platform support hooks.
            </p>
          </section>
        </div>

        {/* Page Footer */}
        <footer className="mt-16 pt-8 border-t border-brand-tertiary text-center text-xs font-medium text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Craving App. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://pratikgoswami.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary underline transition-colors"
            >
              Pratik Goswami
            </a>
            <a
              href="mailto:pratiksapps+craving@gmail.com"
              className="hover:text-brand-primary transition-colors underline"
            >
              Support
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}