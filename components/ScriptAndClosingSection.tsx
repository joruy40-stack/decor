'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  MessageCircle,
  Sparkles,
  Copy,
  Send,
  FileText,
  Clock,
  Check,
  Calendar,
  User,
  Phone,
  PartyPopper,
  MapPin,
  BookmarkPlus,
} from 'lucide-react';
import { EnvironmentOption, PalettePreset, PackageOption, AddonOption, FloralType } from '@/lib/decor-data';

interface ScriptAndClosingSectionProps {
  environment: EnvironmentOption;
  palette: PalettePreset;
  selectedPackage: PackageOption;
  selectedAddons: AddonOption[];
  totalPrice: number;
  floralType: FloralType;
  clientName: string;
  setClientName: (val: string) => void;
  clientPhone: string;
  setClientPhone: (val: string) => void;
  eventDate: string;
  setEventDate: (val: string) => void;
  eventType: string;
  setEventType: (val: string) => void;
  eventCity: string;
  setEventCity: (val: string) => void;
  onOpenProposal: () => void;
  onSaveQuote: () => void;
}

export const ScriptAndClosingSection: React.FC<ScriptAndClosingSectionProps> = ({
  environment,
  palette,
  selectedPackage,
  selectedAddons,
  totalPrice,
  floralType,
  clientName,
  setClientName,
  clientPhone,
  setClientPhone,
  eventDate,
  setEventDate,
  eventType,
  setEventType,
  eventCity,
  setEventCity,
  onOpenProposal,
  onSaveQuote,
}) => {
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const formattedPrice = `R$ ${totalPrice.toLocaleString('pt-BR')},00`;

  const floralDescription =
    floralType === 'permanente'
      ? 'Flores Permanentes Toque Real (Seda Premium)'
      : 'Flores Naturais Frescas da Estação';

  const scriptText = `“${
    clientName ? `Olá ${clientName}! ` : ''
  }Com base no seu espaço ${environment.name} (${environment.subtitle}), selecionei a paleta harmônica 60% ${
    palette.color60.name
  } + 30% ${palette.color30.name} + 10% ${
    palette.color10.name
  } com arranjos em ${floralDescription} para valorizar a iluminação do ambiente. A disposição em camadas piramidais garante que tudo fique visível nas fotos sem poluir o visual. O investimento para essa composição completa (${
    selectedPackage.name
  }${
    selectedAddons.length > 0
      ? ` com adicionais: ${selectedAddons.map((a) => a.name).join(', ')}`
      : ''
  }) é de ${formattedPrice}. Posso reservar a data para você agora com essa condição especial?”`;

  const cleanScriptForCopy = scriptText.replace(/^[“”"]|[“”"]$/g, '').trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanScriptForCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsAppSend = () => {
    const phoneDigits = clientPhone.replace(/\D/g, '');
    const cleanPhone = phoneDigits.length >= 10 ? (phoneDigits.startsWith('55') ? phoneDigits : `55${phoneDigits}`) : '';
    const encodedText = encodeURIComponent(
      `Olá! Aqui é da Bella_encant.\n\n${cleanScriptForCopy}\n\n*Condição garantida por 24 horas.*`
    );
    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`
      : `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(url, '_blank');
  };

  const handleSave = () => {
    onSaveQuote();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <section
      id="step-closing"
      className="flex flex-col gap-6 bg-surface-container-lowest rounded-2xl p-5 md:p-8 shadow-[0_8px_32px_-6px_rgba(100,70,50,0.06)] border border-outline-variant/30 relative"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-xs">
            <MessageSquare className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold">
              Script de Fechamento Instantâneo
            </h2>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Pronto para Enviar no WhatsApp ou Falar com o Cliente
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold self-start sm:self-auto flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Gerado em Tempo Real
        </span>
      </div>

      {/* Dynamic Parchment Box */}
      <div className="relative p-5 md:p-7 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-inner">
        <div className="flex items-center justify-between mb-3 text-on-surface-variant text-xs">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Fale exatamente assim com seu cliente ou copie direto para o WhatsApp:
          </span>
          {copied && (
            <span className="text-tertiary font-bold flex items-center gap-1 transition-opacity">
              <Check className="w-3.5 h-3.5" />
              Copiado com Sucesso!
            </span>
          )}
        </div>

        <p className="font-serif text-base sm:text-lg md:text-xl text-on-surface leading-relaxed">
          {clientName && (
            <span className="font-sans font-bold text-primary mr-1">“Olá {clientName}!</span>
          )}
          {!clientName && <span>“</span>}
          Com base no seu espaço{' '}
          <span className="px-2 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed font-sans text-xs sm:text-sm font-bold mx-1">
            {environment.name} / {environment.subtitle}
          </span>
          , selecionei a paleta harmônica{' '}
          <span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-sans text-xs sm:text-sm font-bold mx-1">
            60% {palette.color60.name} + 30% {palette.color30.name} + 10% {palette.color10.name}
          </span>{' '}
          para valorizar a iluminação do ambiente. A disposição em camadas piramidais garante que
          tudo fique visível nas fotos sem poluir o visual. O investimento para essa composição
          completa (
          <span className="font-bold text-primary">{selectedPackage.name}</span>
          {selectedAddons.length > 0 && (
            <span className="text-xs text-on-surface-variant font-sans">
              {' '}
              + {selectedAddons.length} adicional(is)
            </span>
          )}
          ) é de{' '}
          <span className="px-2 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-sans text-xs sm:text-sm font-bold mx-1">
            {formattedPrice}
          </span>
          . Posso reservar a data para você agora com essa condição especial?”
        </p>

        <div className="mt-4 pt-3 flex flex-wrap items-center gap-3 border-t border-outline-variant/20 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1 font-semibold text-secondary">
            <Clock className="w-3.5 h-3.5" />
            Gatilho de Reserva:
          </span>
          <span>
            Validade do bônus de montagem por <strong>24 horas</strong>
          </span>
        </div>
      </div>

      {/* Client Quick Form (Name, Phone, Date, Type) */}
      <div className="p-5 rounded-2xl bg-surface-container-high/40 border border-outline-variant/30 flex flex-col gap-3">
        <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Personalizar Proposta &amp; Envio:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Client Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-on-surface-variant uppercase flex items-center gap-1">
              <User className="w-3 h-3 text-secondary" />
              Nome do Cliente / Noiva:
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ex: Mariana Silva"
              className="w-full px-3 py-2 rounded-xl text-xs md:text-sm bg-surface-container-lowest border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-on-surface-variant uppercase flex items-center gap-1">
              <Phone className="w-3 h-3 text-secondary" />
              WhatsApp:
            </label>
            <input
              type="text"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Ex: (11) 98765-4321"
              className="w-full px-3 py-2 rounded-xl text-xs md:text-sm bg-surface-container-lowest border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Event Date */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-on-surface-variant uppercase flex items-center gap-1">
              <Calendar className="w-3 h-3 text-secondary" />
              Data do Evento:
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs md:text-sm bg-surface-container-lowest border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Event Type */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-on-surface-variant uppercase flex items-center gap-1">
              <PartyPopper className="w-3 h-3 text-secondary" />
              Tipo de Evento:
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs md:text-sm bg-surface-container-lowest border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="Casamento">Casamento</option>
              <option value="Mini Wedding">Mini Wedding</option>
              <option value="Aniversário de 15 Anos">Aniversário de 15 Anos</option>
              <option value="Aniversário Adulto">Aniversário Adulto</option>
              <option value="Chá de Bebê / Revelação">Chá de Bebê / Revelação</option>
              <option value="Batizado">Batizado</option>
              <option value="Evento Corporativo VIP">Evento Corporativo VIP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons Deck */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
        {/* Save in History */}
        <button
          onClick={handleSave}
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-xs md:text-sm font-semibold hover:bg-surface-container transition-all cursor-pointer"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-tertiary" />
              <span className="text-tertiary">Orçamento Salvo!</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4 text-secondary" />
              <span>Salvar no Histórico</span>
            </>
          )}
        </button>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-container-high text-on-surface text-xs md:text-sm font-semibold hover:bg-surface-variant transition-all cursor-pointer"
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? 'Copiado!' : 'Copiar Script'}</span>
        </button>

        {/* WhatsApp Direct Action */}
        <button
          onClick={handleWhatsAppSend}
          type="button"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs md:text-sm font-bold hover:bg-[#20BD5A] transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Fazer Orçamento via Zap</span>
        </button>

        {/* PDF / 1-Click Proposal Modal */}
        <button
          onClick={onOpenProposal}
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary-fixed text-on-secondary-fixed text-xs md:text-sm font-semibold hover:bg-secondary-fixed-dim transition-all cursor-pointer shadow-xs"
        >
          <FileText className="w-4 h-4" />
          <span>Proposta em 1 Clique</span>
        </button>
      </div>
    </section>
  );
};
