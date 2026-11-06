import Image from "next/image";
import blurPlaceholders from "@/data/blur-placeholders.json";
import { FILTRE_TOILE } from "@/lib/toiles-filter";

/** Zoom lent de la toile au survol ou au focus de la carte, coupé sous prefers-reduced-motion */
const ZOOM_AU_SURVOL =
  "motion-safe:transition-transform motion-safe:[transition-duration:1400ms] motion-safe:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-within:scale-[1.04]";

const FLOUS: Record<string, string> = blurPlaceholders;

interface ImageToileProps {
  src: string;
  alt: string;
  /** Classe Tailwind du cadre, par exemple aspect-[4/5] */
  ratio: string;
  sizes: string;
  prioritaire: boolean;
  /** Vrai quand la carte mène à un article : la toile réagit alors au survol */
  reactive: boolean;
}

/** Toile de Guillaume, recadrée au format de la carte, avec le filtre de couleur commun au site */
export default function ImageToile({ src, alt, ratio, sizes, prioritaire, reactive }: ImageToileProps) {
  const flou = FLOUS[src];
  return (
    <div className={`relative overflow-hidden bg-muted ${ratio}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={prioritaire}
        className={`object-cover ${reactive ? ZOOM_AU_SURVOL : ""}`}
        style={{ filter: FILTRE_TOILE }}
        {...(flou ? { placeholder: "blur" as const, blurDataURL: flou } : {})}
      />
    </div>
  );
}
