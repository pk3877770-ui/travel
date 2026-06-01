import { Metadata } from 'next';
import { getSEOMetadata, mapSEOToMetadata } from '@/lib/seo';
import PageWithBreadcrumb from '@/components/PageWithBreadcrumb';

export const dynamic = 'force-dynamic';

const faqItems = [
  {
    question: 'How do I book a luxury flight with Kramana?',
    answer:
      'Use our flights search page to compare premium routes, then submit your travel requirements. Our concierge team will follow up with a custom itinerary and booking confirmation.',
  },
  {
    question: 'Can Kramana arrange private airport transfers and lounge access?',
    answer:
      'Yes. We coordinate private transfers, VIP meet-and-greets, and airport lounge access as part of our bespoke travel services.',
  },
  {
    question: 'What do I do if my itinerary changes or I need to cancel?',
    answer:
      'Contact our concierge team through the contact page or help center. We handle changes, cancellations, and refunds with priority service.',
  },
  {
    question: 'Does Kramana offer custom holiday packages?',
    answer:
      'Absolutely. Our holiday packages are tailored to your preferences, including luxury resorts, private tours, and exclusive experiences.',
  },
  {
    question: 'How can I check the status of my booking or ticket?',
    answer:
      'Use the ticket inquiry page for real-time booking status, or contact our team directly for personalised assistance.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/faq');
  return mapSEOToMetadata(seo);
}

export default function FAQPage() {
  return (
    <PageWithBreadcrumb routePath="/faq">
      <main className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="container max-w-6xl mx-auto px-6 py-20">
        <div className="space-y-6 mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-accent font-black">Frequently Asked Questions</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Kramana FAQ</h1>
          <p className="max-w-3xl mx-auto text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            Answers to the most common questions about booking luxury travel, private concierge services, and your Kramana experience.
          </p>
        </div>

        <div className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-8 shadow-lg shadow-slate-900/5">
              <h2 className="text-xl md:text-2xl font-bold mb-3">{item.question}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
      </main>
    </PageWithBreadcrumb>
  );
}
