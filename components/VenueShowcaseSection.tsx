'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  Video,
  Camera,
  CheckCircle2,
  Clock,
  Sparkles,
  Maximize2,
  Flower2,
  Layers,
  ChevronRight,
  Volume2,
  VolumeX,
  Music,
  Radio,
  Sliders,
} from 'lucide-react';
import { VENUE_SHOWCASES, VenueShowcaseItem, ENVIRONMENTS } from '@/lib/decor-data';

interface SoundtrackTrack {
  id: string;
  title: string;
  mood: string;
  emoji: string;
  audioUrl: string;
}

const SOUNDTRACKS: SoundtrackTrack[] = [
  {
    id: 'violino-romantico',
    title: 'Violino & Piano Romântico',
    mood: 'Casamentos & Alta Cenografia',
    emoji: '🎻',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  },
  {
    id: 'acustico-sunset',
    title: 'Acústico Boho & Pôr do Sol',
    mood: 'Jardim, Praia & Campo',
    emoji: '🎸',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3',
  },
  {
    id: 'lounge-champanhe',
    title: 'Lounge Champanhe & Bossa',
    mood: 'Salão Nobre & Noivados VIP',
    emoji: '🥂',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_73d2a70cb6.mp3',
  },
  {
    id: 'celebracao-moderna',
    title: 'Celebração Vibrante & 15 Anos',
    mood: 'Festas Jovens & Contemporâneas',
    emoji: '✨',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  },
];

interface VenueShowcaseSectionProps {
  selectedEnvId: string;
  onSelectEnvironment: (envId: string) => void;
}

export const VenueShowcaseSection: React.FC<VenueShowcaseSectionProps> = ({
  selectedEnvId,
  onSelectEnvironment,
}) => {
  const [activeShowcaseId, setActiveShowcaseId] = useState<string>(
    () => `showcase-${selectedEnvId}`
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  // Music Soundtrack State
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentShowcase: VenueShowcaseItem =
    VENUE_SHOWCASES.find((s) => s.id === activeShowcaseId) ||
    VENUE_SHOWCASES.find((s) => s.envId === selectedEnvId) ||
    VENUE_SHOWCASES[0];

  const currentTrack = SOUNDTRACKS[selectedTrackIndex];

  // Handle play / pause audio
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {
          // auto-play restriction fallback
        });
    }
  };

  const handleSelectTrack = (index: number) => {
    setSelectedTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = SOUNDTRACKS[index].audioUrl;
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    }
  };

  const handleStartTourWithMusic = () => {
    setIsPlayingVideo(true);
    // Start audio together with video
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    }
  };

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleSelectEnvShowcase = (envId: string) => {
    setActiveShowcaseId(`showcase-${envId}`);
    setSelectedPhotoIndex(0);
    setIsPlayingVideo(false);
    onSelectEnvironment(envId);
  };

  return (
    <section
      id="step-showcase"
      className="flex flex-col gap-6 bg-surface-container-lowest rounded-2xl p-5 md:p-8 shadow-[0_4px_24px_-4px_rgba(100,70,50,0.05)] border border-outline-variant/30 relative overflow-hidden"
    >
      {/* Hidden Audio Element with Loop */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        loop
        preload="auto"
        onEnded={() => setIsMusicPlaying(false)}
      />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-12 -left-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              Galeria de Cenografia Real
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              | Fotos em Alta Resolução, Vídeos &amp; Trilha Sonora
            </span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl text-on-surface font-semibold tracking-tight">
            Veja Como Fica o Local Montado na Prática
          </h2>

          <p className="text-xs md:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Assista aos mini-tours em vídeo com música ambiente cenográfica, confira a harmonia
            das flores (permanentes toque real e naturais frescas) e a iluminação nos locais reais.
          </p>
        </div>

        {/* Environment Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {ENVIRONMENTS.map((env) => {
            const isSelected = currentShowcase.envId === env.id;
            return (
              <button
                key={env.id}
                type="button"
                onClick={() => handleSelectEnvShowcase(env.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
                }`}
              >
                <span>{env.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Showcase Grid: Video / Hero Photo (Left) + Gallery & Specs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        {/* Left Col: High Impact Video & Hero View (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden bg-black/90 shadow-lg border border-outline-variant/30 group">
            {/* If video playing, render HTML5 video; otherwise photo */}
            {isPlayingVideo ? (
              <video
                ref={videoRef}
                src={currentShowcase.videoUrl}
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <Image
                  src={
                    selectedPhotoIndex === 0
                      ? currentShowcase.mainPhoto
                      : currentShowcase.galleryPhotos[selectedPhotoIndex - 1] ||
                        currentShowcase.mainPhoto
                  }
                  alt={currentShowcase.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-6 text-white z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {currentShowcase.subtitle}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight drop-shadow-sm">
                    {currentShowcase.title}
                  </h3>
                  <p className="text-xs text-white/90 line-clamp-2 mt-1 leading-relaxed">
                    {currentShowcase.description}
                  </p>
                </div>

                {/* Big Play Tour Button Overlay */}
                <button
                  type="button"
                  onClick={handleStartTourWithMusic}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-primary transition-all cursor-pointer backdrop-blur-xs group/btn z-20"
                  title="Assistir Vídeo Tour com Trilha Musical"
                >
                  <Play className="w-7 h-7 ml-1 fill-white" />
                </button>
              </>
            )}

            {/* Top Indicator Pills Deck (Video Status & Music Badge) */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
              {/* Music Live Sound Indicator */}
              <button
                type="button"
                onClick={toggleMusic}
                className="pointer-events-auto px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md text-[11px] font-semibold flex items-center gap-2 border border-white/10 transition-all cursor-pointer"
                title={isMusicPlaying ? 'Pausar música do vídeo' : 'Tocar música de fundo'}
              >
                {isMusicPlaying ? (
                  <>
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-3 bg-[#25D366] animate-pulse" />
                      <span className="w-0.5 h-2 bg-[#25D366] animate-bounce" />
                      <span className="w-0.5 h-3.5 bg-[#25D366] animate-pulse" />
                      <span className="w-0.5 h-1.5 bg-[#25D366] animate-bounce" />
                    </div>
                    <span className="text-[#25D366] font-bold">Música Ativa</span>
                  </>
                ) : (
                  <>
                    <Music className="w-3.5 h-3.5 text-white/80" />
                    <span>Ligar Música</span>
                  </>
                )}
              </button>

              {/* Video Badge */}
              <div className="px-3 py-1 rounded-full bg-black/70 text-white backdrop-blur-md text-[11px] font-semibold flex items-center gap-1.5 border border-white/10">
                <Video className="w-3 h-3 text-primary-fixed" />
                <span>{isPlayingVideo ? 'Vídeo em Reprodução' : 'Vídeo Tour & Fotos'}</span>
              </div>
            </div>

            {/* Bottom Overlay Sound Control Bar (When Video Playing) */}
            {isPlayingVideo && (
              <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3 text-white z-20">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={toggleMusic}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    title={isMusicPlaying ? 'Pausar Música' : 'Tocar Música'}
                  >
                    {isMusicPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white" />
                    )}
                  </button>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold truncate">
                      {currentTrack.emoji} {currentTrack.title}
                    </span>
                    <span className="text-[9px] text-white/70 truncate">{currentTrack.mood}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                    title={isMuted ? 'Desmutar' : 'Mutar'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-primary-fixed" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-16 h-1 accent-primary bg-white/30 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Interactive Soundtrack Selector Row */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4 text-primary" />
                Trilha Sonora Cenográfica dos Vídeos:
              </span>
              <button
                type="button"
                onClick={toggleMusic}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                {isMusicPlaying ? 'Pausar Som' : 'Tocar Agora'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SOUNDTRACKS.map((track, idx) => {
                const isActive = selectedTrackIndex === idx;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleSelectTrack(idx)}
                    className={`p-2 rounded-lg text-left transition-all border cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-primary text-on-primary border-primary shadow-xs ring-1 ring-primary'
                        : 'bg-surface-container-high/60 text-on-surface hover:bg-surface-container border-outline-variant/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs">{track.emoji}</span>
                      {isActive && isMusicPlaying && (
                        <div className="flex items-end gap-0.5 h-2.5">
                          <span className="w-0.5 h-2.5 bg-white animate-pulse" />
                          <span className="w-0.5 h-1.5 bg-white animate-bounce" />
                          <span className="w-0.5 h-2 bg-white animate-pulse" />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-bold leading-tight line-clamp-1">
                      {track.title}
                    </span>
                    <span
                      className={`text-[9px] leading-tight truncate mt-0.5 ${
                        isActive ? 'text-white/80' : 'text-on-surface-variant'
                      }`}
                    >
                      {track.mood}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Media Thumbnails Switcher */}
          <div className="grid grid-cols-4 gap-2">
            {/* Thumbnail 0: Video / Main Photo */}
            <button
              type="button"
              onClick={() => {
                handleStartTourWithMusic();
              }}
              className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                isPlayingVideo
                  ? 'border-primary shadow-md ring-2 ring-primary/40'
                  : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <Image
                src={currentShowcase.mainPhoto}
                alt="Miniatura vídeo"
                fill
                sizes="120px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white z-10">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/70 px-1 rounded z-20">
                VÍDEO
              </span>
            </button>

            {/* Thumbnails 1, 2, 3: Photos */}
            {currentShowcase.galleryPhotos.map((photoUrl, idx) => {
              const isSelected = !isPlayingVideo && selectedPhotoIndex === idx + 1;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsPlayingVideo(false);
                    setSelectedPhotoIndex(idx + 1);
                  }}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary shadow-md ring-2 ring-primary/40'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={photoUrl}
                    alt={`Foto detalhe ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/70 px-1 rounded z-20">
                    FOTO {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Technical Setup Specs & Floral Comparison (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Setup Specifications Card */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-3">
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" />
              Ficha Técnica Destaque:
            </span>

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  Tempo Médio de Montagem:
                </span>
                <span className="font-bold text-on-surface">{currentShowcase.setupTime}</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-secondary" />
                  Formato da Mesa no Espaço:
                </span>
                <span className="font-bold text-on-surface">{currentShowcase.tableFormat}</span>
              </div>

              <div className="flex flex-col gap-1 pt-1">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Flower2 className="w-3.5 h-3.5 text-primary" />
                  Diretriz Floral Aplicada:
                </span>
                <span className="font-medium text-primary text-xs leading-relaxed bg-surface-container p-2.5 rounded-lg border border-outline-variant/20">
                  {currentShowcase.floralNote}
                </span>
              </div>
            </div>

            {/* Highlights Chips */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentShowcase.highlights.map((hl, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface text-[11px] font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                  <span>{hl}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Quick Setup Guarantee */}
          <div className="p-4 rounded-xl bg-primary-fixed/30 border border-primary/20 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Garantia Cenográfica Bella_encant
              </span>
              <span className="text-[11px] font-semibold text-secondary">
                100% de Aprovação Fotográfica
              </span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed">
              Cada suporte é ajustado para que o bolo, doces e arranjos fiquem visíveis tanto nos
              vídeos de reels em movimento quanto nas fotos posadas dos convidados.
            </p>
          </div>

          {/* CTA to use this venue setup */}
          <button
            type="button"
            onClick={() => {
              onSelectEnvironment(currentShowcase.envId);
              const el = document.getElementById('step-budget');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3.5 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-semibold hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Montar Meu Orçamento para {currentShowcase.title.split('&')[0]}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
