import SEO from '../components/SEO';

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-16">
      <SEO
        title="Privacy Policy"
        description="Read how Syllab handles student account data, contact messages, analytics, and learning progress."
        keywords="Syllab privacy policy, student data privacy"
        url="https://syllab.in/privacy"
      />

      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Privacy Policy</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-500">
          Syllab collects only the information needed to run learning features, support accounts, respond to contact requests, and improve the platform.
        </p>
      </section>

      <section className="grid gap-4">
        {[
          {
            title: 'Information We Collect',
            body: 'Account details such as name, email, authentication provider, learning progress, scores, streaks, contact form messages, and basic device or usage analytics.',
          },
          {
            title: 'How We Use Information',
            body: 'We use data to save progress, personalize practice, provide support, detect abuse, improve reliability, and maintain student learning records.',
          },
          {
            title: 'Data Sharing',
            body: 'We do not sell student data. We may use trusted providers for hosting, authentication, analytics, database storage, email delivery, and AI-powered learning features.',
          },
          {
            title: 'Your Choices',
            body: 'You can contact support@syllab.in to request help with account access, data correction, or deletion requests where applicable.',
          },
          {
            title: 'Contact',
            body: 'For privacy questions, email support@syllab.in.',
          },
        ].map((section) => (
          <article key={section.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">{section.title}</h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-500">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
