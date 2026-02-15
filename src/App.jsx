import React, { useState, useEffect } from 'react';
import {
  FileText,
  Package, // Pengganti Box agar lebih stabil
  Save,
  Printer,
  Trash2,
  Plus,
  FileDown,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Clock,
  X,
  Search,
  ArrowLeft,
  Info,
  Zap,
  TrendingUp,
  TrendingDown,
  User,
  Settings,
  LogOut,
  ChevronUp,
  Menu
} from 'lucide-react';

// --- Utility Components ---

const Notification = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const duration = 3000;

  useEffect(() => {
    // Start entry animation
    requestAnimationFrame(() => {
      setIsVisible(true);
      setProgress(0);
    });

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-[1.5rem] right-[1.5rem] z-[100] px-[1.5rem] py-[1rem] rounded-[1rem] border shadow-2xl flex items-center gap-[1rem] transition-all duration-300 backdrop-blur-md overflow-hidden ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[2rem] opacity-0'
      } ${type === 'success'
        ? 'bg-white border-emerald-100 text-emerald-800'
        : type === 'info'
          ? 'bg-white border-blue-100 text-blue-800'
          : 'bg-white border-rose-100 text-rose-800'
      }`}>
      <div className={`p-[0.5rem] rounded-full ${type === 'success' ? 'bg-emerald-100 text-emerald-600' :
        type === 'info' ? 'bg-blue-100 text-blue-600' :
          'bg-rose-100 text-rose-600'
        }`}>
        {type === 'success' ? <CheckCircle size={20} /> :
          type === 'info' ? <Info size={20} /> :
            <AlertCircle size={20} />}
      </div>
      <div className="min-w-[12rem]">
        <h4 className="font-bold text-[0.875rem]">
          {type === 'success' ? 'Berhasil' : type === 'info' ? 'Info' : 'Perhatian'}
        </h4>
        <p className="text-[0.75rem] text-slate-500 font-medium">{message}</p>
      </div>
      <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="ml-[0.5rem] hover:bg-slate-100/50 p-[0.25rem] rounded-lg transition-colors text-slate-400 hover:text-slate-600">
        <X size={16} />
      </button>

      {/* Progress Bar with CSS Transition - Vibrant Red */}
      <div
        className="absolute bottom-0 left-0 h-[0.1875rem] bg-rose-500 opacity-90"
        style={{
          width: `${progress}%`,
          transition: isVisible ? `width ${duration}ms linear` : 'none'
        }}
      ></div>
    </div>
  );
};

const CustomConditionSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      id: 'good',
      label: 'Baik / Layak Jual',
      icon: <CheckCircle size={16} />,
      style: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
    },
    {
      id: 'bad',
      label: 'Rusak / Cacat',
      icon: <AlertCircle size={16} />,
      style: 'text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100'
    }
  ];

  const selected = options.find(o => o.id === value) || options[0];

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border outline-none font-medium text-sm transition-all shadow-sm ${selected.style} bg-white`}
      >
        <div className="flex items-center gap-2">
          {selected.icon}
          <span className="truncate">{selected.label}</span>
        </div>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {options.map(opt => (
              <button
                key={opt.id}
                onClick={() => { onChange(opt.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors text-left border-b border-slate-50 last:border-0 hover:bg-slate-50 ${opt.id === value ? 'bg-slate-50 font-bold' : 'text-slate-600'}`}
              >
                <div className={opt.id === 'good' ? 'text-emerald-500' : 'text-rose-500'}>
                  {opt.icon}
                </div>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ReceiptModal = ({ data, items, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3 text-slate-700">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Printer size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Preview Tanda Terima</h3>
              <p className="text-[0.625rem] text-slate-400 font-bold uppercase tracking-wider">Draft Dokumen Digital</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Receipt Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-slate-50">
          <div id="printable-area" className="bg-white p-6 md:p-12 shadow-sm border-2 border-dashed border-slate-200 mx-auto max-w-xl text-slate-800 font-sans relative rounded-sm">
            {/* Stamp/Watermark */}
            <div className="absolute top-20 right-10 opacity-[0.03] pointer-events-none rotate-12">
              <Package size={200} />
            </div>

            {/* Receipt Header */}
            <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-slate-800 pb-8 mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-2">
                  PT ELEKTRIN
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                </h2>
                <p className="text-slate-500 text-[0.6875rem] font-medium leading-relaxed max-w-[12.5rem] mt-1">
                  Jl. Industri Elektronik No. 88, Jakarta Pusat <br />
                  Telp: (021) 555-9988 | info@elektrin.com
                </p>
              </div>
              <div className="text-right flex flex-col items-end">

                <h1 className="text-lg font-black tracking-tight border-b-2 border-indigo-500 pb-1">TANDA TERIMA RETUR</h1>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-y-[1.5rem] gap-x-[3rem] mb-[2.5rem]">
              <div className="space-y-1">
                <p className="text-[0.625rem] font-black text-slate-400 uppercase tracking-widest">Nomor Dokumen</p>
                <p className="font-bold text-sm tracking-tight text-slate-700">{data.noRetur}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[0.625rem] font-black text-slate-400 uppercase tracking-widest">Tanggal Terbit</p>
                <p className="font-bold text-sm tracking-tight text-slate-700">{data.date}</p>
              </div>
              <div className="col-span-2 space-y-2 pt-[0.5rem]">
                <p className="text-[0.625rem] font-black text-slate-400 uppercase tracking-widest">Partner Komisioner</p>
                <div className="bg-slate-50 border border-slate-100 p-[0.75rem] rounded flex items-center gap-[0.75rem]">
                  <div className="w-[2rem] h-[2rem] rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                    <User size={14} />
                  </div>
                  <p className="font-black text-sm text-indigo-600 uppercase tracking-tight">{data.commissioner || "BELUM TERIDENTIFIKASI"}</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="mb-[2.5rem]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-[0.625rem] font-black uppercase tracking-[0.1em] text-slate-400 border-b-2 border-slate-100">
                    <th className="py-[0.75rem] pr-[1rem]">Item Detail</th>
                    <th className="py-[0.75rem] text-center w-[5rem]">Quantity</th>
                    <th className="py-[0.75rem] text-right w-[8rem]">Status/Kondisi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={idx} className="group">
                      <td className="py-[1rem]">
                        <p className="font-bold text-[0.875rem] text-slate-800">{item.name || "Item Tanpa Nama"}</p>
                        <p className="text-[0.625rem] font-mono font-bold text-slate-400 mt-[0.125rem]">{item.code || "N/A"}</p>
                      </td>
                      <td className="py-[1rem] text-center">
                        <span className="inline-block px-[0.5rem] py-[0.25rem] bg-slate-100 rounded-md font-black text-sm text-slate-700">
                          {item.qty}
                        </span>
                      </td>
                      <td className="py-[1rem] text-right">
                        <span className={`text-[0.625rem] font-black px-[0.5rem] py-[0.25rem] rounded-full border ${item.condition === 'good'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>
                          {item.condition === 'good' ? 'BAIK / LAYAK' : 'RUSAK / CACAT'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-800 font-bold">
                    <td className="py-[1.5rem] text-right pr-[1.5rem] uppercase text-[0.6875rem] font-black tracking-widest text-slate-400">Total Akumulasi Unit:</td>
                    <td className="py-6 text-center">
                      <span className="text-lg font-black text-slate-900 underline underline-offset-4 decoration-indigo-500">
                        {items.reduce((a, b) => a + Number(b.qty), 0)}
                      </span>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-[3rem] mt-[3rem]">
              <div className="space-y-[4rem]">
                <p className="text-[0.625rem] font-black text-slate-400 uppercase tracking-widest text-center">Petugas Pengirim (Komisioner)</p>
                <div className="w-full mx-auto relative group pt-[2rem] text-center" style={{ minWidth: '9.375rem' }}>
                  <div className="border-b border-slate-300 w-full mb-[0.75rem]"></div>
                  {/* <p className="font-bold text-xs uppercase text-slate-700">
                    {data.commissioner ? data.commissioner.split(' ')[0] : '...........'}
                  </p> */}
                </div>
              </div>
              <div className="space-y-[4rem]">
                <p className="text-[0.625rem] font-black text-slate-400 uppercase tracking-widest text-center">Penerima (Staff Admin Gudang)</p>
                <div className="w-full mx-auto relative group pt-[2rem] text-center" style={{ minWidth: '9.375rem' }}>
                  <div className="border-b border-slate-300 w-full mb-[0.75rem]"></div>
                  <p className="font-bold text-xs uppercase text-slate-700">
                    ALEXANDER AGUNG (2902709252)
                  </p>
                </div>
              </div>
            </div>

            {/* 
            <div className="mt-[5rem] pt-[2rem] border-t border-slate-100 text-center text-[0.5625rem] text-slate-300 font-black uppercase tracking-[0.3em]">
              Verified & Secured by UAS Digital Ledger System
            </div>
            */}
            {/* 
            <div className="mt-[5rem] pt-[2rem] border-t border-slate-100 text-center text-[0.5625rem] text-slate-400 font-bold uppercase tracking-widest">
              Prepared by: ALEXANDER AGUNG - 2902709252
            </div>
            */}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-white border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[0.6875rem] text-slate-400 font-medium">
            * Gunakan printer laser atau thermal untuk hasil terbaik
          </p>
          <div className="flex gap-3 w-full md:w-auto">
            <button onClick={onClose} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all text-sm">
              Batalkan
            </button>
            <button onClick={() => window.print()} className="flex-1 md:flex-none px-8 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-sm shadow-xl shadow-indigo-200">
              <Printer size={16} /> Cetak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label, desc }) => (
  <button
    onClick={onClick}
    className={`w-full group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative ${active
      ? 'bg-indigo-50/60 text-indigo-600 shadow-sm'
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
  >
    {/* Modern Active Indicator */}
    {active && (
      <div className="absolute left-0 top-[0.5rem] bottom-[0.5rem] w-[0.375rem] bg-indigo-600 rounded-r-md shadow-[0_0_0.75rem_rgba(79,70,229,0.4)] animate-in fade-in slide-in-from-left-1 duration-300"></div>
    )}

    <div className={`transition-all duration-300 ${active ? 'text-indigo-600 scale-110' : 'text-slate-400 group-hover:scale-110 group-hover:text-slate-600'}`}>
      {icon}
    </div>
    <div className="text-left">
      <span className={`block text-sm font-bold transition-colors ${active ? 'text-indigo-900' : 'text-slate-700'}`}>{label}</span>
      <span className={`text-[0.625rem] uppercase tracking-wider font-bold transition-colors ${active ? 'text-indigo-400' : 'text-slate-400'}`}>{desc}</span>
    </div>
  </button>
);

const FilterInput = ({ label, type, value, onChange, className }) => (
  <div className={`relative group ${className}`}>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full pl-3 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all cursor-pointer shadow-sm"
    />
  </div>
);

const StatCard = ({ title, value, icon, gradient, trend }) => (
  <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
    <div className="p-5 h-full flex flex-col justify-between relative overflow-hidden rounded-xl bg-white">
      <div className="flex justify-between items-start z-10">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h4>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transform rotate-0 transition-transform group-hover:rotate-12`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 z-10">
        {trend && (
          trend.startsWith('+') ? (
            <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp size={12} /> {trend}
            </div>
          ) : trend.startsWith('-') ? (
            <div className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingDown size={12} /> {trend}
            </div>
          ) : (
            <div className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-xs font-bold">
              {trend}
            </div>
          )
        )}
        <span className="text-xs text-slate-400">vs bulan lalu</span>
      </div>

      {/* Decor */}
      <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
    </div>
  </div>
);

const ReportRow = ({ date, no, comm, item, qty, condition }) => (
  <tr className="hover:bg-indigo-50/10 transition-colors group">
    <td className="px-6 py-3 whitespace-nowrap text-slate-600 font-medium text-xs border-b border-slate-100 align-middle">{date}</td>
    <td className="px-6 py-3 font-mono text-xs font-bold text-indigo-600 border-b border-slate-100 align-middle">{no}</td>
    <td className="px-6 py-3 text-slate-700 font-medium border-b border-slate-100 align-middle">{comm}</td>
    <td className="px-6 py-3 text-slate-600 border-b border-slate-100 align-middle">{item}</td>
    <td className="px-6 py-3 text-center font-bold text-slate-800 border-b border-slate-100 align-middle">{qty}</td>
    <td className="px-6 py-3 border-b border-slate-100 align-middle">
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${condition === 'good'
        ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
        : 'bg-rose-50 border-rose-100 text-rose-600'
        }`}>
        {condition === 'good' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
        {condition === 'good' ? 'Baik / Layak Jual' : 'Rusak / Cacat'}
      </span>
    </td>
  </tr>
);

// --- Main Pages ---

const InputReturForm = ({ onSaveTransaction, currentTime, formatDate, onMenuClick }) => {
  const [notification, setNotification] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Generate random transaction ID
  const generateId = () => `RET-${new Date().getFullYear()}${(Math.floor(Math.random() * 10000) + 10000).toString().substring(1)}`;

  const [formData, setFormData] = useState({
    noRetur: 'RET-20240520-001',
    date: new Date().toISOString().split('T')[0],
    commissioner: ''
  });

  const [items, setItems] = useState([
    { id: 1, code: '', name: '', qty: 1, condition: 'good', notes: '' }
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    const newItem = { id: Date.now(), code: '', name: '', qty: 1, condition: 'good', notes: '' };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = () => {
    // Validation
    if (!formData.commissioner) {
      setNotification({ type: 'error', message: 'Harap pilih nama Komisioner terlebih dahulu!' });
      return;
    }

    // Check if items are valid (name not empty)
    const invalidItems = items.some(i => !i.name.trim() || i.qty < 1);
    if (invalidItems) {
      setNotification({ type: 'error', message: 'Data barang belum lengkap (Nama/Qty tidak boleh kosong).' });
      return;
    }

    // Call parent function to save data
    onSaveTransaction(formData, items);

    // Show Success Notification
    setNotification({ type: 'success', message: 'Transaksi berhasil disimpan ke Laporan.' });

    // Reset Form
    setFormData({
      noRetur: generateId(),
      date: new Date().toISOString().split('T')[0],
      commissioner: ''
    });
    setItems([{ id: Date.now(), code: '', name: '', qty: 1, condition: 'good', notes: '' }]);
  };

  const totalItems = items.reduce((sum, item) => sum + Number(item.qty), 0);
  const damagedItems = items.filter(i => i.condition === 'bad').reduce((sum, item) => sum + Number(item.qty), 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header Specific for Input Page */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm transition-none">
        <div className="max-w-[100rem] mx-auto w-full px-8 py-5 flex items-start gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden mt-0.5 p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              Penerimaan Retur
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Kelola data pengembalian barang dari komisioner.
            </p>
          </div>

        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

        {showPreview && (
          <ReceiptModal
            data={formData}
            items={items}
            onClose={() => setShowPreview(false)}
          />
        )}

        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Header Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Package size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-800">Informasi Dokumen</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-indigo-500 transition-colors">No. Transaksi</label>
                <div className="relative">
                  <input
                    type="text"
                    name="noRetur"
                    value={formData.noRetur}
                    readOnly
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700 font-mono font-bold focus:outline-none cursor-default text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-indigo-500 transition-colors">Tanggal Penerimaan</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all outline-none shadow-sm"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-indigo-500 transition-colors">Komisioner Pengirim</label>
                <select
                  name="commissioner"
                  value={formData.commissioner}
                  onChange={handleFormChange}
                  className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 shadow-sm transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%2394a3b8%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  <option value="" disabled>-- Pilih Komisioner --</option>
                  <option value="Toko Elektronik Jaya (JKT)">Toko Elektronik Jaya (JKT)</option>
                  <option value="Sentra Digital (BDG)">Sentra Digital (BDG)</option>
                  <option value="Maju Mundur Tech (SBY)">Maju Mundur Tech (SBY)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Items Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col min-h-[25rem]">
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
              <div className="flex items-center gap-2 self-start md:self-auto">
                <h3 className="font-bold text-slate-700">Detail Barang Retur</h3>
              </div>
              <button
                onClick={addItem}
                className="group flex items-center justify-center gap-2 bg-white border border-dashed border-indigo-300 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-50 hover:border-indigo-500 transition-all w-full md:w-auto"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Tambah Baris
              </button>
            </div>

            <div className="overflow-auto flex-1 max-h-[31.25rem] relative">
              <table className="w-full min-w-[62.5rem] text-left text-sm relative">
                <thead className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400 font-bold bg-white sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 bg-white">Kode Barang</th>
                    <th className="px-6 py-4 bg-white">Nama Barang</th>
                    <th className="px-6 py-4 w-28 text-center bg-white">Qty</th>
                    <th className="px-6 py-4 w-64 bg-white">Kondisi Fisik</th>
                    <th className="px-6 py-4 bg-white">Keterangan / Alasan</th>
                    <th className="px-6 py-4 w-16 text-center bg-white"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-indigo-50/10 transition-colors">
                      <td className="px-6 py-3 align-top">
                        <input
                          type="text"
                          value={item.code}
                          onChange={(e) => updateItem(item.id, 'code', e.target.value)}
                          placeholder="Kode..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm placeholder:text-slate-400 font-mono font-bold"
                        />
                      </td>
                      <td className="px-6 py-3 align-top">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          placeholder="Nama produk..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm placeholder:text-slate-400"
                        />
                      </td>
                      <td className="px-6 py-3 align-top">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                          min="1"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 font-bold text-slate-700 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm text-center"
                        />
                      </td>
                      <td className="px-6 py-3 align-top">
                        <CustomConditionSelect
                          value={item.condition}
                          onChange={(val) => updateItem(item.id, 'condition', val)}
                        />
                        {item.condition === 'bad' && (
                          <p className="text-[0.625rem] text-rose-500 mt-[0.5rem] flex items-center gap-[0.25rem] animate-pulse font-bold">
                            <AlertCircle size={10} /> WAJIB QC PRODUKSI
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-3 align-top">
                        <textarea
                          value={item.notes}
                          onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                          placeholder="Detail masalah..."
                          rows="1"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-600 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm resize-none overflow-hidden placeholder:text-slate-400"
                          onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                          }}
                        />
                      </td>
                      <td className="px-6 py-3 text-center align-middle">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 m-6">
                  <Package size={48} className="mb-4 text-slate-200" />
                  <p className="font-medium text-slate-500">Belum ada barang yang ditambahkan</p>
                  <p className="text-sm">Klik "Tambah Baris" untuk memulai input</p>
                </div>
              )}
            </div>

            <div className="bg-white p-4 border-t border-slate-100 flex justify-end items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Total Akumulasi Qty:</span>
                <span className="font-black text-indigo-600 text-lg">{totalItems} <span className="text-[0.625rem] font-bold text-slate-400 uppercase tracking-tighter">Unit</span></span>
              </div>
              {damagedItems > 0 && (
                <div className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full border border-rose-100 shadow-sm transition-all hover:shadow-md">
                  <AlertCircle size={14} className="animate-pulse" />
                  <span className="font-black text-[0.6875rem] uppercase tracking-wide">{damagedItems} Unit Rusak</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100 mt-4">
            <button
              className="text-slate-400 hover:text-slate-600 font-medium px-4 py-2 text-xs md:text-sm underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500 transition-all w-full md:w-auto text-center"
              onClick={() => setItems([{ id: Date.now(), code: '', name: '', qty: 1, condition: 'good', notes: '' }])}
            >
              Reset Formulir
            </button>
            <div className="flex flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowPreview(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all text-xs md:text-sm"
              >
                <Printer size={16} /> <span className="hidden sm:inline">Preview</span> Tanda Terima
              </button>
              <button
                onClick={handleSave}
                className="flex-1 md:flex-none group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all text-xs md:text-sm"
              >
                <Save size={16} className="group-hover:scale-110 transition-transform" />
                Simpan <span className="hidden sm:inline">Transaksi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LaporanReturView = ({ data, currentTime, formatDate, onMenuClick }) => {
  // Initialize date range
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const [endDate, setEndDate] = useState(lastDayOfMonth);
  const [commissionerFilter, setCommissionerFilter] = useState('all');
  const [filteredData, setFilteredData] = useState(data);
  const [showAllData, setShowAllData] = useState(false); // State to toggle "View All Data" page
  const [searchQuery, setSearchQuery] = useState(''); // Add search state
  const [notification, setNotification] = useState(null); // Add notification state

  // Pagination State for "View All Data"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter Logic
  useEffect(() => {
    let result = data;

    // Filter by Date Range
    if (startDate && endDate) {
      result = result.filter(item => {
        const itemDate = item.date;
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Filter by Commissioner
    if (commissionerFilter !== 'all') {
      result = result.filter(item => item.commissioner.includes(commissionerFilter));
    }

    // Filter by Search Query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.item.toLowerCase().includes(lowerQuery) ||
        item.noRetur.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [data, startDate, endDate, commissionerFilter, searchQuery]);

  // Calculate dynamic stats
  const totalRetur = filteredData.reduce((sum, item) => sum + Number(item.qty), 0);
  const layakJual = filteredData.filter(i => i.condition === 'good').reduce((sum, item) => sum + Number(item.qty), 0);
  const rusak = filteredData.filter(i => i.condition === 'bad').reduce((sum, item) => sum + Number(item.qty), 0);
  const valuasi = (totalRetur * 150000).toLocaleString('id-ID');

  // Generate extended dummy data for "All Data" view demo
  const extendedData = [...filteredData, ...filteredData, ...filteredData, ...filteredData].map((item, idx) => ({ ...item, uniqueId: idx }));

  // Pagination Logic
  const totalPages = Math.ceil(extendedData.length / itemsPerPage);
  const currentTableData = showAllData
    ? extendedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredData.slice(0, 5); // Preview uses limited slice

  return (
    <div className="flex flex-col h-full">
      {/* Header with INTEGRATED filters */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm transition-none w-full overflow-x-hidden">
        <div className="max-w-[100rem] mx-auto w-full px-4 md:px-8 py-5 flex items-start gap-4 overflow-x-hidden">
          <button
            onClick={onMenuClick}
            className="md:hidden mt-0.5 p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              Dashboard Laporan
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium mb-4">
              Monitoring metrik retur dan status stok.
            </p>

            {/* --- FILTERS INTEGRATED DIRECTLY HERE --- */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-1 duration-300">

              <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                {/* Date Range Group */}
                <div className="flex flex-row items-center gap-2 w-full md:w-auto">
                  <FilterInput
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 min-w-0 md:w-36 lg:w-40"
                  />
                  <div className="text-slate-300 font-bold">-</div>
                  <FilterInput
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 min-w-0 md:w-36 lg:w-40"
                  />
                </div>

                <div className="hidden lg:flex h-8 w-px bg-slate-200 mx-2 shrink-0 self-center"></div>

                {/* Commissioner Select */}
                <select
                  value={commissionerFilter}
                  onChange={(e) => setCommissionerFilter(e.target.value)}
                  className="w-full md:w-48 lg:w-64 pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 shadow-sm transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%2394a3b8%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  <option value="all">Semua Komisioner</option>
                  <option value="Toko Elektronik Jaya (JKT)">Toko Elektronik Jaya (JKT)</option>
                  <option value="Sentra Digital (BDG)">Sentra Digital (BDG)</option>
                  <option value="Maju Mundur Tech (SBY)">Maju Mundur Tech (SBY)</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="relative group w-full lg:w-auto">
                <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none text-slate-400">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari No. Retur / Barang..."
                  className="w-full lg:w-64 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all shadow-sm min-w-0"
                />
              </div>
            </div>
          </div>


        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="max-w-7xl mx-auto">
          {/* Conditionally Render Content */}
          {!showAllData ? (
            // --- DASHBOARD VIEW ---
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <StatCard
                  title="Total Retur"
                  value={totalRetur}
                  icon={<Package size={24} className="text-white" />}
                  gradient="from-blue-500 to-blue-400"
                  trend="+12%"
                />
                <StatCard
                  title="Layak Jual"
                  value={layakJual}
                  icon={<CheckCircle size={24} className="text-white" />}
                  gradient="from-emerald-500 to-emerald-400"
                  trend="+5%"
                />
                <StatCard
                  title="Barang Rusak"
                  value={rusak}
                  icon={<AlertCircle size={24} className="text-white" />}
                  gradient="from-rose-500 to-rose-400"
                  trend="-2%"
                />
                <StatCard
                  title="Valuasi Retur"
                  value={`Rp ${valuasi}`}
                  icon={<FileText size={24} className="text-white" />}
                  gradient="from-indigo-500 to-indigo-400"
                  trend="+8%"
                />
              </div>

              {/* Preview Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 mt-8">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">Preview Laporan</h3>
                    <p className="text-sm text-slate-400">Ringkasan data transaksi retur terbaru.</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setNotification({ type: 'error', message: 'Fitur Print belum tersedia saat ini.' })}
                      className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
                    >
                      <Printer size={16} /> Print
                    </button>
                    <button
                      onClick={() => setNotification({ type: 'error', message: 'Fitur Export Excel belum tersedia saat ini.' })}
                      className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors"
                    >
                      <FileDown size={16} /> Excel
                    </button>
                  </div>
                </div>
                <div className="overflow-auto max-h-[25rem] relative">
                  <table className="w-full min-w-[62.5rem] text-left text-sm relative">
                    <thead className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400 font-bold bg-white sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-4">Tanggal</th>
                        <th className="px-6 py-4">No. Retur</th>
                        <th className="px-6 py-4">Komisioner</th>
                        <th className="px-6 py-4">Barang</th>
                        <th className="px-6 py-4 text-center">Qty</th>
                        <th className="px-6 py-4">Status QC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredData.length > 0 ? (
                        filteredData.slice(0, 5).map((row, index) => (
                          <ReportRow
                            key={index}
                            date={row.date}
                            no={row.noRetur}
                            comm={row.commissioner}
                            item={row.item}
                            qty={row.qty}
                            condition={row.condition}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400 m-6">
                              <Package size={48} className="mb-4 text-slate-200" />
                              <p className="font-medium text-slate-500">Belum ada data retur.</p>
                              <p className="text-sm">Silakan sesuaikan filter tanggal atau input data baru.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-white border-t border-slate-100 flex justify-center">
                  <button
                    onClick={() => setShowAllData(true)}
                    className="text-sm text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    Lihat Semua Data <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // --- FULL TABLE VIEW ---
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Semua Data Retur</h3>
                  <p className="text-sm text-slate-500">Total {extendedData.length} catatan ditemukan</p>
                </div>
                <button
                  onClick={() => setShowAllData(false)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"
                >
                  <ArrowLeft size={16} /> Kembali ke Dashboard
                </button>
              </div>

              <div className="overflow-x-auto max-h-[37.5rem] overflow-y-auto">
                <table className="w-full min-w-[62.5rem] text-left text-sm relative">
                  <thead className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400 font-bold bg-white sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4">Tanggal</th>
                      <th className="px-6 py-4">No. Retur</th>
                      <th className="px-6 py-4">Komisioner</th>
                      <th className="px-6 py-4">Barang</th>
                      <th className="px-6 py-4 text-center">Qty</th>
                      <th className="px-6 py-4">Status QC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentTableData.length > 0 ? (
                      currentTableData.map((row, index) => (
                        <ReportRow
                          key={index}
                          date={row.date}
                          no={row.noRetur}
                          comm={row.commissioner}
                          item={row.item}
                          qty={row.qty}
                          condition={row.condition}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <div className="flex flex-col items-center justify-center py-20 text-slate-400 flex flex-col items-center justify-center gap-2">
                            <Search size={32} className="opacity-20" />
                            <p className="font-medium">Tidak ada data ditemukan.</p>
                            <p className="text-sm">Coba sesuaikan filter pencarian Anda.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
                <span>Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, extendedData.length)} dari {extendedData.length} data</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-slate-50"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-indigo-600 text-white font-bold' : 'bg-white hover:bg-slate-50'}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-slate-50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Initial Data
  const [reportData, setReportData] = useState([
    { date: '2026-02-10', noRetur: 'RET-20260210-001', commissioner: 'Toko Elektronik Jaya (JKT)', item: 'TV LED 32 Samsung', qty: 2, condition: 'good', action: 'Restock Gudang' },
    { date: '2026-02-12', noRetur: 'RET-20260212-001', commissioner: 'Toko Elektronik Jaya (JKT)', item: 'DVD Player Sony', qty: 1, condition: 'bad', action: 'Cek Produksi' },
    { date: '2026-02-14', noRetur: 'RET-20260214-005', commissioner: 'Sentra Digital (BDG)', item: 'MP3 Player', qty: 5, condition: 'good', action: 'Restock Gudang' }
  ]);

  // Clock Logic
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).toUpperCase();
  };

  // Logic to receive data from Form and add to Report Data
  const handleSaveTransaction = (header, items) => {
    const newRows = items.map(item => ({
      date: header.date,
      noRetur: header.noRetur,
      commissioner: header.commissioner,
      item: item.name,
      qty: item.qty,
      condition: item.condition,
      action: item.condition === 'good' ? 'Restock Gudang' : 'Cek Produksi'
    }));

    // Add new rows to the TOP of the report
    setReportData(prevData => [...newRows, ...prevData]);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-700 relative">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation - Responsive */}
      <aside className={`w-72 bg-white border-r border-slate-200 text-slate-800 flex flex-col shadow-xl z-40 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="p-8 z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[2.5rem] h-[2.5rem] bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Zap size={22} className="text-white fill-white/20" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-800">PT ELEKTRIN</h1>
              <div className="flex items-center gap-[0.375rem]">
                <p className="text-[0.625rem] text-slate-500 font-bold uppercase tracking-widest">Warehouse Control</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <NavButton
              active={activeTab === 'input'}
              onClick={() => setActiveTab('input')}
              icon={<Package size={20} />}
              label="Input Retur Barang"
              desc="Penerimaan Gudang"
            />
            <NavButton
              active={activeTab === 'report'}
              onClick={() => setActiveTab('report')}
              icon={<FileText size={20} />}
              label="Laporan Retur"
              desc="Analisis & Rekap"
            />
          </nav>
        </div>

        <div className="mt-auto p-6 z-10 border-t border-slate-100 relative">
          {/* User Menu Dropdown */}
          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setUserMenuOpen(false)}></div>
              <div className="absolute bottom-[calc(100%-1rem)] left-6 right-6 mb-2 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors border-b border-slate-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Settings size={16} className="text-slate-400" />
                  <span className="font-medium">Pengaturan</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <LogOut size={16} />
                  <span className="font-medium">Keluar Sistem</span>
                </button>
              </div>
            </>
          )}

          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${userMenuOpen ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200 shadow-inner">
                <User size={16} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-700">ALEXANDER AGUNG</p>
                <p className="text-[0.625rem] text-slate-400 font-bold">2902709252</p>
              </div>
            </div>
            <ChevronUp size={14} className={`text-slate-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden bg-slate-50 relative">
        {activeTab === 'input'
          ? <InputReturForm onSaveTransaction={handleSaveTransaction} currentTime={currentTime} formatDate={formatDate} onMenuClick={() => setMobileMenuOpen(true)} />
          : <LaporanReturView data={reportData} currentTime={currentTime} formatDate={formatDate} onMenuClick={() => setMobileMenuOpen(true)} />
        }
      </main>
    </div>
  );
};

export default App;