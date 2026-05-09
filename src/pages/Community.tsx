import React from 'react';
import { Heart, MessageCircle, Plus, Send } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, increment, limit, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import SEO from '../components/SEO';
import { db } from '../lib/firebase';
import { SYLLABUS } from '../data/syllabus';
import { FIRESTORE_FEATURES_ENABLED } from '../lib/cloudFeatures';

interface CommunityPageProps {
  currentUser: FirebaseUser | null;
}

type DiscussionPost = {
  id: string;
  chapterId: string;
  chapterTitle: string;
  author: string;
  body: string;
  likes: number;
  replies?: { author: string; body: string; createdAt: string }[];
};

export default function CommunityPage({ currentUser }: CommunityPageProps) {
  const [chapterId, setChapterId] = React.useState(SYLLABUS[0]?.id || '');
  const [posts, setPosts] = React.useState<DiscussionPost[]>([]);
  const [body, setBody] = React.useState('');
  const [replyDrafts, setReplyDrafts] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  const chapter = SYLLABUS.find((item) => item.id === chapterId) || SYLLABUS[0];

  const loadPosts = React.useCallback(async () => {
    if (!chapterId) return;
    if (!FIRESTORE_FEATURES_ENABLED) {
      setPosts([]);
      return;
    }
    setLoading(true);
    try {
      const snap = await getDocs(
        query(
          collection(db, 'chapterDiscussions'),
          where('chapterId', '==', chapterId),
          orderBy('createdAt', 'desc'),
          limit(20),
        ),
      );
      setPosts(snap.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<DiscussionPost, 'id'>) })));
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  React.useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  const createPost = async () => {
    if (!FIRESTORE_FEATURES_ENABLED || !currentUser || !body.trim() || !chapter) return;
    await addDoc(collection(db, 'chapterDiscussions'), {
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      author: currentUser.displayName || currentUser.email || 'Syllab Learner',
      userId: currentUser.uid,
      body: body.trim().slice(0, 1200),
      likes: 0,
      replies: [],
      createdAt: serverTimestamp(),
    });
    setBody('');
    await loadPosts();
  };

  const likePost = async (postId: string) => {
    if (!FIRESTORE_FEATURES_ENABLED) return;
    await updateDoc(doc(db, 'chapterDiscussions', postId), { likes: increment(1) });
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post));
  };

  const addReply = async (post: DiscussionPost) => {
    if (!FIRESTORE_FEATURES_ENABLED || !currentUser) return;
    const draft = replyDrafts[post.id]?.trim();
    if (!draft) return;
    const nextReplies = [
      ...(post.replies || []),
      {
        author: currentUser.displayName || currentUser.email || 'Syllab Learner',
        body: draft.slice(0, 600),
        createdAt: new Date().toISOString(),
      },
    ];
    await updateDoc(doc(db, 'chapterDiscussions', post.id), { replies: nextReplies });
    setReplyDrafts((current) => ({ ...current, [post.id]: '' }));
    setPosts((current) => current.map((item) => item.id === post.id ? { ...item, replies: nextReplies } : item));
  };

  return (
    <main className="space-y-8 pb-12">
      <SEO
        title="Student Community and Chapter Discussions"
        description="Ask doubts, answer chapter questions, like helpful responses, and discuss NCERT, JEE, NEET and EAMCET topics with students."
        keywords="student discussion forum, chapter doubts, JEE doubts, NEET doubts, NCERT community"
        url="https://syllab.in/community"
      />

      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary">
              <MessageCircle size={14} />
              Peer learning
            </div>
            <h1 className="text-3xl font-black text-slate-900 sm:text-5xl">Community Discussions</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Ask doubts under a chapter, reply to classmates, and build useful student-generated explanations.
            </p>
          </div>
          <select
            value={chapterId}
            onChange={(event) => setChapterId(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-primary"
          >
            {SYLLABUS.slice(0, 120).map((item) => (
              <option key={item.id} value={item.id}>
                Class {item.classLevel} · {item.subject} · {item.title}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl">
          <Plus className="mb-4 text-primary" size={28} />
          <h2 className="text-xl font-black">Start a Doubt</h2>
          <p className="mt-2 text-sm font-medium text-slate-300">{chapter?.title}</p>
          {!FIRESTORE_FEATURES_ENABLED ? (
            <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200">
              Community posting is disabled until Firestore is configured.
            </div>
          ) : !currentUser ? (
            <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200">
              Login to post questions or replies. Everyone can read discussions.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={6}
                placeholder="Ask a doubt or explain a concept..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-medium text-white outline-none placeholder:text-slate-400 focus:border-primary"
              />
              <button onClick={() => void createPost()} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                <Send size={16} /> Post
              </button>
            </div>
          )}
        </aside>

        <div className="space-y-4">
          {loading ? <div className="rounded-2xl bg-white p-6 text-slate-400">Loading discussions...</div> : null}
          {!loading && posts.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-8 text-center text-sm font-bold text-slate-500">
              No discussion yet for this chapter. Start the first doubt.
            </div>
          ) : null}
          {posts.map((post) => (
            <article key={post.id} className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/40">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-black text-slate-900">{post.author}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">{post.chapterTitle}</p>
                </div>
                <button onClick={() => void likePost(post.id)} className="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-xs font-black text-rose-600">
                  <Heart size={14} /> {post.likes || 0}
                </button>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-600">{post.body}</p>
              <div className="mt-5 space-y-3">
                {(post.replies || []).map((reply, index) => (
                  <div key={`${post.id}-${index}`} className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs font-black text-slate-900">{reply.author}</div>
                    <p className="mt-1 text-sm font-medium text-slate-600">{reply.body}</p>
                  </div>
                ))}
                {currentUser ? (
                  <div className="flex gap-2">
                    <input
                      value={replyDrafts[post.id] || ''}
                      onChange={(event) => setReplyDrafts((current) => ({ ...current, [post.id]: event.target.value }))}
                      placeholder="Reply with a hint or explanation..."
                      className="min-w-0 flex-1 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button onClick={() => void addReply(post)} className="rounded-2xl bg-slate-900 px-4 py-3 text-xs font-black uppercase tracking-widest text-white">
                      Reply
                    </button>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
