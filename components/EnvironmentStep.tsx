'use client';

import React from 'react';
import { Waves, Building2, Trees, Warehouse, Home, Lightbulb, Check } from 'lucide-react';
import { ENVIRONMENTS, EnvironmentOption } from '@/lib/decor-data';

interface EnvironmentStepProps {
  selectedEnvId: string;
  onSelectEnvironment: (env: EnvironmentOption) => void;
}

export const EnvironmentStep: React.FC<EnvironmentStepProps> = ({
  selectedEnvId,
  onSelectEnvironment,
}) => {
  const selectedEnv =
    ENVIRONMENTS.find((e) => e.id === selectedEnvId) || ENVIRONMENTS[1];

  const getEnvIcon = (id: string) => {
    switch (id) {
      case 'praia':
        return <Waves className="w-5 h-5" />;
      case 'salao':
        return <Building2 className="w-5 h-5" />;
      case 'campo':
        return <Trees className="w-5 h-5" />;
      case 'industrial':
        return <Warehouse className="w-5 h-5" />;
      case 'intimista':
        return <Home className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <div
      id="step-env"
      className="flex flex-col gap-5 bg-surface-container-lowest rounded-2xl p-5 md:p-7 shadow-[0_4px_24px_-4px_rgba(100,70,50,0.05)] border border-outline-variant/30"
    >
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-sm">
            01
          </span>
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
              Identificação do Entorno
            </h2>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              00s – 05s de conversa • Passo 1
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold uppercase tracking-wider">
          Passo Instantâneo
        </span>
      </div>

      <p className="text-sm text-on-surface-variant">
        O ambiente define a incidência de luz, a paleta preliminar e o tipo de sustentação dos
        arranjos. Escolha o local do evento:
      </p>

      {/* Environment Selectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {ENVIRONMENTS.map((env) => {
          const isSelected = env.id === selectedEnvId;

          return (
            <div
              key={env.id}
              onClick={() => onSelectEnvironment(env)}
              className={`group flex flex-col items-center text-center p-3 rounded-xl cursor-pointer transition-all duration-200 border relative ${
                isSelected
                  ? 'bg-primary-fixed/40 border-primary shadow-sm ring-1 ring-primary/40'
                  : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container hover:border-outline-variant/50'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-105 ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-variant text-secondary'
                }`}
              >
                {getEnvIcon(env.id)}
              </div>
              <span
                className={`text-xs md:text-sm font-semibold leading-tight ${
                  isSelected ? 'text-primary font-bold' : 'text-on-surface'
                }`}
              >
                {env.name}
              </span>
              <span className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                {env.subtitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Tip Callout */}
      <div className="flex items-start gap-3 bg-surface-container-high/70 border border-outline-variant/30 p-4 rounded-xl">
        <Lightbulb className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Diretriz Express de Cenografia:
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-semibold">
              {selectedEnv.lightingType}
            </span>
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
            {selectedEnv.tip}
          </p>
        </div>
      </div>
    </div>
  );
};
