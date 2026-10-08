'use client';

import { useState, useMemo } from 'react';
import { differenceInDays, parse, format } from 'date-fns';
import { it } from 'date-fns/locale';

interface BookingFormProps {
  roomSlug: string;
  roomId: string;
  roomName: string;
  pricePerNight: number;
  directDiscount: number; // e.g. 5 for 5%
  maxGuests: number;
  minNights: number;
  checkIn: string | null;  // YYYY-MM-DD
  checkOut: string | null; // YYYY-MM-DD
}

interface FormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guests: number;
  notes: string;
}

export default function BookingForm({
  roomSlug,
  roomId,
  roomName,
  pricePerNight,
  directDiscount,
  maxGuests,
  minNights,
  checkIn,
  checkOut,
}: BookingFormProps) {
  const [form, setForm] = useState<FormData>({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    guests: 1,
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const pricing = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const ciDate = parse(checkIn, 'yyyy-MM-dd', new Date());
    const coDate = parse(checkOut, 'yyyy-MM-dd', new Date());
    const nights = differenceInDays(coDate, ciDate);
    if (nights < 1) return null;

    const subtotal = nights * pricePerNight;
    const discountAmount = Math.round((subtotal * directDiscount) / 100);
    const total = subtotal - discountAmount;

    return { nights, subtotal, discountAmount, total };
  }, [checkIn, checkOut, pricePerNight, directDiscount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value,
    }));
  };

  const canSubmit = !!(
    checkIn &&
    checkOut &&
    pricing &&
    pricing.nights >= minNights &&
    form.guestName.trim() &&
    form.guestEmail.trim() &&
    !submitting
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !pricing) return;

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomSlug,
          roomId,
          guestName: form.guestName.trim(),
          guestEmail: form.guestEmail.trim(),
          guestPhone: form.guestPhone.trim(),
          checkIn,
          checkOut,
          guests: form.guests,
          notes: form.notes.trim(),
          totalPrice: pricing.total,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setResult({
          success: true,
          message: 'Prenotazione inviata! Ti contatteremo a breve per confermare.',
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Errore nella prenotazione. Riprova.',
        });
      }
    } catch {
      setResult({
        success: false,
        message: 'Errore di connessione. Riprova più tardi.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'd MMMM yyyy', { locale: it });
  };

  // Success state
  if (result?.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="text-4xl mb-3">&#10003;</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Grazie!</h3>
        <p className="text-green-700">{result.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Date summary */}
      {checkIn && checkOut && pricing && (
        <div className="rounded-lg bg-stone-50 border border-stone-200 p-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-stone-500">Camera</span>
            <span className="font-medium">{roomName}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-stone-500">Check-in</span>
            <span>{formatDate(checkIn)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-stone-500">Check-out</span>
            <span>{formatDate(checkOut)}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-stone-500">Notti</span>
            <span>{pricing.nights}</span>
          </div>

          <div className="border-t border-stone-200 pt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span>{pricing.nights} notti &times; &euro;{pricePerNight}</span>
              <span>&euro;{pricing.subtotal}</span>
            </div>
            {directDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-700">
                <span>Sconto prenotazione diretta ({directDiscount}%)</span>
                <span>-&euro;{pricing.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-base pt-2 border-t border-stone-200">
              <span>Totale</span>
              <span>&euro;{pricing.total}</span>
            </div>
          </div>
        </div>
      )}

      {pricing && pricing.nights < minNights && (
        <p className="text-sm text-red-600">
          Soggiorno minimo: {minNights} notti. Hai selezionato {pricing.nights}.
        </p>
      )}

      {/* Guest details */}
      <div>
        <label htmlFor="guestName" className="block text-sm font-medium text-stone-700 mb-1">
          Nome completo *
        </label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          required
          value={form.guestName}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="Mario Rossi"
        />
      </div>

      <div>
        <label htmlFor="guestEmail" className="block text-sm font-medium text-stone-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="guestEmail"
          name="guestEmail"
          required
          value={form.guestEmail}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="mario@email.com"
        />
      </div>

      <div>
        <label htmlFor="guestPhone" className="block text-sm font-medium text-stone-700 mb-1">
          Telefono
        </label>
        <input
          type="tel"
          id="guestPhone"
          name="guestPhone"
          value={form.guestPhone}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="+39 ..."
        />
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-stone-700 mb-1">
          Ospiti
        </label>
        <select
          id="guests"
          name="guests"
          value={form.guests}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'ospite' : 'ospiti'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-stone-700 mb-1">
          Note o richieste speciali
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={handleChange}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
          placeholder="Allergie, orario di arrivo, ecc."
        />
      </div>

      {result && !result.success && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{result.message}</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-lg bg-green-700 text-white font-medium py-3 px-4 text-sm
          hover:bg-green-800 transition-colors
          disabled:bg-stone-300 disabled:cursor-not-allowed"
      >
        {submitting ? 'Invio in corso...' : !checkIn || !checkOut ? 'Seleziona le date' : 'Prenota ora'}
      </button>

      {directDiscount > 0 && (
        <p className="text-xs text-center text-green-700">
          Prenotando direttamente risparmi il {directDiscount}% rispetto a Airbnb e Booking.com
        </p>
      )}
    </form>
  );
}
