import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import HubNav, { HubNavItem } from '../components/HubNav';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { QUIZ_PACKS, getPack } from '../data/quizPacks';
import {
  createGame, subscribeGame, subscribePlayers, joinGame, startGame,
  revealAnswer, nextQuestion, getPlayerId, computePoints, submitAnswer,
  type GameDoc, type PlayerDoc,
} from '../lib/liveQuiz';

const SITE = 'https://syllab.in';
const OPTION_STYLES = [
  { bg: 'bg-rose-500 hover:bg-rose-600', shape: '▲' },
  { bg: 'bg-sky-500 hover:bg-sky-600', shape: '◆' },
  { bg: 'bg-amber-500 hover:bg-amber-600', shape: '●' },
  { bg: 'bg-emerald-500 hover:bg-emerald-600', shape: '■' },
];

type Screen = 'home' | 'hostpick' | 'host' | 'join' | 'play';

export default function LiveQuizPage() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [screen, setScreen] = useState<Screen>('home');
  const [pin, setPin] = useState('');
  const [game, setGame] = useState<GameDoc | null>(null);
  const [players, setPlayers] = useState<(PlayerDoc & { id: string })[]>([]);
  const [name, setName] = useState('');
  const [joinPin, setJoinPin] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // player answer state
  const [selected, setSelected] = useState<number | null>(null);
  const appearedAt = useRef<number>(0);
  const answeredIndex = useRef<number>(-1);

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);

  // Subscribe to the game + players whenever we have a pin and are in a game screen.
  useEffect(() => {
    if (!pin || (screen !== 'host' && screen !== 'play')) return;
    const unsubG = subscribeGame(pin, setGame);
    const unsubP = subscribePlayers(pin, setPlayers);
    return () => { unsubG(); unsubP(); };
  }, [pin, screen]);

  // Reset answer state when the question changes (player view).
  useEffect(() => {
    if (screen !== 'play' || !game) return;
    if (game.status === 'live' && answeredIndex.current !== game.currentIndex) {
      setSelected(null);
      appearedAt.current = Date.now();
    }
  }, [game?.currentIndex, game?.status, screen]); // eslint-disable-line react-hooks/exhaustive-deps

  function resetToHome() {
    setScreen('home'); setPin(''); setGame(null); setPlayers([]);
    setSelected(null); answeredIndex.current = -1; setError('');
  }

  // ---------- HOST: create ----------
  async function host(packId: string) {
    if (!user) { setError('Please log in first to host a game.'); return; }
    setBusy(true); setError('');
    try {
      const pack = getPack(packId)!;
      const newPin = await createGame(
        { uid: user.uid, name: user.displayName || user.email?.split('@')[0] || 'Host' },
        pack,
      );
      setPin(newPin); setScreen('host');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start the game.');
    } finally { setBusy(false); }
  }

  // ---------- PLAYER: join ----------
  async function join() {
    const p = joinPin.trim();
    if (!/^\d{6}$/.test(p)) { setError('Enter the 6-digit game PIN.'); return; }
    if (!name.trim()) { setError('Enter a nickname.'); return; }
    setBusy(true); setError('');
    try {
      await joinGame(p, getPlayerId(), name.trim());
      setPin(p); setScreen('play');
    } catch {
      setError('Could not join — check the PIN and try again.');
    } finally { setBusy(false); }
  }

  async function pickAnswer(i: number) {
    if (!game || game.status !== 'live' || selected !== null) return;
    if (answeredIndex.current === game.currentIndex) return;
    const qn = game.questions[game.currentIndex];
    const correct = i === qn.answer;
    const elapsed = (Date.now() - appearedAt.current) / 1000;
    const pts = computePoints(correct, elapsed);
    setSelected(i);
    answeredIndex.current = game.currentIndex;
    try { await submitAnswer(pin, getPlayerId(), game.currentIndex, correct, pts); } catch { /* ignore */ }
  }

  // ============================ RENDER ============================
  const quizHubItems: HubNavItem[] = [
    { label: 'Daily Challenge', emoji: '📅', path: '/daily-challenges', tab: 'daily' },
    { label: 'GK Quiz', emoji: '🧠', path: '/gk-quiz', tab: 'general_knowledge' },
    { label: 'Quiz Duel', emoji: '⚔️', path: '/quiz-duel', tab: 'quiz_duel' },
    { label: 'Live Quiz', emoji: '🎮', path: '/live-quiz', tab: 'live_quiz' },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <SEO
        title="Live Quiz — Free Multiplayer Classroom Quiz Game (Kahoot-style) | Syllab.in"
        description="Host a free live multiplayer quiz for your class — students join with a PIN and compete on a real-time leaderboard. GK, Science, Maths, Reasoning, Computers & English quiz games for Indian students."
        keywords="live quiz game free, multiplayer classroom quiz, kahoot alternative India, online quiz competition for students, live quiz with PIN, class quiz game, school quiz buzzer"
        url={`${SITE}/live-quiz`}
        jsonLd={{
          '@context': 'https://schema.org', '@type': 'WebApplication',
          name: 'Syllab Live Quiz', applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web', url: `${SITE}/live-quiz`,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        }}
      />

      <HubNav items={quizHubItems} active="live_quiz" label="Quiz Hub" />

      {screen === 'home' && (
        <>
          <PageHero
            emoji="🎮"
            title="Live Multiplayer Quiz"
            subtitle="Kahoot-style! Host a game, students join with a PIN, and race up a real-time leaderboard."
            gradient="from-violet-500 via-purple-600 to-fuchsia-700"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => (user ? setScreen('hostpick') : setError('Please log in first to host a game (free).'))}
              className="rounded-3xl bg-white p-6 text-left shadow-xl shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <div className="text-4xl">🧑‍🏫</div>
              <h2 className="mt-3 text-xl font-black text-slate-900">Host a Game</h2>
              <p className="mt-1 text-sm text-slate-600">Pick a quiz pack and get a PIN to share with your class or friends.</p>
            </button>
            <button
              onClick={() => setScreen('join')}
              className="rounded-3xl bg-white p-6 text-left shadow-xl shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <div className="text-4xl">🙋</div>
              <h2 className="mt-3 text-xl font-black text-slate-900">Join a Game</h2>
              <p className="mt-1 text-sm text-slate-600">Got a PIN? Enter it with a nickname and jump in — no account needed.</p>
            </button>
          </div>
          {error && <p className="rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">{error}</p>}
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-black text-slate-900">How it works</h3>
            <ol className="mt-3 space-y-2 text-sm text-slate-700">
              <li><b>1.</b> A teacher/host picks a quiz pack and gets a 6-digit PIN.</li>
              <li><b>2.</b> Students open syllab.in/live-quiz on their phones, tap <b>Join</b>, enter the PIN + a nickname.</li>
              <li><b>3.</b> Everyone answers the same question at once — faster correct answers score more points.</li>
              <li><b>4.</b> A live leaderboard shows the winners. Free, unlimited, no app to install. 🎉</li>
            </ol>
          </div>
        </>
      )}

      {screen === 'hostpick' && (
        <>
          <PageHero emoji="🧑‍🏫" title="Choose a Quiz Pack" subtitle="Pick a topic — you'll get a PIN to share." gradient="from-violet-500 via-purple-600 to-fuchsia-700" />
          {error && <p className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            {QUIZ_PACKS.map((p) => (
              <button key={p.id} disabled={busy} onClick={() => host(p.id)}
                className="rounded-2xl bg-white p-5 text-left shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">{p.classBand}</span>
                </div>
                <h3 className="mt-2 font-black text-slate-900">{p.title}</h3>
                <p className="text-sm text-slate-600">{p.blurb}</p>
                <p className="mt-2 text-xs font-semibold text-slate-400">{p.questions.length} questions</p>
              </button>
            ))}
          </div>
          <button onClick={resetToHome} className="text-sm font-semibold text-slate-500 hover:text-slate-700">← Back</button>
        </>
      )}

      {screen === 'host' && <HostView game={game} players={players} pin={pin} onLeave={resetToHome} />}

      {screen === 'join' && (
        <>
          <PageHero emoji="🙋" title="Join a Live Quiz" subtitle="Enter the PIN your host shared." gradient="from-violet-500 via-purple-600 to-fuchsia-700" />
          <div className="mx-auto max-w-sm space-y-4 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50">
            <input inputMode="numeric" maxLength={6} value={joinPin}
              onChange={(e) => setJoinPin(e.target.value.replace(/\D/g, ''))}
              placeholder="Game PIN"
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-center text-2xl font-black tracking-widest focus:border-violet-500 focus:outline-none" />
            <input maxLength={24} value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Your nickname"
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-center font-semibold focus:border-violet-500 focus:outline-none" />
            {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}
            <button disabled={busy} onClick={join}
              className="w-full rounded-xl bg-violet-600 py-3 font-black text-white transition hover:bg-violet-700 disabled:opacity-50">
              {busy ? 'Joining…' : 'Join Game'}
            </button>
            <button onClick={resetToHome} className="w-full text-sm font-semibold text-slate-500 hover:text-slate-700">← Back</button>
          </div>
        </>
      )}

      {screen === 'play' && (
        <PlayerView game={game} players={players} selected={selected} onAnswer={pickAnswer} onLeave={resetToHome} />
      )}
    </div>
  );
}

// ---------------------------- HOST VIEW ----------------------------
function HostView({ game, players, pin, onLeave }: {
  game: GameDoc | null; players: (PlayerDoc & { id: string })[]; pin: string; onLeave: () => void;
}) {
  if (!game) return <p className="text-center text-slate-500">Loading game…</p>;
  const qn = game.questions[game.currentIndex];
  const answeredCount = players.filter((p) => p.answeredForIndex === game.currentIndex).length;

  return (
    <div className="space-y-5">
      {game.status === 'lobby' && (
        <>
          <PageHero emoji="🎮" title={game.packTitle}
            subtitle="Share this PIN — players join at syllab.in/live-quiz" gradient="from-violet-500 via-purple-600 to-fuchsia-700"
            aside={<div className="rounded-2xl bg-white/20 px-5 py-3 text-center"><div className="text-xs font-bold uppercase tracking-wide">Game PIN</div><div className="text-4xl font-black tracking-widest">{pin}</div></div>} />
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Players joined: {players.length}</h3>
              <button disabled={players.length === 0} onClick={() => startGame(pin)}
                className="rounded-xl bg-emerald-600 px-6 py-2.5 font-black text-white transition hover:bg-emerald-700 disabled:opacity-40">
                Start Game ▶
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {players.map((p) => (
                <span key={p.id} className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">{p.name}</span>
              ))}
              {players.length === 0 && <p className="text-sm text-slate-500">Waiting for players to join…</p>}
            </div>
          </div>
        </>
      )}

      {game.status === 'live' && qn && (
        <>
          <div className="flex items-center justify-between text-sm font-bold text-slate-500">
            <span>Question {game.currentIndex + 1} / {game.questionCount}</span>
            <span>{answeredCount} / {players.length} answered</span>
          </div>
          <div className="rounded-3xl bg-white p-6 text-center shadow-xl shadow-slate-200/50">
            <h2 className="text-2xl font-black text-slate-900">{qn.q}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {qn.options.map((opt, i) => {
              const isCorrect = game.revealed && i === qn.answer;
              return (
                <div key={i} className={`flex items-center gap-3 rounded-2xl p-4 text-white ${OPTION_STYLES[i].bg} ${game.revealed && i !== qn.answer ? 'opacity-40' : ''}`}>
                  <span className="text-2xl">{OPTION_STYLES[i].shape}</span>
                  <span className="font-bold">{opt}</span>
                  {isCorrect && <span className="ml-auto text-xl">✓</span>}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-3">
            {!game.revealed
              ? <button onClick={() => revealAnswer(pin)} className="rounded-xl bg-slate-800 px-6 py-2.5 font-black text-white hover:bg-slate-900">Reveal Answer</button>
              : <button onClick={() => nextQuestion(pin, game.currentIndex, game.questionCount)} className="rounded-xl bg-violet-600 px-8 py-2.5 font-black text-white hover:bg-violet-700">
                  {game.currentIndex + 1 >= game.questionCount ? 'Show Results 🏆' : 'Next Question →'}
                </button>}
          </div>
          <Leaderboard players={players} compact />
        </>
      )}

      {game.status === 'ended' && <FinalResults players={players} onLeave={onLeave} />}
    </div>
  );
}

// --------------------------- PLAYER VIEW ---------------------------
function PlayerView({ game, players, selected, onAnswer, onLeave }: {
  game: GameDoc | null; players: (PlayerDoc & { id: string })[];
  selected: number | null; onAnswer: (i: number) => void; onLeave: () => void;
}) {
  const me = players.find((p) => p.id === getPlayerId());
  if (!game) return <p className="text-center text-slate-500">Connecting…</p>;

  if (game.status === 'lobby') {
    return (
      <div className="space-y-4 text-center">
        <PageHero emoji="✅" title="You're in!" subtitle="Waiting for the host to start the game…" gradient="from-violet-500 via-purple-600 to-fuchsia-700" />
        <p className="text-slate-600">Hang tight — the quiz will start any moment. 🎉</p>
        <button onClick={onLeave} className="text-sm font-semibold text-slate-500 hover:text-slate-700">Leave</button>
      </div>
    );
  }

  if (game.status === 'live') {
    const qn = game.questions[game.currentIndex];
    const answered = selected !== null || me?.answeredForIndex === game.currentIndex;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm font-bold text-slate-500">
          <span>Q{game.currentIndex + 1} / {game.questionCount}</span>
          <span>⭐ {me?.score ?? 0} pts</span>
        </div>
        <div className="rounded-3xl bg-white p-5 text-center shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-black text-slate-900">{qn.q}</h2>
        </div>
        {!answered ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {qn.options.map((opt, i) => (
              <button key={i} onClick={() => onAnswer(i)}
                className={`flex items-center gap-3 rounded-2xl p-5 text-left text-white shadow-lg transition hover:-translate-y-0.5 ${OPTION_STYLES[i].bg}`}>
                <span className="text-2xl">{OPTION_STYLES[i].shape}</span>
                <span className="font-bold">{opt}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 text-center shadow-xl shadow-slate-200/50">
            {game.revealed ? (
              (selected === game.questions[game.currentIndex].answer)
                ? <p className="text-2xl font-black text-emerald-600">✓ Correct!</p>
                : <p className="text-2xl font-black text-rose-500">✗ Not this time</p>
            ) : <p className="text-lg font-black text-violet-600">Answer locked in! ⏳</p>}
            <p className="mt-2 text-slate-500">Your score: <b>{me?.score ?? 0}</b> · Waiting for the next question…</p>
          </div>
        )}
        <Leaderboard players={players} compact highlightId={getPlayerId()} />
      </div>
    );
  }

  return <FinalResults players={players} onLeave={onLeave} highlightId={getPlayerId()} />;
}

// --------------------------- SHARED ---------------------------
function Leaderboard({ players, compact, highlightId }: {
  players: (PlayerDoc & { id: string })[]; compact?: boolean; highlightId?: string;
}) {
  const top = players.slice(0, compact ? 5 : 20);
  if (top.length === 0) return null;
  return (
    <div className="rounded-3xl bg-white p-5 shadow-xl shadow-slate-200/50">
      <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-400">Leaderboard</h3>
      <ol className="space-y-1.5">
        {top.map((p, i) => (
          <li key={p.id} className={`flex items-center justify-between rounded-lg px-3 py-1.5 ${p.id === highlightId ? 'bg-violet-50' : ''}`}>
            <span className="font-bold text-slate-700">{['🥇', '🥈', '🥉'][i] || `${i + 1}.`} {p.name}</span>
            <span className="font-black text-violet-600">{p.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FinalResults({ players, onLeave, highlightId }: {
  players: (PlayerDoc & { id: string })[]; onLeave: () => void; highlightId?: string;
}) {
  const winner = players[0];
  return (
    <div className="space-y-5 text-center">
      <PageHero emoji="🏆" title="Final Results" subtitle={winner ? `${winner.name} wins with ${winner.score} points!` : 'Game over'} gradient="from-amber-400 via-orange-500 to-rose-500" />
      <Leaderboard players={players} highlightId={highlightId} />
      <button onClick={onLeave} className="rounded-xl bg-violet-600 px-8 py-2.5 font-black text-white hover:bg-violet-700">Play Again</button>
    </div>
  );
}
