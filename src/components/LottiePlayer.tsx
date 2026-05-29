/**
 * Lottie Animation Player
 * Wrapper for lottie-react animations
 * Note: lottie-react needs to be installed with: npm install lottie-react
 */
import { ComponentType, Suspense } from 'react';

// Lazy load lottie-react to reduce bundle impact
const LottieComponent = (() => {
  try {
    return require('lottie-react').default as ComponentType<any>;
  } catch {
    return null;
  }
})();

interface LottiePlayerProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

function LottiePlayerFallback({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-100 rounded-lg ${className}`}
      style={{ aspectRatio: '1 / 1' }}
    >
      <div className="text-slate-400 text-sm font-bold">Loading animation...</div>
    </div>
  );
}

export default function LottiePlayer({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
}: LottiePlayerProps) {
  if (!LottieComponent) {
    return <LottiePlayerFallback className={className} />;
  }

  return (
    <Suspense fallback={<LottiePlayerFallback className={className} />}>
      <LottieComponent
        animationData={animationData}
        loop={loop}
        autoPlay={autoplay}
        speed={speed}
        className={className}
      />
    </Suspense>
  );
}
