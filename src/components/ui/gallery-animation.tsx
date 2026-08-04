import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  src: string;
  style: string;
  cat: string;
}

interface ExpandableGalleryProps {
  items: GalleryItem[];
  className?: string;
}

export const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({ items, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  };

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) {
      return 1;
    }
    return hoveredIndex === index ? 2 : 0.5;
  };

  return (
    <div className={className}>
      {/* Expandable Gallery (Vertical on Mobile, Horizontal on Desktop) */}
      <div className="flex flex-col md:flex-row gap-2 h-[600px] md:h-[500px] w-full">
        {items.map((item, index) => (
          <motion.div
            key={item.src}
            className="group relative cursor-pointer overflow-hidden rounded-md border border-border transition-colors duration-700 hover:border-gold/40"
            style={{ flex: 1 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => {
              if (window.matchMedia('(hover: hover)').matches) {
                setHoveredIndex(index);
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia('(hover: hover)').matches) {
                setHoveredIndex(null);
              }
            }}
            onClick={() => {
              if (window.matchMedia('(hover: none)').matches) {
                if (hoveredIndex === index) {
                  openImage(index);
                } else {
                  setHoveredIndex(index);
                }
              } else {
                openImage(index);
              }
            }}
          >
            <img
              src={item.src}
              alt={`${item.style} — Lunfardo Tattoo`}
              className="w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.07]"
              style={{
                filter: hoveredIndex !== null && hoveredIndex !== index ? 'brightness(0.3)' : 'brightness(0.85)'
              }}
            />
            <motion.div
              className="absolute inset-0 bg-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Outline highlight to match branding */}
            <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-gold/30" />
          </motion.div>
        ))}
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 backdrop-blur-xl p-6"
            onClick={closeImage}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-gold transition-colors"
              onClick={closeImage}
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>

            {/* Previous Button */}
            {items.length > 1 && (
              <button
                className="absolute left-6 z-10 text-muted-foreground hover:text-gold transition-colors"
                onClick={goToPrev}
              >
                <ChevronLeft className="w-10 h-10" strokeWidth={1} />
              </button>
            )}

            {/* Image & Caption */}
            <motion.div
              className="relative max-w-5xl max-h-[86vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={items[selectedIndex].src}
                alt={`${items[selectedIndex].style} — Lunfardo Tattoo`}
                className="max-h-[76vh] w-auto object-contain shadow-[var(--shadow-lift)]"
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Image Counter */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-muted-foreground text-sm eyebrow px-4 py-2">
                {selectedIndex + 1} / {items.length}
              </div>
            </motion.div>

            {/* Next Button */}
            {items.length > 1 && (
              <button
                className="absolute right-6 z-10 text-muted-foreground hover:text-gold transition-colors"
                onClick={goToNext}
              >
                <ChevronRight className="w-10 h-10" strokeWidth={1} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
