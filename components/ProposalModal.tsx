'use client';

import React from 'react';
import { X, Printer, Send, Sparkles, CheckCircle2, ShieldCheck, Calendar, MapPin, User, MessageCircle } from 'lucide-react';
import { EnvironmentOption, PalettePreset, PackageOption, AddonOption, FloralType } from '@/lib/decor-data';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
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
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const floralLabel =
    floralType === 'permanente'
      ? 'Flores Permanentes Toque Real (Seda Premium)'
      : 'Flores Naturais Frescas da Estação';

  const handleShareWhatsApp = () => {
    const text = `*PROPOSTA COMERCIAL • BELLA_ENCANT*\n\n` +
      `Cliente: ${clientName || 'Cliente Especial'}\n` +
      `Evento: ${eventType}\n` +
      `Data: ${eventDate || 'A definir'}\n` +
      `Ambiente: ${environment.name} (${environment.subtitle})\n\n` +
      `*PALETA 60-30-10:* ${palette.name}\n` +
      `• 60% Dominante: ${palette.color60.name}\n` +
      `• 30% Secundária: ${palette.color30.name}\n` +
      `• 10% Acento: ${palette.color10.name}\n\n` +
      `*ACABAMENTO FLORAL:* ${floralLabel}\n\n` +
      `*PACOTE ESCOLHIDO:* ${selectedPackage.name}\n` +
      (selectedAddons.length > 0
        ? `Adicionais: ${selectedAddons.map((a) => `${a.name} (+R$ ${a.price},00)`).join(', ')}\n`
        : '') +
      `\n*INVESTIMENTO TOTAL:* R$ ${totalPrice.toLocaleString('pt-BR')},00\n` +
      `Condição especial garantida por 24 horas.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const proposalCode = `BE-${(Math.abs((totalPrice * 31) % 9000) + 1000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-3xl p-6 md:p-10 shadow-2xl border border-outline-variant/30 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors print:hidden cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Proposal Document */}
        <div className="flex flex-col gap-6" id="printable-proposal">
          {/* Document Header */}
          <div className="flex items-start justify-between pb-5 border-b border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-serif text-2xl font-bold shadow-sm">
                BE
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-primary font-semibold">
                  Bella_encant
                </span>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                  Proposta Cenográfica &amp; Fechamento 60s
                </span>
              </div>
            </div>

            <div className="text-right flex flex-col text-xs text-on-surface-variant">
              <span className="font-bold text-on-surface">Proposta Nº {proposalCode}</span>
              <span>Emissão: {new Date().toLocaleDateString('pt-BR')}</span>
              <span className="text-secondary font-semibold">Validade: 24 Horas</span>
            </div>
          </div>

          {/* Client & Event Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs">
            <div className="flex flex-col">
              <span className="font-bold text-on-surface-variant uppercase text-[10px]">Cliente:</span>
              <span className="font-semibold text-on-surface truncate">{clientName || 'Cliente Especial'}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface-variant uppercase text-[10px]">Celebração:</span>
              <span className="font-semibold text-on-surface">{eventType}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface-variant uppercase text-[10px]">Data:</span>
              <span className="font-semibold text-on-surface">{eventDate || 'A definir'}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface-variant uppercase text-[10px]">Ambiente:</span>
              <span className="font-semibold text-on-surface truncate">{environment.name}</span>
            </div>
          </div>

          {/* Harmonia 60-30-10 Blueprint */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Paleta Harmônica 60-30-10 Aprovada: {palette.name}
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-1 bg-surface-container-lowest">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-on-surface uppercase">60% Base</span>
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: palette.color60.hex }}
                  />
                </div>
                <span className="font-semibold text-xs text-primary">{palette.color60.name}</span>
                <span className="text-[10px] text-on-surface-variant line-clamp-2">{palette.color60.role}</span>
              </div>

              <div className="p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-1 bg-surface-container-lowest">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-on-surface uppercase">30% Secundária</span>
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: palette.color30.hex }}
                  />
                </div>
                <span className="font-semibold text-xs text-primary">{palette.color30.name}</span>
                <span className="text-[10px] text-on-surface-variant line-clamp-2">{palette.color30.role}</span>
              </div>

              <div className="p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-1 bg-surface-container-lowest">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-on-surface uppercase">10% Acento</span>
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: palette.color10.hex }}
                  />
                </div>
                <span className="font-semibold text-xs text-primary">{palette.color10.name}</span>
                <span className="text-[10px] text-on-surface-variant line-clamp-2">{palette.color10.role}</span>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary uppercase">{selectedPackage.badge}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
                    {floralType === 'permanente' ? '🌸 Flores Permanentes Toque Real' : '🌿 Flores Naturais Frescas'}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-semibold text-on-surface">
                  {selectedPackage.name}
                </h4>
              </div>
              <span className="font-serif text-xl font-bold text-primary">
                R$ {(floralType === 'permanente' ? selectedPackage.pricePermanente : selectedPackage.priceNatural).toLocaleString('pt-BR')},00
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20 text-xs">
              {selectedPackage.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-1.5 text-on-surface">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Addons if any */}
          {selectedAddons.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Adicionais Personalizados:
              </span>
              <div className="flex flex-col gap-1.5 text-xs">
                {selectedAddons.map((ad) => (
                  <div
                    key={ad.id}
                    className="flex justify-between items-center p-2 rounded-lg bg-surface-container-low border border-outline-variant/20"
                  >
                    <span>{ad.name}</span>
                    <span className="font-bold text-primary">+ R$ {ad.price},00</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total Investment & Guarantee */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-primary text-on-primary shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-secondary-fixed" />
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Investimento Cenográfico Total:
                </span>
                <span className="text-[10px] text-on-primary/80">
                  Valores congelados mediante confirmação imediata
                </span>
              </div>
            </div>
            <span className="font-serif text-2xl md:text-3xl font-bold">
              R$ {totalPrice.toLocaleString('pt-BR')},00
            </span>
          </div>

          {/* Footer Notes */}
          <div className="text-[11px] text-on-surface-variant flex flex-col gap-1 border-t border-outline-variant/20 pt-3">
            <span>• Método de montagem com Técnica Pirâmide Cenográfica e respiro áureo de 5cm.</span>
            <span>• Bônus especial de consultoria de mesa e harmonização fotográfica incluso por 24h.</span>
            <span className="font-semibold text-secondary">• Bella_encant — Cenografia de Alto Padrão em 60s.</span>
          </div>
        </div>

        {/* Modal Action Controls (Hidden on Print) */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/20 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Fechar
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs md:text-sm font-semibold hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar PDF</span>
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs md:text-sm font-bold hover:bg-[#20BD5A] transition-all shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Fazer Orçamento no Zap</span>
          </button>
        </div>
      </div>
    </div>
  );
};
