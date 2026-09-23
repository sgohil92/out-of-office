export default function PhotoSlot({
  src,
  alt = "",
  label = "photograph forthcoming",
  className = "",
}: {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
}) {
  if (!src) {
    return (
      <span
        aria-hidden
        className={`ooo-photo-empty flex aspect-[3/2] items-center justify-center p-2 text-center font-mono text-[8px] tracking-[0.22em] text-[#6B6760] ${className}`}
      >
        [ {label} ]
      </span>
    );
  }
  return (
    <span
      className={`relative block -rotate-[0.8deg] border border-[#242220] bg-[#100F0E] p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.45)] ${className}`}
    >
      <span
        aria-hidden
        className="tape absolute -left-2 -top-1.5 z-10 h-3 w-9 -rotate-[38deg]"
      />
      <span className="deckle block bg-[#E4DCC8] p-[4px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="aspect-[3/2] w-full object-cover sepia-[0.45] contrast-[1.08] brightness-[0.94]"
        />
      </span>
    </span>
  );
}
