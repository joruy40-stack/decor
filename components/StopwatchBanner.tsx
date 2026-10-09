'use client';

import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Sparkles, ChevronRight, CheckCircle2, MessageCircle } from 'lucide-react';

interface StopwatchBannerProps {
  timerSeconds: number;
  timerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onStartExpress: () => void;
  onWhatsAppQuote?: () => void;
  activeMilestone: number;
  onSelectMilestone: (index: number) => void;
}

export const StopwatchBanner: React.FC<StopwatchBannerProps> = ({
  timerSeconds,
  timerRunning,
  onToggleTimer,
  onResetTimer,
  onStartExpress,
  onWhatsAppQuote,
  activeMilestone,
  onSelectMilestone,
}) => {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const formattedTime = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const progressPercent = Math.min((timerSeconds / 60) * 100, 100);

  const milestones = [
    {
      num: 1,
      range: '00s – 05s',
      title: 'Análise do Entorno',
      id: 'step-env',
    },
    {
      num: 2,
      range: '05s – 15s',
      title: 'Regra 60-30-10',
      id: 'step-palette',
    },
    {
      num: 3,
      range: '15s – 40s',
      title: 'Técnica Pirâmide',
      id: 'step-pyramid',
    },
    {
      num: 4,
      range: '40s – 60s',
      title: 'Quick-Budget & Fecho',
      id: 'step-budget',
    },
  ];

  return (
    <section
      id="step-hero"
      className="flex flex-col gap-6 bg-surface-container-lowest rounded-2xl p-5 md:p-8 shadow-[0_4px_24px_-4px_rgba(100,70,50,0.06)] border border-outline-variant/30 relative overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

      {/* Header Info & Timer Deck */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              Método de Conversão 60s
            </span>
            <span className="text-xs font-medium text-on-surface-variant">
              | Modo Atendimento Ao Vivo &amp; Orçamento Instantâneo
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight font-semibold leading-tight">
            Monte a Decoração da Sua Festa em Apenas 1 Minuto
          </h1>

          <p className="text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Escolha o local, a paleta de cores ideal com a Regra 60-30-10, visualize a disposição da
            mesa e receba o orçamento ideal na hora com fechamento consultivo.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartExpress}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-all shadow-md active:scale-95 group cursor-pointer"
            >
              <span>Começar Minha Decoração Express</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {onWhatsAppQuote && (
              <button
                onClick={onWhatsAppQuote}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold hover:bg-[#20BD5A] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Fazer Orçamento no Zap</span>
              </button>
            )}

            <span className="text-xs text-on-surface-variant flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Sem burocracia • Resposta no WhatsApp
            </span>
          </div>
        </div>

        {/* Stopwatch Control Deck */}
        <div className="flex items-center gap-4 self-start lg:self-auto bg-surface-container-low border border-outline-variant/30 px-5 py-3.5 rounded-2xl shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Timer className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                Tempo de Consulta
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight">
                  {formattedTime}
                </span>
                <span className="text-xs font-semibold text-outline">/ 01:00</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-outline-variant/30">
            <button
              onClick={onToggleTimer}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs md:text-sm font-semibold hover:bg-primary-container transition-all shadow-sm active:scale-95 cursor-pointer"
              type="button"
            >
              {timerRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{timerSeconds === 0 ? 'Iniciar Cronômetro' : 'Continuar'}</span>
                </>
              )}
            </button>

            <button
              onClick={onResetTimer}
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              title="Reiniciar Cronômetro"
              type="button"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 60-Second Timeline Track */}
      <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
        <div className="relative w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 4 Checkpoints Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
          {milestones.map((m, idx) => {
            const isCurrent = activeMilestone === idx + 1;
            const isCompleted = activeMilestone > idx + 1;

            return (
              <div
                key={m.num}
                onClick={() => onSelectMilestone(idx + 1)}
                className={`flex items-start gap-2.5 p-2 rounded-xl transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-primary-fixed/30 border-primary/30 shadow-sm'
                    : isCompleted
                    ? 'bg-surface-container-low/70 border-outline-variant/20 opacity-80'
                    : 'bg-transparent border-transparent hover:bg-surface-container-low'
                }`}
              >
                <span
                  className={`w-6 h-6 shrink-0 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                    isCurrent
                      ? 'bg-primary text-on-primary'
                      : isCompleted
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : m.num}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-on-surface leading-tight">
                    {m.range}
                  </span>
                  <span className="text-xs text-on-surface-variant truncate font-medium">
                    {m.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
