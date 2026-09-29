'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getOrdersByUser } from '@/lib/firestore';
import type { Order } from '@/types';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Package, Plus, Clock, ArrowRight, Loader2, LogOut } from 'lucide-react';

export default function MeusPedidosPage() {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/me/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getOrdersByUser(user.uid)
        .then(setOrders)
        .finally(() => setLoadingOrders(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#2e7ec6]" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bem-vindo de volta,</p>
              <h1 className="text-2xl font-extrabold text-gray-900">
                {profile?.fullName || user.displayName || 'Cliente'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/orcamento-traducoes"
                className="flex items-center gap-2 bg-[#2e7ec6] hover:bg-[#1a5fa8] text-white font-bold px-5 py-2.5 rounded-full transition-colors text-sm"
              >
                <Plus size={16} />
                Novo Pedido
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium text-sm transition-colors"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loadingOrders ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-[#2e7ec6]" />
          </div>
        ) : orders.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package size={36} className="text-[#2e7ec6]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Nenhum pedido ainda</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Solicite sua primeira tradução agora mesmo e acompanhe o status em tempo real.
            </p>
            <Link
              href="/orcamento-traducoes"
              className="inline-flex items-center gap-2 bg-[#2e7ec6] hover:bg-[#1a5fa8] text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              <Plus size={18} />
              Solicitar Tradução
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Meus Pedidos</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                        <span className="text-xs text-gray-400">
                          #{order.id?.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {order.sourceLanguage} → {order.targetLanguage}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.serviceType} • {order.documents.length} documento(s)
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {order.createdAt instanceof Date
                            ? formatDate(order.createdAt)
                            : formatDate((order.createdAt as any).toDate())}
                        </span>
                        <span className="font-semibold text-gray-700">
                          {formatCurrency(order.price)}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/me/pedidos/${order.id}`}
                      className="flex items-center gap-1 text-[#2e7ec6] text-sm font-semibold hover:underline shrink-0"
                    >
                      Detalhes <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
