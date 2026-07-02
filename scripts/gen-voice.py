"""
gen-voice.py — pre-generate human-sounding narration MP3s for story lessons using
Microsoft Edge neural TTS (free, en-IN-NeerjaNeural). Mirrors the narration text
built by StoryLessonViewer.narrationFor so audio matches the on-screen slide.

Output: public/audio/story/{slug}/{index}.mp3  (index 0 = cover, i = slide i)
Resumable: existing files are skipped. Usage:
  python scripts/gen-voice.py 1 2 3 4 5      # classes to generate
"""
import asyncio, json, re, sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
VOICE = "en-IN-NeerjaNeural"
RATE = "-4%"
CONCURRENCY = 6

def clean(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()

def narration_cover(lesson) -> str:
    chars = ". ".join(f"{c.get('name','')}, {c.get('role','')}" for c in lesson.get("characters", []))
    return clean(f"{lesson.get('title','')}. {lesson.get('hook','')}. Let's meet our story friends: {chars}.")

def narration_slide(slide) -> str:
    parts = [slide.get("title", "")]
    if slide.get("storyContext"):
        parts.append(slide["storyContext"])
    for p in slide.get("points", []) or []:
        parts.append((p.get("label", "") + ". " if p.get("label") else "") + p.get("text", ""))
    ex = slide.get("example")
    if ex:
        parts.append(f"Here's an example. {ex.get('problem','')}. Solution: {ex.get('solution','')}")
    if slide.get("inSimpleWords"):
        parts.append(f"In simple words. {slide['inSimpleWords']}")
    return clean(". ".join(x for x in parts if x))

async def synth(sem, text, out: Path, stats):
    if out.exists() and out.stat().st_size > 1000:
        stats["skipped"] += 1
        return
    async with sem:
        for attempt in range(3):
            try:
                tts = edge_tts.Communicate(text[:4000], VOICE, rate=RATE)
                await tts.save(str(out))
                stats["made"] += 1
                return
            except Exception:
                await asyncio.sleep(2 * (attempt + 1))
        stats["failed"] += 1

async def main():
    classes = sys.argv[1:] or ["1", "2", "3", "4", "5"]
    sem = asyncio.Semaphore(CONCURRENCY)
    stats = {"made": 0, "skipped": 0, "failed": 0}
    tasks = []
    for cls in classes:
        src = ROOT / "public" / "story-lessons" / f"class-{cls}.json"
        if not src.exists():
            print(f"!! missing {src}")
            continue
        lessons = json.loads(src.read_text(encoding="utf-8"))
        for lesson in lessons:
            slug = lesson.get("slug")
            if not slug:
                continue
            outdir = ROOT / "public" / "audio" / "story" / slug
            outdir.mkdir(parents=True, exist_ok=True)
            tasks.append(synth(sem, narration_cover(lesson), outdir / "0.mp3", stats))
            for i, slide in enumerate(lesson.get("slides", []), start=1):
                text = narration_slide(slide)
                if text:
                    tasks.append(synth(sem, text, outdir / f"{i}.mp3", stats))
    print(f"clips to process: {len(tasks)}")
    done = 0
    for batch_start in range(0, len(tasks), 200):
        await asyncio.gather(*tasks[batch_start:batch_start + 200])
        done = min(batch_start + 200, len(tasks))
        print(f"  progress {done}/{len(tasks)} (made {stats['made']}, skipped {stats['skipped']}, failed {stats['failed']})", flush=True)
    print(f"DONE made={stats['made']} skipped={stats['skipped']} failed={stats['failed']}")

asyncio.run(main())
