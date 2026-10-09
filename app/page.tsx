'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { StopwatchBanner } from '@/components/StopwatchBanner';
import { EnvironmentStep } from '@/components/EnvironmentStep';
import { PaletteStep } from '@/components/PaletteStep';
import { PyramidStep } from '@/components/PyramidStep';
import { BudgetStep } from '@/components/BudgetStep';
import { VenueShowcaseSection } from '@/components/VenueShowcaseSection';
import { ScriptAndClosingSection } from '@/components/ScriptAndClosingSection';
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton';
import { ProposalModal } from '@/components/ProposalModal';
import { PaletteCatalogModal } from '@/components/PaletteCatalogModal';
import { HistoryModal } from '@/components/HistoryModal';
import {
  ENVIRONMENTS,
  PALETTES,
  PACKAGES,
  ADDONS,
  EnvironmentOption,
  PalettePreset,
  PackageOption,
  SavedQuote,
  FloralType,
} from '@/lib/decor-data';

export default function Home() {
  // State
  const [selectedEnvId, setSelectedEnvId] = useState<string>('salao');
  const [selectedPaletteKey, setSelectedPaletteKey] = useState<string>('ferrari');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('completo');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [floralType, setFloralType] = useState<FloralType>('permanente');

  // Client Details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventType, setEventType] = useState<string>('Casamento');
  const [eventCity, setEventCity] = useState<string>('');

  // Modals
  const [isProposalOpen, setIsProposalOpen] = useState<boolean>(false);
  const [isPaletteCatalogOpen, setIsPaletteCatalogOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<SavedQuote[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('bella_encant_quotes') || localStorage.getItem('atelier_express_quotes');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Stopwatch State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Timer interval effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev < 60) {
            return prev + 1;
          } else {
            setTimerRunning(false);
            return 60;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  // Active milestone calculation
  const getActiveMilestone = () => {
    if (timerSeconds <= 5) return 1;
    if (timerSeconds <= 15) return 2;
    if (timerSeconds <= 40) return 3;
    return 4;
  };

  const handleToggleTimer = () => {
    setTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  const handleScrollToStep = (stepId: string) => {
    const el = document.getElementById(stepId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartExpress = () => {
    setTimerSeconds(0);
    setTimerRunning(true);
    handleScrollToStep('step-env');
  };

  const handleSelectMilestone = (index: number) => {
    const stepIds = ['step-env', 'step-palette', 'step-pyramid', 'step-budget'];
    const targetId = stepIds[index - 1];
    if (targetId) {
      handleScrollToStep(targetId);
    }
  };

  // Environment Selection (also suggests matching palette preset)
  const handleSelectEnvironment = (env: EnvironmentOption) => {
    setSelectedEnvId(env.id);
    if (PALETTES[env.defaultPreset]) {
      setSelectedPaletteKey(env.defaultPreset);
    }
  };

  // Addon Toggling
  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Selected Entities
  const currentEnv =
    ENVIRONMENTS.find((e) => e.id === selectedEnvId) || ENVIRONMENTS[1];
  const currentPalette =
    PALETTES[selectedPaletteKey] || PALETTES['salao'];
  const currentPackage =
    PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[1];
  const currentAddons = ADDONS.filter((a) => selectedAddonIds.includes(a.id));

  // Total Price Calculation with Floral Type
  const packageBasePrice =
    floralType === 'permanente' ? currentPackage.pricePermanente : currentPackage.priceNatural;
  const addonsTotal = currentAddons.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = packageBasePrice + addonsTotal;

  // Save Quote to localStorage
  const handleSaveQuote = () => {
    const newQuote: SavedQuote = {
      id: String(Date.now()),
      clientName: clientName || 'Cliente Sem Nome',
      clientPhone,
      eventDate,
      eventType,
      environmentName: currentEnv.name,
      paletteName: currentPalette.name,
      packageName: currentPackage.name,
      floralType,
      floralLabel:
        floralType === 'permanente'
          ? 'Flores Permanentes Toque Real'
          : 'Flores Naturais Frescas',
      totalPrice,
      addons: currentAddons.map((a) => a.name),
      createdAt: new Date().toISOString(),
    };

    const updated = [newQuote, ...quotes];
    setQuotes(updated);
    try {
      localStorage.setItem('bella_encant_quotes', JSON.stringify(updated));
    } catch {
      // storage quota
    }
  };

  const handleLoadQuote = (quote: SavedQuote) => {
    setClientName(quote.clientName === 'Cliente Sem Nome' ? '' : quote.clientName);
    setClientPhone(quote.clientPhone || '');
    setEventDate(quote.eventDate || '');
    setEventType(quote.eventType || 'Casamento');
    if (quote.floralType) {
      setFloralType(quote.floralType);
    }

    const matchedEnv = ENVIRONMENTS.find((e) => e.name === quote.environmentName);
    if (matchedEnv) setSelectedEnvId(matchedEnv.id);

    const matchedPkg = PACKAGES.find((p) => p.name === quote.packageName);
    if (matchedPkg) setSelectedPackageId(matchedPkg.id);

    const matchedPaletteEntry = Object.entries(PALETTES).find(
      ([, p]) => p.name === quote.paletteName
    );
    if (matchedPaletteEntry) setSelectedPaletteKey(matchedPaletteEntry[0]);

    const matchedAddonIds = ADDONS.filter((a) => quote.addons.includes(a.name)).map(
      (a) => a.id
    );
    setSelectedAddonIds(matchedAddonIds);
  };

  const handleDeleteQuote = (id: string) => {
    const updated = quotes.filter((q) => q.id !== id);
    setQuotes(updated);
    try {
      localStorage.setItem('bella_encant_quotes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleClearAllQuotes = () => {
    setQuotes([]);
    try {
      localStorage.removeItem('bella_encant_quotes');
      localStorage.removeItem('atelier_express_quotes');
    } catch {
      // ignore
    }
  };

  const handleWhatsAppQuote = () => {
    const floralDesc =
      floralType === 'permanente'
        ? 'Flores Permanentes Toque Real (Seda Premium)'
        : 'Flores Naturais Frescas da Estação';

    const text = encodeURIComponent(
      `*SOLICITAÇÃO DE ORÇAMENTO • BELLA_ENCANT*\n\n` +
      `Olá! Gostaria de receber um orçamento para o meu evento:\n\n` +
      `• *Cliente:* ${clientName || 'Cliente'}\n` +
      `• *Celebração:* ${eventType}\n` +
      `• *Data:* ${eventDate || 'A definir'}\n` +
      `• *Espaço / Local:* ${currentEnv.name} (${currentEnv.subtitle})\n` +
      `• *Paleta 60-30-10:* ${currentPalette.name}\n` +
      `• *Acabamento Floral:* ${floralDesc}\n` +
      `• *Pacote Selecionado:* ${currentPackage.name}\n` +
      (currentAddons.length > 0
        ? `• *Adicionais:* ${currentAddons.map((a) => a.name).join(', ')}\n`
        : '') +
      `\n💰 *Total Estimado:* R$ ${totalPrice.toLocaleString('pt-BR')},00\n\n` +
      `Gostaria de verificar a data e garantir a condição com bônus de 24 horas!`
    );

    const phoneDigits = clientPhone.replace(/\D/g, '');
    const cleanPhone =
      phoneDigits.length >= 10
        ? phoneDigits.startsWith('55')
          ? phoneDigits
          : `55${phoneDigits}`
        : '';

    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;

    window.open(url, '_blank');
  };

  const handleResetAll = () => {
    setSelectedEnvId('salao');
    setSelectedPaletteKey('ferrari');
    setSelectedPackageId('completo');
    setSelectedAddonIds([]);
    setFloralType('permanente');
    setClientName('');
    setClientPhone('');
    setEventDate('');
    setEventType('Casamento');
    setTimerSeconds(0);
    setTimerRunning(false);
    handleScrollToStep('step-hero');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Top Navigation */}
      <Navbar
        onOpenPaletteCatalog={() => setIsPaletteCatalogOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onResetAll={handleResetAll}
        onScrollToStep={handleScrollToStep}
        onWhatsAppQuote={handleWhatsAppQuote}
        quoteCount={quotes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-24 pb-16">
        <div className="relative w-full overflow-hidden bg-background">
          {/* Subtle Background Aura Lights */}
          <div className="pointer-events-none absolute -top-40 right-0 w-[580px] h-[580px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="pointer-events-none absolute top-96 -left-32 w-[460px] h-[460px] rounded-full bg-secondary/8 blur-[100px]" />

          {/* Core App Container */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-6 flex flex-col gap-8">
            {/* HERO / STOPWATCH EXPRESS BANNER */}
            <StopwatchBanner
              timerSeconds={timerSeconds}
              timerRunning={timerRunning}
              onToggleTimer={handleToggleTimer}
              onResetTimer={handleResetTimer}
              onStartExpress={handleStartExpress}
              onWhatsAppQuote={handleWhatsAppQuote}
              activeMilestone={getActiveMilestone()}
              onSelectMilestone={handleSelectMilestone}
            />

            {/* TWO COLUMN WORKBENCH: STEPS 1 & 2 (LEFT, 7 COLS) | STEP 3 (RIGHT, 5 COLS) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Etapa 1 (Entorno) + Etapa 2 (Paleta 60-30-10) */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* ETAPA 1: SELETOR DE AMBIENTE */}
                <EnvironmentStep
                  selectedEnvId={selectedEnvId}
                  onSelectEnvironment={handleSelectEnvironment}
                />

                {/* ETAPA 2: REGRA 60-30-10 DE HARMONIA */}
                <PaletteStep
                  currentPalette={currentPalette}
                  onSelectPalette={(key) => setSelectedPaletteKey(key)}
                  onOpenPaletteCatalog={() => setIsPaletteCatalogOpen(true)}
                />
              </div>

              {/* Right Column: Etapa 3 (Técnica Pirâmide Visual + Mini Visualizador de Mesa) */}
              <div className="lg:col-span-5 h-full">
                <PyramidStep currentPalette={currentPalette} floralType={floralType} />
              </div>
            </div>

            {/* GALERIA & VÍDEOS: EXEMPLOS REAIS DO LOCAL MONTADO */}
            <VenueShowcaseSection
              selectedEnvId={selectedEnvId}
              onSelectEnvironment={(envId) => setSelectedEnvId(envId)}
            />

            {/* ETAPA 4: QUICK-BUDGET & SELEÇÃO DE PACOTES (PERMANENTE VS NATURAL) */}
            <BudgetStep
              selectedPackageId={selectedPackageId}
              onSelectPackage={(pkg) => setSelectedPackageId(pkg.id)}
              selectedAddonIds={selectedAddonIds}
              onToggleAddon={handleToggleAddon}
              totalPrice={totalPrice}
              floralType={floralType}
              onSelectFloralType={setFloralType}
            />

            {/* ETAPA 5: SCRIPT DE FECHAMENTO DINÂMICO & WHATSAPP */}
            <ScriptAndClosingSection
              environment={currentEnv}
              palette={currentPalette}
              selectedPackage={currentPackage}
              selectedAddons={currentAddons}
              totalPrice={totalPrice}
              floralType={floralType}
              clientName={clientName}
              setClientName={setClientName}
              clientPhone={clientPhone}
              setClientPhone={setClientPhone}
              eventDate={eventDate}
              setEventDate={setEventDate}
              eventType={eventType}
              setEventType={setEventType}
              eventCity={eventCity}
              setEventCity={setEventCity}
              onOpenProposal={() => setIsProposalOpen(true)}
              onSaveQuote={handleSaveQuote}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low py-8 border-t border-outline-variant/30 print:hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold text-primary">Bella_encant</span>
            <span className="text-xs text-on-surface-variant">
              © 2025 Bella_encant • Decoração Express: Monte Sua Festa em 1 Minuto.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              Método Pirâmide &amp; Harmonia 60-30-10
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Trava de Orçamento 24h
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        environment={currentEnv}
        palette={currentPalette}
        selectedPackage={currentPackage}
        selectedAddons={currentAddons}
        totalPrice={totalPrice}
        floralType={floralType}
        clientName={clientName}
        clientPhone={clientPhone}
        eventDate={eventDate}
        eventType={eventType}
      />

      <PaletteCatalogModal
        isOpen={isPaletteCatalogOpen}
        onClose={() => setIsPaletteCatalogOpen(false)}
        selectedPaletteId={selectedPaletteKey}
        onSelectPalette={(key) => setSelectedPaletteKey(key)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        quotes={quotes}
        onLoadQuote={handleLoadQuote}
        onDeleteQuote={handleDeleteQuote}
        onClearAll={handleClearAllQuotes}
      />

      {/* Floating 1-Click WhatsApp Quote Trigger */}
      <FloatingWhatsAppButton
        environment={currentEnv}
        palette={currentPalette}
        selectedPackage={currentPackage}
        selectedAddons={currentAddons}
        totalPrice={totalPrice}
        floralType={floralType}
        clientName={clientName}
        clientPhone={clientPhone}
        eventDate={eventDate}
        eventType={eventType}
      />
    </div>
  );
}
