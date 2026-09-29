'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getQuotes, updateQuote, getAllOrders, updateOrderStatus } from '@/lib/firestore';
import type { QuoteRequest, Order } from '@/types';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types';
import { formatDate } from '@/lib/utils';
import { Loader2, Mail, Phone, FileText, CheckCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

type Tab = 'orcamentos' | 'pedidos';

export default function AdminDashboard() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('orcamentos');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) { router.push('/me/login'); return; }
      if (!profile?.isAdmin) { router.push('/me/pedidos'); return; }
    }
  }, [user, profile, loading, router]);

  useEffect(() => {
    if (profile?.isAdmin) {
      Promise.all([getQuotes(), getAllOrders()])
        .then(([q, o]) => { setQuotes(q); setOrders(o); })
        .finally(() => setLoadingData(false));
    }
  }, [profile]);

  const markQuoteAsSeen = async (id: string) => {
    await updateQuote(id, { status: 'visto' });
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: 'visto' } : q)));
    toast.success('Marcado como visto');
  };

  const changeOrderStatus = async (id: string, status: Order['status']) => {
    await updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success('Status atualizado');
  };

  if (loading || loadingData) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-[#2e7ec6]" /></div>;
  }

  if (!profile?.isAdmin) return null;

  const newQuotes = quotes.filter((q) => q.status === 'novo');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0f172a] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Painel Administrativo</p>
            <h1 className="font-extrabold text-xl">TraduzTudo Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            {newQuotes.length > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {newQuotes.length} novos orçamentos
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Orçamentos', value: quotes.length, color: 'text-blue-600' },
            { label: 'Novos', value: newQuotes.length, color: 'text-red-600' },
            { label: 'Pedidos', value: orders.length, color: 'text-purple-600' },
            { label: 'Em Tradução', value: orders.filter((o) => o.status === 'em_traducao').length, color: 'text-orange-600' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTab('orcamentos')}
            className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
              tab === 'orcamentos'
                ? 'border-[#2e7ec6] text-[#2e7ec6]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Orçamentos {newQuotes.length > 0 && <span className="ml-1 bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">{newQuotes.length}</span>}
          </button>
          <button
            onClick={() => setTab('pedidos')}
            className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
              tab === 'pedidos'
                ? 'border-[#2e7ec6] text-[#2e7ec6]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Pedidos
          </button>
        </div>

        {/* Quotes tab */}
        {tab === 'orcamentos' && (
          <div className="space-y-3">
            {quotes.length === 0 ? (
              <p className="text-gray-500 text-center py-12">Nenhum orçamento ainda.</p>
            ) : (
              quotes.map((q) => (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border p-5 ${q.status === 'novo' ? 'border-blue-200 shadow-md' : 'border-gray-100'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          q.status === 'novo' ? 'bg-blue-100 text-blue-700' :
                          q.status === 'visto' ? 'bg-gray-100 text-gray-600' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {q.status === 'novo' ? '🔴 Novo' : q.status === 'visto' ? 'Visto' : 'Cotado'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {q.createdAt instanceof Date
                            ? formatDate(q.createdAt)
                            : formatDate((q.createdAt as any).toDate())}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900">{q.fullName || 'Sem nome'}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Mail size={12} />{q.email}</span>
                        {q.whatsapp && <span className="flex items-center gap-1"><Phone size={12} />{q.whatsapp}</span>}
                      </div>
                      {q.fileNames && q.fileNames.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <FileText size={12} />
                          {q.fileNames.join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {q.status === 'novo' && (
                        <button
                          onClick={() => markQuoteAsSeen(q.id!)}
                          className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline"
                        >
                          <Eye size={14} /> Marcar visto
                        </button>
                      )}
                      <a
                        href={`https://wa.me/${q.whatsapp?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Orders tab */}
        {tab === 'pedidos' && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-12">Nenhum pedido ainda.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                        <span className="text-xs text-gray-400">#{order.id?.slice(-8).toUpperCase()}</span>
                      </div>
                      <h3 className="font-bold text-gray-900">{order.sourceLanguage} → {order.targetLanguage}</h3>
                      <p className="text-sm text-gray-500">{order.serviceType} — {order.documents.length} doc(s)</p>
                    </div>
                    <div className="shrink-0">
                      <select
                        value={order.status}
                        onChange={(e) => changeOrderStatus(order.id!, e.target.value as Order['status'])}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:border-[#2e7ec6] transition-colors"
                      >
                        {Object.entries(ORDER_STATUS_LABELS).map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
