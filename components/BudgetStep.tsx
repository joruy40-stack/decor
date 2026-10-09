'use client';

import React from 'react';
import {
  CheckCircle2,
  Lock,
  Flame,
  Star,
  Diamond,
  Check,
  Flower2,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  PACKAGES,
  ADDONS,
  PackageOption,
  AddonOption,
  FloralType,
} from '@/lib/decor-data';

interface BudgetStepProps {
  selectedPackageId: string;
  onSelectPackage: (pkg: PackageOption) => void;
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
  totalPrice: number;
  floralType: FloralType;
  onSelectFloralType: (type: FloralType) => void;
}

export const BudgetStep: React.FC<BudgetStepProps> = ({
  selectedPackageId,
  onSelectPackage,
  selectedAddonIds,
  onToggleAddon,
  totalPrice,
  floralType,
  onSelectFloralType,
}) => {
  return (
    <section
      id="step-budget"
      className="flex flex-col gap-6 bg-surface-container-lowest rounded-2xl p-5 md:p-8 shadow-[0_4px_24px_-4px_rgba(100,70,50,0.05)] border border-outline-variant/30"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-sm">
            04
          </span>
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
              Tabela Quick-Budget: Fechamento em 60s
            </h2>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              40s – 60s de conversa • Decisão Imediata
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant/30 px-4 py-1.5 rounded-full self-start md:self-auto">
          <Lock className="w-4 h-4 text-tertiary" />
          <span className="text-xs font-semibold text-on-surface">
            Condição Travada por 24 Horas
          </span>
        </div>
      </div>

      {/* FLORAL MODALITY SELECTOR TABS (Permanente vs Natural) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <Flower2 className="w-4 h-4 text-primary" />
            Escolha o Tipo de Acabamento Floral:
          </span>
          <span className="text-xs font-medium text-secondary">
            {floralType === 'permanente'
              ? '✨ Economia de até R$ 250,00 sem risco de murchar'
              : '🌿 Aroma e frescor botânico nobre colhido no dia'}
          </span>
        </div>

        {/* 2 Big Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Tab 1: Flores Permanentes Toque Real */}
          <div
            onClick={() => onSelectFloralType('permanente')}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${
              floralType === 'permanente'
                ? 'bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20'
                : 'bg-surface-container-high/50 border-outline-variant/30 hover:bg-surface-container'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  🌸
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-on-surface">
                  Flores Permanentes Toque Real
                </span>
              </div>
              {floralType === 'permanente' && (
                <span className="px-2 py-0.5 rounded-md bg-primary text-on-primary text-[10px] font-bold">
                  Ativo
                </span>
              )}
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Seda botânica importada com textura e toque idênticos às naturais. Perfeita para
              espaços abertos, calor, vento ou clientes que buscam alto impacto e excelente custo.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-primary pt-1">
              <span>✓ Não murcha</span>
              <span>•</span>
              <span>✓ Zero desperdício</span>
              <span>•</span>
              <span>✓ Valores mais acessíveis</span>
            </div>
          </div>

          {/* Tab 2: Flores Naturais Frescas */}
          <div
            onClick={() => onSelectFloralType('natural')}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${
              floralType === 'natural'
                ? 'bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20'
                : 'bg-surface-container-high/50 border-outline-variant/30 hover:bg-surface-container'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  🌿
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-on-surface">
                  Flores Naturais Frescas Nobres
                </span>
              </div>
              {floralType === 'natural' && (
                <span className="px-2 py-0.5 rounded-md bg-primary text-on-primary text-[10px] font-bold">
                  Ativo
                </span>
              )}
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Flores colhidas no dia por floristas especialistas. Rosas importadas, hortênsias,
              eucalipto fresco e aroma botânico inconfundível para casamentos e grandes recepções.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-primary pt-1">
              <span>✓ Aroma vivo autêntico</span>
              <span>•</span>
              <span>✓ Exclusividade viva</span>
              <span>•</span>
              <span>✓ Floristas do dia</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Packages Comparative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
        {PACKAGES.map((pkg) => {
          const isSelected = pkg.id === selectedPackageId;
          const currentPrice =
            floralType === 'permanente' ? pkg.pricePermanente : pkg.priceNatural;
          const alternatePrice =
            floralType === 'permanente' ? pkg.priceNatural : pkg.pricePermanente;
          const activeFeatures =
            floralType === 'permanente' ? pkg.featuresPermanente : pkg.featuresNatural;

          return (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className={`flex flex-col justify-between p-6 rounded-2xl transition-all cursor-pointer relative border ${
                isSelected
                  ? 'bg-surface-container-lowest shadow-lg ring-2 ring-primary border-primary -translate-y-1'
                  : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/20 hover:border-outline-variant/50 shadow-sm'
              }`}
            >
              {/* Highlight Tag */}
              {pkg.highlightTag && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                  <Flame className="w-3.5 h-3.5 text-secondary-fixed" />
                  <span>{pkg.highlightTag}</span>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      isSelected ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {pkg.badge}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      pkg.isPopular
                        ? 'bg-primary-fixed text-primary'
                        : pkg.id === 'premium'
                        ? 'bg-secondary-fixed text-secondary'
                        : 'bg-surface-variant text-on-surface-variant'
                    }`}
                  >
                    {pkg.id === 'premium' ? (
                      <Diamond className="w-3.5 h-3.5" />
                    ) : pkg.isPopular ? (
                      <Star className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                <h3 className="font-serif text-xl font-semibold text-on-surface">
                  {pkg.name}
                </h3>

                {/* Price Readout with Floral Modifier */}
                <div className="flex flex-col my-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-semibold text-on-surface-variant">R$</span>
                    <span className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight">
                      {currentPrice.toLocaleString('pt-BR')}
                      <span className="text-sm font-sans font-normal text-outline">,00</span>
                    </span>
                  </div>

                  <span className="text-[11px] text-on-surface-variant mt-0.5">
                    com{' '}
                    <strong>
                      {floralType === 'permanente' ? 'Flores Permanentes' : 'Flores Naturais'}
                    </strong>{' '}
                    (ou R$ {alternatePrice.toLocaleString('pt-BR')},00 com{' '}
                    {floralType === 'permanente' ? 'Naturais' : 'Permanentes'})
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {pkg.description}
                </p>

                <div className="flex flex-col gap-2.5 pt-2 border-t border-outline-variant/20">
                  {activeFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-on-surface leading-tight"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isSelected ? 'text-primary' : 'text-tertiary'
                        }`}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className={`w-full mt-6 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary hover:bg-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                }`}
              >
                {isSelected ? 'Pacote Selecionado' : 'Selecionar Este Pacote'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Strategic Addons Section */}
      <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/20">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Adicionais Estratégicos Recomendados (Up-sell em 1 Clique):
          </span>
          <span className="text-xs text-on-surface-variant">
            {selectedAddonIds.length} selecionado(s)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ADDONS.map((addon) => {
            const isChecked = selectedAddonIds.includes(addon.id);

            return (
              <div
                key={addon.id}
                onClick={() => onToggleAddon(addon.id)}
                className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-primary-fixed/20 border-primary shadow-xs'
                    : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0 pr-2">
                  <div
                    className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                      isChecked
                        ? 'bg-primary text-on-primary border-primary'
                        : 'border-outline bg-surface-container-lowest'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-on-surface leading-tight">
                      {addon.name}
                    </span>
                    <span className="text-[11px] text-on-surface-variant leading-tight truncate">
                      {addon.description}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-primary shrink-0 whitespace-nowrap">
                  + R$ {addon.price},00
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Total Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface-container-high/80 border border-outline-variant/30 gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Investimento Cenográfico Final:
          </span>
          <span className="text-xs text-on-surface-variant">
            Inclui {floralType === 'permanente' ? 'Flores Permanentes Toque Real' : 'Flores Naturais Frescas'} + Peças e suportes
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-on-surface-variant">Total:</span>
          <span className="font-serif text-3xl font-bold text-primary">
            R$ {totalPrice.toLocaleString('pt-BR')}
            <span className="text-xs font-sans text-outline font-normal">,00</span>
          </span>
        </div>
      </div>
    </section>
  );
};
