import Head from "next/head";

export default function AuthorPage() {
  const skills = [
    { icon: "💼", label: "WordPress" },
    { icon: "🔍", label: "SEO" },
    { icon: "✍️", label: "Blogging" },
    { icon: "🤖", label: "AI Tools" },
    { icon: "💻", label: "Full-Stack Dev" },
  ];

  const stats = [
    { num: "50+", label: "Articles" },
    { num: "5k+", label: "Readers" },
    { num: "3 yrs", label: "Experience" },
  ];

  const posts = [
    { title: "How to Start a Blog in 2025 (Beginner's Guide)", meta: "WordPress · 8 min read" },
    { title: "Top AI Tools Every Blogger Should Know", meta: "AI Tools · 6 min read" },
    { title: "SEO Basics That Actually Drive Traffic", meta: "SEO · 10 min read" },
  ];

  return (
    <>
      <Head>
        <title>Husnain Raza — Blog Profile</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-white px-6 py-12 flex justify-center">
        <div className="w-full max-w-2xl">

          {/* Top Bar */}
          <div className="flex items-center gap-2 mb-10 text-xs font-medium tracking-widest uppercase text-gray-400">
            <span>Author</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
            <span>Blog Profile</span>
          </div>

          {/* Hero */}
          <div className="flex justify-between items-start gap-8 mb-8">
            <div className="flex-1">
              <p className="text-xs font-medium tracking-widest uppercase text-gray-500 mb-3">
                Full-Stack Developer &amp; Digital Writer
              </p>
              <h1
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl font-bold text-gray-900 leading-tight mb-4"
              >
                Husnain Raza
              </h1>
              <p className="text-sm leading-relaxed text-gray-500 font-light">
                Full-stack developer with hands-on experience in WordPress, SEO, blogging,
                and AI tools. I write practical guides built for beginners — no fluff, just
                digital growth that actually works.
              </p>
            </div>

            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-full p-0.5 shrink-0"
              style={{ background: "linear-gradient(135deg, #1D9E75, #3C3489)" }}
            >
              <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center">
                <span
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-2xl font-bold text-blue-700"
                >
                  HR
                </span>
              </div>
            </div>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {skills.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-500"
              >
                <span>{s.icon}</span> {s.label}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
                <span
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="block text-2xl font-bold text-gray-900"
                >
                  {s.num}
                </span>
                <span className="text-xs font-medium tracking-wide uppercase text-gray-400 mt-1 block">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="/blog"
              className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg bg-gray-900 text-white hover:opacity-80 transition-opacity"
            >
              📖 Read Articles
            </a>
            <a
              href="mailto:your@email.com"
              className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              ✉️ Get in Touch
            </a>
          </div>

          {/* Recent Posts */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">
              Recent Posts
            </p>
            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {posts.map((post) => (
                <div
                  key={post.title}
                  className="flex items-center justify-between py-3.5 cursor-pointer hover:pl-1 transition-all"
                >
                  <div>
                    <p className="text-sm text-gray-800 mb-0.5">{post.title}</p>
                    <p className="text-xs text-gray-400">{post.meta}</p>
                  </div>
                  <span className="text-gray-300 text-lg ml-4">→</span>
                </div>
              ))}
            </div>
            <div className="border-b border-gray-100" />
          </div>

        </div>
      </main>
    </>
  );
}
