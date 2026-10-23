type SplitTextProps = {
  text: string;
  className?: string;
};

export function SplitText({ text, className }: SplitTextProps) {
  return (
    <span className={className}>
      {Array.from(text).map((glyph, index) => (
        <span key={`${glyph}-${index}`} className="char-mask">
          <span className="char" data-hero-char="" style={{ animationDelay: `${index * 28}ms` }}>
            {glyph === " " ? "\u00A0" : glyph}
          </span>
        </span>
      ))}
    </span>
  );
}
