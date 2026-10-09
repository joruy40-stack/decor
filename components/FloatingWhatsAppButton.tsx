'use client';

import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, X, Check, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { EnvironmentOption, PalettePreset, PackageOption, AddonOption, FloralType } from '@/lib/decor-data';

interface FloatingWhatsAppButtonProps {
  environment: EnvironmentOption;
  palette: PalettePreset;
  selectedPackage: PackageOption;
  selectedAddons: AddonOption[];
  totalPrice: number;
  floralType: FloralType;
  clientName: string;
  clientPhone: string;
  eventDate: string;
  eventType: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  environment,
  palette,
  selectedPackage,
  selectedAddons,
  totalPrice,
  floralType,
  clientName,
  clientPhone,
  eventDate,
  eventType,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formattedPrice = `R$ ${totalPrice.toLocaleString('pt-BR')},00`;
  const floralDescription =
    floralType === 'permanente'
      ? 'Flores Permanentes Toque Real (Seda Premium)'
      : 'Flores Naturais Frescas da Estação';

  const generateWhatsAppMessage = () => {
    return (
      `*SOLICITAÇÃO DE ORÇAMENTO EXPRESS • BELLA_ENCANT*\n\n` +
      `Olá, gostaria de fechar meu orçamento para meu evento:\n\n` +
      `• *Cliente:* ${clientName || 'Cliente'}\n` +
      `• *Tipo de Evento:* ${eventType}\n` +
      `• *Data:* ${eventDate || 'A definir'}\n` +
      `• *Espaço / Local:* ${environment.name} (${environment.subtitle})\n` +
      `• *Paleta 60-30-10:* ${palette.name}\n` +
      `• *Acabamento Floral:* ${floralDescription}\n` +
      `• *Pacote Selecionado:* ${selectedPackage.name}\n` +
      (selectedAddons.length > 0
        ? `• *Adicionais:* ${selectedAddons.map((a) => a.name).join(', ')}\n`
        : '') +
      `\n💰 *Investimento Estimado:* ${formattedPrice}\n\n` +
      `Gostaria de verificar a disponibilidade da data e garantir a condição com bônus de 24h!`
    );
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    const phoneDigits = clientPhone.replace(/\D/g, '');
    const cleanPhone =
      phoneDigits.length >= 10
        ? phoneDigits.startsWith('55')
          ? phoneDigits
          : `55${phoneDigits}`
        : '';

    // If client provided their number, open with their number or direct WhatsApp link
    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;

    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden">
      {/* Popover Preview Card */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl bg-surface-container-lowest p-5 shadow-2xl border border-outline-variant/30 animate-in fade-in slide-in-from-bottom-5 duration-200 text-left flex flex-col gap-3">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-[#25D366]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm text-on-surface">
                  Orçamento via Zap
                </span>
                <span className="text-[10px] text-on-surface-variant font-medium">
                  Atendimento em até 1 minuto
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Summary Pill Box */}
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Espaço:</span>
              <span className="font-semibold text-on-surface truncate">{environment.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Paleta:</span>
              <span className="font-semibold text-primary truncate">{palette.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Flores:</span>
              <span className="font-semibold text-on-surface">
                {floralType === 'permanente' ? 'Permanente Toque Real' : 'Naturais Frescas'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Pacote:</span>
              <span className="font-semibold text-on-surface">{selectedPackage.name}</span>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t border-outline-variant/20">
              <span className="font-bold text-on-surface">Total Previsto:</span>
              <span className="font-serif font-bold text-sm text-primary">{formattedPrice}</span>
            </div>
          </div>

          <div className="text-[11px] text-on-surface-variant flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <span>Condição com bônus de montagem travada por 24h.</span>
          </div>

          {/* Big Action Button */}
          <button
            onClick={handleOpenWhatsApp}
            type="button"
            className="w-full py-3 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold hover:bg-[#20BD5A] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Fazer Orçamento no Zap Agora</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        <button
          onClick={() => {
            if (!isOpen) {
              handleOpenWhatsApp();
            } else {
              setIsOpen(false);
            }
          }}
          type="button"
          className="flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20BD5A] transition-all active:scale-95 cursor-pointer relative"
          title="Fazer Orçamento via WhatsApp"
        >
          {/* Subtle Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

          <MessageCircle className="w-6 h-6 fill-white shrink-0 relative z-10" />
          <div className="flex flex-col text-left relative z-10 pr-0.5">
            <span className="text-xs font-bold leading-tight">Orçamento no Zap</span>
            <span className="text-[10px] text-white/90 leading-tight hidden sm:inline">
              Resposta em 1 min
            </span>
          </div>
        </button>

        {/* Small Expand Option Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface shadow-md flex items-center justify-center hover:bg-surface-container-high transition-colors border border-outline-variant/30 text-xs font-bold"
          title={isOpen ? 'Fechar detalhes' : 'Ver resumo do orçamento'}
        >
          {isOpen ? <X className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-secondary" />}
        </button>
      </div>
    </div>
  );
};
