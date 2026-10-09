'use client';

import React from 'react';
import { Sparkles, Calendar, Zap, BookmarkCheck, Palette, FileText, History, Video, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenPaletteCatalog: () => void;
  onOpenHistory: () => void;
  onResetAll: () => void;
  onScrollToStep: (stepId: string) => void;
  onWhatsAppQuote?: () => void;
  quoteCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPaletteCatalog,
  onOpenHistory,
  onResetAll,
  onScrollToStep,
  onWhatsAppQuote,
  quoteCount,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => onScrollToStep('step-hero')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-serif text-xl font-bold shadow-sm group-hover:scale-105 transition-transform">
            BE
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl text-primary tracking-tight font-semibold leading-tight">
              Bella_encant
            </span>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
              Fechamento Consultivo 60s
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          <button
            onClick={() => onScrollToStep('step-env')}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          >
            1. Entorno
          </button>
          <button
            onClick={() => onScrollToStep('step-palette')}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          >
            2. Paleta 60-30-10
          </button>
          <button
            onClick={() => onScrollToStep('step-pyramid')}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          >
            3. Pirâmide Visual
          </button>
          <button
            onClick={() => onScrollToStep('step-budget')}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          >
            4. Tabela Quick-Budget
          </button>
          <button
            onClick={() => onScrollToStep('step-showcase')}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-primary-fixed/40 transition-all flex items-center gap-1.5"
          >
            <Video className="w-4 h-4" />
            <span>Vídeos &amp; Fotos</span>
          </button>
          <button
            onClick={onOpenPaletteCatalog}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-primary-fixed/40 transition-all"
          >
            <Palette className="w-4 h-4" />
            <span>Catálogo</span>
          </button>
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-all relative"
          >
            <History className="w-4 h-4" />
            <span>Histórico</span>
            {quoteCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-secondary text-on-secondary text-[10px] flex items-center justify-center font-bold">
                {quoteCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action Deck */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-[11px] font-bold text-on-surface-variant uppercase">
              Data Bloqueada:
            </span>
            <span className="text-[11px] font-bold text-secondary">Próximo Sábado</span>
          </div>

          <button
            onClick={onResetAll}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface text-xs sm:text-sm font-semibold hover:bg-surface-variant transition-all shadow-xs active:scale-95"
            type="button"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Novo Atendimento</span>
            <span className="sm:hidden">Novo</span>
          </button>

          {onWhatsAppQuote && (
            <button
              onClick={onWhatsAppQuote}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs sm:text-sm font-bold hover:bg-[#20BD5A] transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Fazer Orçamento no WhatsApp"
              type="button"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span className="hidden sm:inline">Orçamento no Zap</span>
              <span className="sm:hidden">Zap</span>
            </button>
          )}

          {/* Decorator Profile Pill */}
          <div className="flex items-center gap-2 pl-1 border-l border-outline-variant/30">
            <div className="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-sm border border-secondary/30">
              HP
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-on-surface leading-tight">
                Helena Prado
              </span>
              <span className="text-[10px] text-on-surface-variant leading-tight">
                Decoradora Chefe
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
