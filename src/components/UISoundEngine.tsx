import { useEffect, useRef } from 'react';

type SoundKind = 'click' | 'open' | 'success';

interface UISoundEngineProps {
  enabled: boolean;
}

/**
 * A tiny synthesized sound engine. Audio is generated with Web Audio so the
 * interface stays asset-free, instant, and usable offline.
 */
export const UISoundEngine = ({ enabled }: UISoundEngineProps) => {
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const play = (kind: SoundKind) => {
      if (!enabled) return;

      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;

      const context = contextRef.current ?? new AudioContextClass();
      contextRef.current = context;
      if (context.state === 'suspended') void context.resume();

      const now = context.currentTime;
      const master = context.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(kind === 'open' ? 0.045 : 0.03, now + 0.006);
      master.gain.exponentialRampToValueAtTime(0.0001, now + (kind === 'open' ? 0.22 : 0.1));
      master.connect(context.destination);

      const high = context.createOscillator();
      const highGain = context.createGain();
      high.type = 'sine';
      high.frequency.setValueAtTime(kind === 'success' ? 880 : kind === 'open' ? 520 : 680, now);
      high.frequency.exponentialRampToValueAtTime(
        kind === 'success' ? 1320 : kind === 'open' ? 940 : 1120,
        now + (kind === 'open' ? 0.18 : 0.075),
      );
      highGain.gain.setValueAtTime(0.8, now);
      highGain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === 'open' ? 0.2 : 0.09));
      high.connect(highGain);
      highGain.connect(master);
      high.start(now);
      high.stop(now + (kind === 'open' ? 0.21 : 0.1));

      // A short low transient gives the neon click a tactile edge.
      const low = context.createOscillator();
      const lowGain = context.createGain();
      low.type = 'triangle';
      low.frequency.setValueAtTime(kind === 'open' ? 150 : 210, now);
      low.frequency.exponentialRampToValueAtTime(80, now + 0.065);
      lowGain.gain.setValueAtTime(0.35, now);
      lowGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
      low.connect(lowGain);
      lowGain.connect(master);
      low.start(now);
      low.stop(now + 0.08);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const control = target?.closest<HTMLElement>('button, a, [role="button"]');
      if (!control || control.hasAttribute('disabled') || control.dataset.soundToggle === 'true') return;
      const requested = control.dataset.sound as SoundKind | undefined;
      play(requested ?? 'click');
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [enabled]);

  useEffect(
    () => () => {
      if (contextRef.current) void contextRef.current.close();
    },
    [],
  );

  return null;
};