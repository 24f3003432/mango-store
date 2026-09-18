import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  HelpCircle, 
  RotateCcw, 
  MapPin, 
  ChevronRight, 
  AlertCircle,
  X
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/supportAndOrders';
import { OrderRecord, OrderStatus } from '../types';
import { MangoLogo } from '../components/common/MangoLogo';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'delivered'>('all');
  const [copiedTracking, setCopiedTracking] = useState<string | null>(null);

  // Modals
  const [trackingModalOrder, setTrackingModalOrder] = useState<OrderRecord | null>(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<OrderRecord | null>(null);
  const [returnModalOrder, setReturnModalOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    // Load default mock orders, plus any saved locally from checkout
    const savedOrdersStr = localStorage.getItem('mango_orders');
    if (savedOrdersStr) {
      try {
        const savedOrders = JSON.parse(savedOrdersStr);
        if (Array.isArray(savedOrders)) {
          setOrders([...savedOrders, ...MOCK_ORDERS]);
          return;
        }
      } catch {
        // ignore JSON parse error
      }
    }
    setOrders(MOCK_ORDERS);
  }, []);

  const handleCopyTracking = (tracking: string) => {
    navigator.clipboard.writeText(tracking);
    setCopiedTracking(tracking);
    setTimeout(() => setCopiedTracking(null), 2500);
  };

  const filteredOrders = orders.filter((order) => {
    // Search query matches Order ID, tracking number, or item name
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'in_progress') {
      return order.status !== 'Delivered';
    }
    if (statusFilter === 'delivered') {
      return order.status === 'Delivered';
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse">
            <Truck className="w-3.5 h-3.5" />
            Out for Delivery Today
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Truck className="w-3.5 h-3.5" />
            Shipped
          </span>
        );
      case 'Preparing':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Package className="w-3.5 h-3.5" />
            Preparing Order
          </span>
        );
    }
  };

  const steps = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-[#0C0D0E] text-neutral-900 dark:text-neutral-100 transition-colors py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="border-b border-neutral-200/80 dark:border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mango-600 dark:text-mango-400 mb-2">
              <Package className="w-4 h-4" />
              <span>Mango Account Services</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
              Order Status & History.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2">
              Live tracking milestones, carrier routes, and digital receipts for all your Mango purchases.
            </p>
          </div>

          <Link
            to="/store"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-mango-600 dark:text-mango-400 hover:underline"
          >
            <span>Continue Shopping</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID (MNG-...), item, or tracking..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#16171A] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-mango-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 bg-neutral-200/60 dark:bg-[#16171A] p-1 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === 'in_progress'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter('delivered')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === 'delivered'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#16171A] rounded-mango-lg border border-neutral-200 dark:border-neutral-800 p-8 shadow-card">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              No matching orders found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-2 leading-relaxed">
              We couldn't find any orders matching "{searchQuery}". Check the order number or view all past purchases.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
              className="mt-5 px-5 py-2 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const currentStep = order.statusStep || (order.status === 'Delivered' ? 4 : order.status === 'Out for Delivery' ? 3 : order.status === 'Shipped' ? 3 : 2);

              return (
                <div
                  key={order.id}
                  className="rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/90 dark:border-neutral-800/90 shadow-card overflow-hidden transition-all"
                >
                  {/* Card Header Bar */}
                  <div className="p-5 sm:px-6 bg-neutral-50/70 dark:bg-[#131416] border-b border-neutral-200/80 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Order Number</span>
                        <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Order Placed</span>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Total</span>
                        <span className="font-bold text-neutral-900 dark:text-white">${order.total.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Ship To</span>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">{order.shippingAddress.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-8">
                    
                    {/* Progress Tracking Stepper */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <Clock className="w-4 h-4 text-mango-500" />
                          <span>Estimated Arrival: <strong className="text-mango-600 dark:text-mango-400">{order.estimatedDelivery}</strong></span>
                        </span>
                        <span className="text-neutral-400 text-[11px]">
                          Carrier: {order.carrier}
                        </span>
                      </div>

                      {/* Visual Stepper */}
                      <div className="relative pt-4 pb-2">
                        {/* Connecting Line */}
                        <div className="absolute top-7 left-3 sm:left-6 right-3 sm:right-6 h-1 bg-neutral-200 dark:bg-neutral-800 -z-0">
                          <div 
                            className="h-full bg-mango-500 transition-all duration-500"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                          />
                        </div>

                        {/* Step Dots */}
                        <div className="relative z-10 flex justify-between">
                          {steps.map((stepName, idx) => {
                            const stepNumber = idx + 1;
                            const isCompleted = stepNumber < currentStep;
                            const isCurrent = stepNumber === currentStep;

                            return (
                              <div key={stepName} className="flex flex-col items-center text-center max-w-[80px] sm:max-w-[120px]">
                                <div 
                                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    isCompleted
                                      ? 'bg-emerald-500 text-white shadow-sm'
                                      : isCurrent
                                      ? 'bg-mango-500 text-white dark:text-black ring-4 ring-mango-500/20 scale-110 font-black'
                                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 border border-neutral-300 dark:border-neutral-700'
                                  }`}
                                >
                                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                                </div>
                                <span className={`text-[11px] sm:text-xs mt-2 font-semibold leading-tight ${
                                  isCurrent 
                                    ? 'text-mango-600 dark:text-mango-400 font-bold' 
                                    : isCompleted 
                                    ? 'text-neutral-800 dark:text-neutral-200' 
                                    : 'text-neutral-400 dark:text-neutral-600'
                                }`}>
                                  {stepName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Carrier & Tracking Info Bar */}
                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/70 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-mango-500 shrink-0" />
                        <div>
                          <span className="text-neutral-500">Tracking Number: </span>
                          <span className="font-mono font-bold text-neutral-900 dark:text-white ml-1">{order.trackingNumber}</span>
                        </div>
                        <button
                          onClick={() => handleCopyTracking(order.trackingNumber)}
                          className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
                          title="Copy tracking number"
                        >
                          {copiedTracking === order.trackingNumber ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTrackingModalOrder(order)}
                          className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Track Live Courier</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items Breakdown */}
                    <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                        Items in this shipment ({order.items.length})
                      </h4>

                      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain bg-neutral-100 dark:bg-neutral-800 p-2 border border-neutral-200/60 dark:border-neutral-700 shrink-0"
                              />
                              <div>
                                <h5 className="font-bold text-sm text-neutral-900 dark:text-white">
                                  {item.name}
                                </h5>
                                <p className="text-xs text-neutral-500 mt-0.5">
                                  Finish: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.color}</span>
                                  {item.storage && <> &bull; Storage: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.storage}</span></>}
                                </p>
                                <span className="text-[11px] text-neutral-400 mt-1 block">
                                  Qty: {item.quantity} &times; ${item.price.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white">
                                ${(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Action Buttons & Summary Footer */}
                    <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                      
                      {/* Left Quick Action CTAs */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <button
                          onClick={() => setInvoiceModalOrder(order)}
                          className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-neutral-500" />
                          <span>View Invoice</span>
                        </button>

                        <button
                          onClick={() => setReturnModalOrder(order)}
                          className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Return / Exchange</span>
                        </button>

                        <Link
                          to="/support"
                          className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Order Support</span>
                        </Link>
                      </div>

                      {/* Right Subtotal mini breakdown */}
                      <div className="text-right text-xs space-y-1">
                        <div className="text-neutral-500">
                          Subtotal: <span className="font-semibold text-neutral-800 dark:text-neutral-200">${order.subtotal.toLocaleString()}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            Savings: -${order.discount.toLocaleString()}
                          </div>
                        )}
                        <div className="text-neutral-500">
                          Tax: <span className="font-semibold text-neutral-800 dark:text-neutral-200">${order.tax.toLocaleString()}</span>
                        </div>
                        <div className="font-bold text-sm text-neutral-900 dark:text-white pt-1">
                          Total Paid: <span className="text-mango-600 dark:text-mango-400">${order.total.toLocaleString()}</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Live Carrier Tracking Modal */}
        {trackingModalOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-[#16171A] rounded-mango-lg max-w-lg w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-mango-500" />
                  <h4 className="font-bold text-base text-neutral-900 dark:text-white">
                    Live Courier Telemetry
                  </h4>
                </div>
                <button
                  onClick={() => setTrackingModalOrder(null)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Carrier:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{trackingModalOrder.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Tracking Code:</span>
                    <span className="font-mono font-bold text-mango-600 dark:text-mango-400">{trackingModalOrder.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Destination:</span>
                    <span className="text-neutral-800 dark:text-neutral-200">{trackingModalOrder.shippingAddress.city}, {trackingModalOrder.shippingAddress.state}</span>
                  </div>
                </div>

                {/* Simulated Milestone Feed */}
                <div className="space-y-3 pt-2">
                  <h5 className="font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wider">
                    Recent Transit Milestones
                  </h5>
                  <div className="border-l-2 border-mango-500 pl-4 space-y-4">
                    <div className="relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-mango-500 absolute -left-[21px] top-1" />
                      <p className="font-bold text-neutral-900 dark:text-white">{trackingModalOrder.status}</p>
                      <p className="text-neutral-500 text-[11px]">San Francisco Local Distribution Hub &bull; {trackingModalOrder.estimatedDelivery}</p>
                    </div>
                    <div className="relative">
                      <span className="w-2 h-2 rounded-full bg-neutral-400 absolute -left-[20px] top-1" />
                      <p className="font-semibold text-neutral-700 dark:text-neutral-300">Package scanned into sorting facility</p>
                      <p className="text-neutral-400 text-[11px]">Regional Gateway Sorting Center</p>
                    </div>
                    <div className="relative">
                      <span className="w-2 h-2 rounded-full bg-neutral-400 absolute -left-[20px] top-1" />
                      <p className="font-semibold text-neutral-700 dark:text-neutral-300">Dispatched from Mango Fulfillment Hub</p>
                      <p className="text-neutral-400 text-[11px]">Original shipment created & sealed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => setTrackingModalOrder(null)}
                  className="w-full py-2.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs"
                >
                  Close Tracking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Invoice / Receipt Modal */}
        {invoiceModalOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-[#16171A] rounded-mango-lg max-w-xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <MangoLogo size={22} />
                  <span className="font-black text-lg text-neutral-900 dark:text-white">
                    Official Mango Receipt
                  </span>
                </div>
                <button
                  onClick={() => setInvoiceModalOrder(null)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Invoice To</span>
                    <p className="font-bold text-neutral-900 dark:text-white mt-1">{invoiceModalOrder.shippingAddress.name}</p>
                    <p className="text-neutral-500">{invoiceModalOrder.shippingAddress.street}</p>
                    <p className="text-neutral-500">{invoiceModalOrder.shippingAddress.city}, {invoiceModalOrder.shippingAddress.state} {invoiceModalOrder.shippingAddress.zip}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase font-bold">Order Details</span>
                    <p className="font-mono font-bold text-mango-600 dark:text-mango-400 mt-1">{invoiceModalOrder.id}</p>
                    <p className="text-neutral-500">Date: {invoiceModalOrder.date}</p>
                    <p className="text-neutral-500">Payment: Mango Card (0% APR)</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <span className="text-neutral-400 text-[10px] uppercase font-bold block">Purchased Items</span>
                  {invoiceModalOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800/60">
                      <div>
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">{item.name}</span>
                        <span className="text-neutral-400 block text-[11px]">{item.color} {item.storage ? `(${item.storage})` : ''} &times; {item.quantity}</span>
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-white">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Final Totals */}
                <div className="space-y-1.5 pt-2 text-right">
                  <p className="text-neutral-500">Subtotal: ${invoiceModalOrder.subtotal.toLocaleString()}</p>
                  {invoiceModalOrder.discount > 0 && (
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold">Promotional Discount: -${invoiceModalOrder.discount.toLocaleString()}</p>
                  )}
                  <p className="text-neutral-500">Estimated Sales Tax (8%): ${invoiceModalOrder.tax.toLocaleString()}</p>
                  <p className="font-black text-base text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    Grand Total: ${invoiceModalOrder.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black font-bold text-xs"
                >
                  Print or Save PDF
                </button>
                <button
                  onClick={() => setInvoiceModalOrder(null)}
                  className="px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Return / Exchange Modal */}
        {returnModalOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-[#16171A] rounded-mango-lg max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-mango-500" />
                  <span>Start Return or Replacement</span>
                </h4>
                <button
                  onClick={() => setReturnModalOrder(null)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs space-y-3">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300">
                  <p className="font-bold">14-Day Free Returns Guarantee</p>
                  <p className="text-[11px] mt-0.5">Eligible for prepaid return label with zero restocking fees.</p>
                </div>

                <div>
                  <label className="block text-neutral-500 mb-1">Reason for Return</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <option>Changed mind / Prefer another color</option>
                    <option>Want to upgrade storage capacity</option>
                    <option>Hardware issue / Request replacement</option>
                  </select>
                </div>

                <p className="text-[11px] text-neutral-400">
                  Once submitted, a prepaid Mango courier return label will be emailed to your account. You can drop off the package at any Mango Store or carrier depot.
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
                <button
                  onClick={() => {
                    alert('Prepaid return label generated! Check your email.');
                    setReturnModalOrder(null);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-mango-500 hover:bg-mango-600 text-white dark:text-black font-bold text-xs"
                >
                  Generate Prepaid Label
                </button>
                <button
                  onClick={() => setReturnModalOrder(null)}
                  className="px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
