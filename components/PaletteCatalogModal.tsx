'use client';

import React from 'react';
import { X, Sparkles, Check, Palette } from 'lucide-react';
import { PALETTES, PalettePreset } from '@/lib/decor-data';

interface PaletteCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPaletteId: string;
  onSelectPalette: (paletteKey: string) => void;
}

export const PaletteCatalogModal: React.FC<PaletteCatalogModalProps> = ({
  isOpen,
  onClose,
  selectedPaletteId,
  onSelectPalette,
}) => {
  if (!isOpen) return null;

  const paletteList = Object.entries(PALETTES);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-2xl border border-outline-variant/30 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-xs">
              <Palette className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-on-surface">
                Catálogo de Paletas Cenográficas 60-30-10
              </h3>
              <p className="text-xs text-on-surface-variant">
                Selecione combinações validadas por decoradores com proporção áurea equilibrada
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Palettes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-h-[70vh] overflow-y-auto pr-1">
          {paletteList.map(([key, pal]) => {
            const isSelected = pal.id === selectedPaletteId;

            return (
              <div
                key={key}
                onClick={() => {
                  onSelectPalette(key);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-primary-fixed/20 border-primary ring-2 ring-primary/40 shadow-sm'
                    : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container hover:border-outline-variant/50'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                        {pal.category} • {pal.envMatch}
                      </span>
                      <h4 className="font-serif text-lg font-semibold text-on-surface">
                        {pal.name}
                      </h4>
                    </div>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Ativa
                      </span>
                    )}
                  </div>

                  {/* 60-30-10 Mini Swatches */}
                  <div className="flex items-center gap-2 py-1">
                    <div className="flex items-center gap-1.5 flex-1 bg-surface-container-lowest p-1.5 rounded-lg border border-outline-variant/20">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: pal.color60.hex }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-on-surface uppercase">60%</span>
                        <span className="text-[10px] text-on-surface-variant truncate">
                          {pal.color60.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-1 bg-surface-container-lowest p-1.5 rounded-lg border border-outline-variant/20">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: pal.color30.hex }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-on-surface uppercase">30%</span>
                        <span className="text-[10px] text-on-surface-variant truncate">
                          {pal.color30.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-1 bg-surface-container-lowest p-1.5 rounded-lg border border-outline-variant/20">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: pal.color10.hex }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-on-surface uppercase">10%</span>
                        <span className="text-[10px] text-on-surface-variant truncate">
                          {pal.color10.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {pal.description}
                  </p>
                </div>

                <button
                  type="button"
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                  }`}
                >
                  {isSelected ? 'Paleta Selecionada' : 'Aplicar Esta Paleta'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
