type PreloaderProps = {
  onSkip: () => void;
};

export function Preloader({ onSkip }: PreloaderProps) {
  return (
    <div className="preloader" role="status" aria-live="polite" aria-label="Memuat portofolio">
      <div className="pre-panel pre-panel-top" data-panel="top" />
      <div className="pre-panel pre-panel-bottom" data-panel="bottom" />
      <div className="pre-copy" data-pre-ui="">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">Portfolio</p>
        <p className="pre-name" data-pre-name="">
          Denyyy
        </p>
        <span className="pre-rule" />
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          Creative frontend · Surakarta
        </p>
      </div>
      <button type="button" className="skip-intro" data-magnetic="" data-pre-ui="" onClick={onSkip}>
        Lewati
      </button>
    </div>
  );
}
