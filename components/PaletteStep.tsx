'use client';

import React from 'react';
import Image from 'next/image';
import { Palette, Sparkles, Camera, Check, ExternalLink } from 'lucide-react';
import { PalettePreset, PALETTES } from '@/lib/decor-data';

interface PaletteStepProps {
  currentPalette: PalettePreset;
  onSelectPalette: (presetKey: string) => void;
  onOpenPaletteCatalog: () => void;
}

export const PaletteStep: React.FC<PaletteStepProps> = ({
  currentPalette,
  onSelectPalette,
  onOpenPaletteCatalog,
}) => {
  const quickPresets = [
    { key: 'ferrari', label: 'Vermelho Ferrari' },
    { key: 'oliva', label: 'Oliva & Terracota' },
    { key: 'salao', label: 'Salão Nobre' },
    { key: 'campo', label: 'Campo Boho' },
    { key: 'praia', label: 'Praia Suave' },
    { key: 'industrial', label: 'Industrial Chic' },
  ];

  return (
    <div
      id="step-palette"
      className="flex flex-col gap-5 bg-surface-container-lowest rounded-2xl p-5 md:p-7 shadow-[0_4px_24px_-4px_rgba(100,70,50,0.05)] border border-outline-variant/30"
    >
      {/* Step Header & Preset Switchers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-sm">
            02
          </span>
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
              Regra 60-30-10 de Harmonia
            </h2>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              05s – 15s de conversa • Passo 2
            </span>
          </div>
        </div>

        {/* Quick Presets Carousel */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {quickPresets.map((preset) => {
            const isSelected = currentPalette.id === preset.key;
            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => onSelectPalette(preset.key)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-secondary-fixed text-on-secondary-fixed shadow-sm ring-1 ring-secondary/40 font-bold'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-on-surface-variant">
        A cenografia profissional aplica a regra visual de proporção áurea para que as fotos não
        fiquem monocromáticas nem visivelmente saturadas:
      </p>

      {/* Proportional 60-30-10 Segmented Bar */}
      <div className="flex flex-col gap-2">
        <div className="w-full h-11 rounded-xl overflow-hidden flex shadow-inner border border-outline-variant/20 p-0.5 bg-surface-container-high">
          {/* 60% Segment */}
          <div
            className="h-full flex items-center justify-center transition-all duration-300 rounded-l-lg relative group"
            style={{
              width: '60%',
              backgroundColor: currentPalette.color60.hex,
            }}
          >
            <span className="text-xs font-bold px-2 py-0.5 rounded shadow-sm bg-black/30 text-white backdrop-blur-xs">
              60% Dominante
            </span>
          </div>

          {/* 30% Segment */}
          <div
            className="h-full flex items-center justify-center transition-all duration-300 relative group"
            style={{
              width: '30%',
              backgroundColor: currentPalette.color30.hex,
            }}
          >
            <span className="text-xs font-bold px-2 py-0.5 rounded shadow-sm bg-black/30 text-white backdrop-blur-xs">
              30% Secundária
            </span>
          </div>

          {/* 10% Segment */}
          <div
            className="h-full flex items-center justify-center transition-all duration-300 rounded-r-lg relative group"
            style={{
              width: '10%',
              backgroundColor: currentPalette.color10.hex,
            }}
          >
            <span className="text-[11px] font-bold text-white drop-shadow-md">10%</span>
          </div>
        </div>

        {/* Labels under Bar */}
        <div className="flex justify-between items-center text-[11px] text-on-surface-variant px-1 font-medium">
          <span className="w-[60%] truncate">Toalhas, Cortinados &amp; Fundo Base</span>
          <span className="w-[30%] truncate text-center">Suportes, Louças &amp; Taças</span>
          <span className="w-[10%] text-right truncate">Flores &amp; Velas</span>
        </div>
      </div>

      {/* Dynamic Color Cards Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* 60% Card */}
        <div className="flex flex-col p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 relative group hover:border-outline-variant/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
              60% Dominante
            </span>
            <span
              className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
              style={{ backgroundColor: currentPalette.color60.hex }}
              title={currentPalette.color60.hex}
            />
          </div>
          <span className="font-serif text-base font-semibold text-primary">
            {currentPalette.color60.name}
          </span>
          <span className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            {currentPalette.color60.role}
          </span>
          <span className="text-[10px] text-secondary font-medium mt-2 pt-2 border-t border-outline-variant/20">
            Material: {currentPalette.color60.material}
          </span>
        </div>

        {/* 30% Card */}
        <div className="flex flex-col p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 relative group hover:border-outline-variant/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
              30% Secundária
            </span>
            <span
              className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
              style={{ backgroundColor: currentPalette.color30.hex }}
              title={currentPalette.color30.hex}
            />
          </div>
          <span className="font-serif text-base font-semibold text-primary">
            {currentPalette.color30.name}
          </span>
          <span className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            {currentPalette.color30.role}
          </span>
          <span className="text-[10px] text-secondary font-medium mt-2 pt-2 border-t border-outline-variant/20">
            Material: {currentPalette.color30.material}
          </span>
        </div>

        {/* 10% Card */}
        <div className="flex flex-col p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 relative group hover:border-outline-variant/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
              10% Acento Focal
            </span>
            <span
              className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
              style={{ backgroundColor: currentPalette.color10.hex }}
              title={currentPalette.color10.hex}
            />
          </div>
          <span className="font-serif text-base font-semibold text-primary">
            {currentPalette.color10.name}
          </span>
          <span className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            {currentPalette.color10.role}
          </span>
          <span className="text-[10px] text-secondary font-medium mt-2 pt-2 border-t border-outline-variant/20">
            Material: {currentPalette.color10.material}
          </span>
        </div>
      </div>

      {/* Visual Palette Preview Photo Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/30">
        <div className="w-full sm:w-24 h-24 sm:h-20 shrink-0 rounded-lg overflow-hidden shadow-sm relative group">
          <Image
            src={currentPalette.photoPreview}
            alt={currentPalette.photoAlt}
            fill
            sizes="(max-width: 640px) 100vw, 96px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              Resultado Fotográfico Previsto
            </span>
            <button
              onClick={onOpenPaletteCatalog}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver mais paletas</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <p className="text-xs md:text-sm text-on-surface leading-relaxed">
            {currentPalette.description}
          </p>
        </div>
      </div>
    </div>
  );
};
