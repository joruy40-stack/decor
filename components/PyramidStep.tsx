'use client';

import React, { useState } from 'react';
import { Triangle, Ruler, Sparkles, Eye, CheckCircle, Info, Layers, Flower2 } from 'lucide-react';
import { PalettePreset, FloralType } from '@/lib/decor-data';

interface PyramidStepProps {
  currentPalette: PalettePreset;
  floralType?: FloralType;
}

export const PyramidStep: React.FC<PyramidStepProps> = ({ currentPalette, floralType = 'natural' }) => {
  const [activeTier, setActiveTier] = useState<number>(1);
  const [tableType, setTableType] = useState<'retangular' | 'redonda' | 'organica'>('retangular');

  return (
    <div
      id="step-pyramid"
      className="flex flex-col gap-5 bg-surface-container-lowest rounded-2xl p-5 md:p-7 shadow-[0_4px_24px_-4px_rgba(100,70,50,0.05)] border border-outline-variant/30 h-full justify-between"
    >
      {/* Step Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-sm">
              03
            </span>
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
                Técnica da Pirâmide Visual
              </h2>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                15s – 40s de conversa • Passo 3
              </span>
            </div>
          </div>
          <Triangle className="w-6 h-6 text-secondary stroke-[1.5]" />
        </div>
        <p className="text-sm text-on-surface-variant">
          Explique ao cliente o porquê de cada suporte: a volumetria piramidal conduz os olhos para o
          bolo e valoriza os convidados em qualquer clique.
        </p>
      </div>

      {/* Interactive Pyramid Tier Structure */}
      <div className="flex flex-col items-center justify-center py-2 relative">
        {/* Tier 1: Topo Cenográfico */}
        <div
          onClick={() => setActiveTier(1)}
          className={`w-full max-w-[300px] p-3.5 rounded-t-xl text-center shadow-md cursor-pointer transition-all border ${
            activeTier === 1
              ? 'bg-primary text-on-primary ring-2 ring-primary scale-102 z-30'
              : 'bg-primary/90 text-on-primary hover:bg-primary z-20'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-on-primary/90">
            <Sparkles className="w-4 h-4 text-secondary-fixed" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              Topo Cenográfico (Fundo)
            </span>
          </div>
          <h4 className="font-serif text-sm md:text-base font-semibold mt-1">
            Boleira Nobre ou Arranjo Floral Alto
          </h4>
          <span className="text-[11px] text-on-primary-container leading-tight block mt-0.5">
            Altura: 45cm a 60cm | {floralType === 'permanente' ? '🌸 Flores Permanentes Toque Real' : '🌿 Flores Naturais Frescas'}
          </span>
        </div>

        {/* Tier 2: Meio / Laterais Simétricas */}
        <div
          onClick={() => setActiveTier(2)}
          className={`w-full max-w-[360px] p-3 text-center shadow-sm cursor-pointer transition-all border -mt-1 ${
            activeTier === 2
              ? 'bg-secondary-fixed text-on-secondary-fixed ring-2 ring-secondary scale-102 z-30'
              : 'bg-secondary-fixed/90 text-on-secondary-fixed hover:bg-secondary-fixed z-10'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Layers className="w-4 h-4 text-secondary" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              Meio / Laterais Simétricas
            </span>
          </div>
          <h4 className="font-serif text-sm md:text-base font-semibold mt-1">
            Suportes Médios com Pé (Doces Finos)
          </h4>
          <span className="text-[11px] text-on-secondary-fixed-variant leading-tight block mt-0.5">
            Altura: 20cm a 30cm | 4 a 6 bandejas elevadas
          </span>
        </div>

        {/* Tier 3: Base Frontal / Primeiro Plano */}
        <div
          onClick={() => setActiveTier(3)}
          className={`w-full max-w-[420px] p-3 rounded-b-xl text-center shadow-sm cursor-pointer transition-all border -mt-1 ${
            activeTier === 3
              ? 'bg-surface-container-high text-on-surface ring-2 ring-outline-variant scale-102 z-30'
              : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high z-0'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-secondary">
            <Eye className="w-4 h-4" />
            <span className="text-[11px] uppercase font-bold tracking-wider">
              Base Frontal (Primeiro Plano)
            </span>
          </div>
          <h4 className="font-serif text-sm md:text-base font-semibold mt-1 text-primary">
            Pratos Baixos, Porta-guardanapos e Velas
          </h4>
          <span className="text-[11px] text-on-surface-variant leading-tight block mt-0.5">
            Altura: 2cm a 8cm | Detalhes artesanais vistos de perto
          </span>
        </div>
      </div>

      {/* Mini Interactive Table Blueprint Preview */}
      <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-secondary" />
            Visualização Cenográfica da Mesa
          </span>
          <div className="flex items-center gap-1 bg-surface-container-high p-0.5 rounded-lg text-[11px]">
            <button
              type="button"
              onClick={() => setTableType('retangular')}
              className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                tableType === 'retangular'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Imperial
            </button>
            <button
              type="button"
              onClick={() => setTableType('redonda')}
              className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                tableType === 'redonda'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Redonda
            </button>
            <button
              type="button"
              onClick={() => setTableType('organica')}
              className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                tableType === 'organica'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Orgânica
            </button>
          </div>
        </div>

        {/* Blueprint Canvas Graphic */}
        <div className="w-full h-32 rounded-lg bg-surface-container-high/80 border border-outline-variant/30 relative flex items-center justify-center overflow-hidden p-3">
          {/* Table Surface with 60% color tint */}
          <div
            className={`border-2 border-dashed border-outline-variant/60 relative transition-all duration-300 flex items-center justify-center ${
              tableType === 'retangular'
                ? 'w-11/12 h-20 rounded-lg'
                : tableType === 'redonda'
                ? 'w-24 h-24 rounded-full'
                : 'w-10/12 h-20 rounded-2xl'
            }`}
            style={{
              backgroundColor: `${currentPalette.color60.hex}44`,
            }}
          >
            {/* Center Cake / Tall Arrangement (60cm) */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white absolute z-20 transition-transform hover:scale-125"
              style={{ backgroundColor: currentPalette.color10.hex }}
              title="Bolo / Arranjo Alto (Ponto Focal)"
            >
              <span className="text-[9px] font-bold text-white drop-shadow-sm">BOLO</span>
            </div>

            {/* Left Mid-Tier Pedestal (30% color) */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm absolute left-6 z-10"
              style={{ backgroundColor: currentPalette.color30.hex }}
              title="Suporte Médio Esquerdo (Doces Finos)"
            >
              <span className="text-[8px] font-bold text-white">30%</span>
            </div>

            {/* Right Mid-Tier Pedestal (30% color) */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm absolute right-6 z-10"
              style={{ backgroundColor: currentPalette.color30.hex }}
              title="Suporte Médio Direito (Doces Finos)"
            >
              <span className="text-[8px] font-bold text-white">30%</span>
            </div>

            {/* Foreground Accent Candle / Low Trays (10% & 30%) */}
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center shadow-xs absolute bottom-1.5 left-16 z-10"
              style={{ backgroundColor: currentPalette.color10.hex }}
              title="Vela / Ponto Focal"
            />
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center shadow-xs absolute bottom-1.5 right-16 z-10"
              style={{ backgroundColor: currentPalette.color10.hex }}
              title="Vela / Ponto Focal"
            />
          </div>

          <div className="absolute top-1.5 left-2 text-[10px] text-on-surface-variant font-medium">
            Mesa: {tableType === 'retangular' ? 'Imperial Retangular' : tableType === 'redonda' ? 'Redonda Clássica' : 'Trio de Cilindros Orgânicos'}
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-secondary font-bold">
            Simetria Cenográfica Ativa
          </div>
        </div>
      </div>

      {/* Golden Rule Callout */}
      <div className="flex flex-col gap-1.5 bg-tertiary-fixed/30 border border-tertiary/20 p-4 rounded-xl">
        <div className="flex items-center gap-2 text-on-tertiary-fixed">
          <Ruler className="w-4 h-4 text-tertiary" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Regra de Ouro da Cenógrafa:
          </span>
        </div>
        <p className="font-serif text-lg md:text-xl text-tertiary italic font-semibold">
          “Respiro de 5 cm entre cada peça”
        </p>
        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
          Elimina a sensação de mesa entulhada, valoriza a fotografia profissional com lente teleobjetiva
          e gera sofisticação imediata percebida pelo cliente e convidados.
        </p>
      </div>
    </div>
  );
};
