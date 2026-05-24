import SEO from '../components/SEO';

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-16">
      <SEO
        title="Terms of Service"
        description="Read the terms that apply when using Syllab learning tools, practice modules, and AI-powered features."
        keywords="Syllab terms of service, learning platform terms"
        url="https://syllab.in/terms"
      />

      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Terms of Service</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-500">
          These terms describe the basic rules for using Syllab learning tools, practice content, account features, and AI-powered study support.
        </p>
      </section>

      <section className="grid gap-4">
        {[
          {
            title: 'Use of Syllab',
            body: 'Use the platform for lawful learning, practice, revision, and academic support. Do not misuse accounts, content, forms, or automated systems.',
          },
          {
            title: 'Learning Content',
            body: 'Syllab is designed to support study and exam preparation. AI-generated explanations may be imperfect, so students should verify important academic answers.',
          },
          {
            title: 'Accounts',
            body: 'You are responsible for keeping your login access secure and for activity under your account.',
          },
          {
            title: 'Service Availability',
            body: 'We may update, improve, pause, or remove features to keep the platform reliable and useful.',
          },
          {
            title: 'Contact',
            body: 'For terms or support questions, email support@syllab.in.',
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
