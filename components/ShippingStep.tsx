'use client';

import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Search,
  Navigation,
  Warehouse,
  CheckCircle2,
  Info,
  Clock,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { ShippingType } from '@/lib/decor-data';

interface ShippingStepProps {
  shippingType: ShippingType;
  onSelectShippingType: (type: ShippingType) => void;
  shippingCep: string;
  onChangeShippingCep: (cep: string) => void;
  shippingAddress: string;
  onChangeShippingAddress: (address: string) => void;
  shippingKm: number;
  onChangeShippingKm: (km: number) => void;
  shippingPrice: number;
  decorSubtotal: number;
  grandTotal: number;
}

export const ShippingStep: React.FC<ShippingStepProps> = ({
  shippingType,
  onSelectShippingType,
  shippingCep,
  onChangeShippingCep,
  shippingAddress,
  onChangeShippingAddress,
  shippingKm,
  onChangeShippingKm,
  shippingPrice,
  decorSubtotal,
  grandTotal,
}) => {
  const [isSearchingCep, setIsSearchingCep] = useState<boolean>(false);
  const [cepError, setCepError] = useState<string>('');

  const quickDistances = [
    { label: '5 km (Bairro Próximo)', km: 5 },
    { label: '12 km (Centro / Zona Central)', km: 12 },
    { label: '20 km (Zona Sul / Norte)', km: 20 },
    { label: '35 km (Região Metropolitana)', km: 35 },
    { label: '50 km (Sítio / Litoral)', km: 50 },
  ];

  const handleSearchCep = async () => {
    const cleanCep = shippingCep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setCepError('Digite um CEP válido com 8 dígitos.');
      return;
    }

    setCepError('');
    setIsSearchingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError('CEP não encontrado. Preencha o endereço manualmente.');
      } else {
        const fullAddr = `${data.logradouro ? data.logradouro + ', ' : ''}${data.bairro} - ${data.localidade}/${data.uf}`;
        onChangeShippingAddress(fullAddr);

        // Estima distância baseada na região de forma amigável se não definida
        if (shippingKm <= 5) {
          onChangeShippingKm(15);
        }
      }
    } catch {
      setCepError('Não foi possível consultar o CEP no momento. Preencha manualmente.');
    } finally {
      setIsSearchingCep(false);
    }
  };

  return (
    <section
      id="step-shipping"
      className="flex flex-col gap-6 bg-surface-container-lowest rounded-2xl p-5 md:p-8 shadow-[0_4px_24px_-4px_rgba(100,70,50,0.05)] border border-outline-variant/30"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-sm">
            05
          </span>
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
              Cálculo de Frete e Logística (Ida e Volta)
            </h2>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              2 Viagens Completas: Entrega &amp; Montagem + Desmontagem &amp; Coleta
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant/30 px-4 py-1.5 rounded-full self-start md:self-auto">
          <Truck className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-on-surface">
            Logística Segura &amp; Pontual
          </span>
        </div>
      </div>

      <p className="text-sm text-on-surface-variant">
        Toda cenografia de alto padrão exige duas viagens de equipe: a primeira para levar e montar
        com precisão antes da festa, e a segunda para desmontar e recolher com segurança após o evento.
      </p>

      {/* Logistics Modality Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Option 1: Entrega e Montagem Completa */}
        <div
          onClick={() => onSelectShippingType('entrega')}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
            shippingType === 'entrega'
              ? 'bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20'
              : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm sm:text-base text-on-surface">
                  Logística Completa Bella_encant
                </span>
                <span className="text-[11px] text-secondary font-semibold">
                  Ida e Volta com Equipe Técnica
                </span>
              </div>
            </div>
            {shippingType === 'entrega' && (
              <span className="px-2 py-0.5 rounded-md bg-primary text-on-primary text-[10px] font-bold">
                Selecionado
              </span>
            )}
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            Nossa equipe leva todas as peças, flores e suportes, realiza a montagem cenográfica
            completa e retorna após o evento para desmontagem cuidadosa.
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 text-xs">
            <span className="text-on-surface-variant font-medium">
              Taxa base R$ 50,00 + R$ 2,50/km (ida e volta)
            </span>
            <span className="font-bold text-primary">
              R$ {shippingPrice.toLocaleString('pt-BR')},00
            </span>
          </div>
        </div>

        {/* Option 2: Retirada no Galpão (Pegue e Monte) */}
        <div
          onClick={() => onSelectShippingType('retirada')}
          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
            shippingType === 'retirada'
              ? 'bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20'
              : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-secondary flex items-center justify-center">
                <Warehouse className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm sm:text-base text-on-surface">
                  Retirada no Galpão Central
                </span>
                <span className="text-[11px] text-secondary font-semibold">
                  Pegue &amp; Monte / Frete Grátis
                </span>
              </div>
            </div>
            {shippingType === 'retirada' && (
              <span className="px-2 py-0.5 rounded-md bg-primary text-on-primary text-[10px] font-bold">
                Selecionado
              </span>
            )}
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            O cliente retira todas as peças organizadas e higienizadas em caixas acolchoadas em nosso
            galpão e realiza a devolução no próximo dia útil.
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 text-xs">
            <span className="text-on-surface-variant font-medium">Sem custo de frete</span>
            <span className="font-bold text-tertiary">Frete Grátis (R$ 0,00)</span>
          </div>
        </div>
      </div>

      {/* Address & Distance Details (When Entrega is active) */}
      {shippingType === 'entrega' && (
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* CEP Input with search */}
            <div className="md:col-span-4 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                CEP do Evento / Espaço:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={9}
                  value={shippingCep}
                  onChange={(e) => onChangeShippingCep(e.target.value)}
                  placeholder="Ex: 01310-100"
                  className="w-full px-3 py-2 rounded-xl text-xs md:text-sm bg-surface-container-lowest border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleSearchCep}
                  disabled={isSearchingCep}
                  className="px-3 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isSearchingCep ? 'Buscando...' : 'Buscar'}</span>
                </button>
              </div>
              {cepError && <span className="text-[11px] text-error font-medium">{cepError}</span>}
            </div>

            {/* Address / Venue description */}
            <div className="md:col-span-8 flex flex-col gap-1">
              <label className="text-[11px] font-bold text-on-surface-variant uppercase flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-secondary" />
                Endereço / Bairro de Montagem:
              </label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => onChangeShippingAddress(e.target.value)}
                placeholder="Ex: Espaço Villa Nobre, Jardins - São Paulo/SP"
                className="w-full px-3 py-2 rounded-xl text-xs md:text-sm bg-surface-container-lowest border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Distance Slider and Quick Presets */}
          <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-primary" />
                Distância Estimada do Galpão Bella_encant:
              </span>
              <span className="font-serif text-lg font-bold text-primary">
                {shippingKm} km{' '}
                <span className="text-xs font-sans text-on-surface-variant font-normal">
                  (ida e volta calculada)
                </span>
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={shippingKm}
              onChange={(e) => onChangeShippingKm(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />

            {/* Quick Distance Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickDistances.map((qd) => (
                <button
                  key={qd.km}
                  type="button"
                  onClick={() => onChangeShippingKm(qd.km)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    shippingKm === qd.km
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {qd.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Calculation Breakdown Formula */}
          <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex flex-col gap-1.5 text-xs">
            <div className="flex items-center justify-between font-semibold text-on-surface">
              <span>Memória de Cálculo de Logística:</span>
              <span className="text-primary font-bold">R$ {shippingPrice.toLocaleString('pt-BR')},00</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-on-surface-variant text-[11px] gap-1">
              <span>
                • Taxa fixa de expedição e montagem especializada: <strong>R$ 50,00</strong>
              </span>
              <span>
                • Quilometragem (2 viagens completas de ida e volta):{' '}
                <strong>{shippingKm} km × R$ 2,50 × 2 = R$ {(shippingKm * 5).toLocaleString('pt-BR')},00</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Transparent Financial Recap Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-high/80 border border-outline-variant/30 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-outline-variant/20">
          <span className="text-on-surface-variant font-medium">Subtotal Decoração (Peças, Flores &amp; Mesa):</span>
          <span className="font-semibold text-on-surface">
            R$ {decorSubtotal.toLocaleString('pt-BR')},00
          </span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-outline-variant/20">
          <span className="text-on-surface-variant font-medium flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-primary" />
            Frete &amp; Logística (Ida/Volta + Montagem e Desmontagem):
          </span>
          <span className="font-semibold text-primary">
            {shippingType === 'retirada'
              ? 'Grátis (Retirada)'
              : `+ R$ ${shippingPrice.toLocaleString('pt-BR')},00`}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg font-bold text-on-surface">
              Investimento Total Geral:
            </span>
            <span className="text-[11px] text-on-surface-variant">
              Decoração completa entregue, montada e desmontada no local
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold text-on-surface-variant">R$</span>
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              {grandTotal.toLocaleString('pt-BR')}
              <span className="text-xs font-sans text-outline font-normal">,00</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
