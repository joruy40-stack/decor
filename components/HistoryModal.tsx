'use client';

import React from 'react';
import { X, Trash2, RotateCcw, Calendar, User, DollarSign, History, Layers } from 'lucide-react';
import { SavedQuote } from '@/lib/decor-data';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: SavedQuote[];
  onLoadQuote: (quote: SavedQuote) => void;
  onDeleteQuote: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  quotes,
  onLoadQuote,
  onDeleteQuote,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-2xl border border-outline-variant/30 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-on-surface">
                Histórico de Orçamentos
              </h3>
              <p className="text-xs text-on-surface-variant">
                {quotes.length} orçamento(s) express salvo(s) nesta sessão
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quotes List */}
        <div className="mt-5 max-h-[60vh] overflow-y-auto flex flex-col gap-3 pr-1">
          {quotes.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-2 text-on-surface-variant">
              <Layers className="w-10 h-10 stroke-[1.5] text-outline" />
              <p className="text-sm font-medium">Nenhum orçamento salvo ainda.</p>
              <p className="text-xs">
                Utilize o botão &ldquo;Salvar no Histórico&rdquo; no final da página para guardar propostas.
              </p>
            </div>
          ) : (
            quotes.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-outline-variant/40 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-semibold text-base text-on-surface">
                      {q.clientName || 'Cliente Sem Nome'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                      {q.eventType}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-on-surface-variant">
                    <span>{q.environmentName}</span>
                    <span>•</span>
                    <span>{q.packageName}</span>
                    <span>•</span>
                    <span className="font-bold text-primary">
                      R$ {q.totalPrice.toLocaleString('pt-BR')},00
                    </span>
                  </div>
                  <span className="text-[10px] text-outline">
                    Salvo em: {new Date(q.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onLoadQuote(q);
                      onClose();
                    }}
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Carregar</span>
                  </button>
                  <button
                    onClick={() => onDeleteQuote(q.id)}
                    type="button"
                    className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-surface-variant transition-colors cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {quotes.length > 0 && (
          <div className="flex justify-between items-center mt-5 pt-4 border-t border-outline-variant/20">
            <button
              onClick={onClearAll}
              className="text-xs text-error font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Todo o Histórico</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-variant transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
