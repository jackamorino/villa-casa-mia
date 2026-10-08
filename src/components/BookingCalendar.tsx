'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isBefore,
  isAfter,
  isSameDay,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  startOfDay,
} from 'date-fns';
import { it } from 'date-fns/locale';

interface BookingCalendarProps {
  roomSlug: string;
  minNights?: number;
  onDatesSelected?: (checkIn: string, checkOut: string) => void;
}

export default function BookingCalendar({
  roomSlug,
  minNights = 2,
  onDatesSelected,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAvailability = useCallback(async (month: Date) => {
    setLoading(true);
    try {
      const monthStr = format(month, 'yyyy-MM');
      // Fetch current and next month for seamless browsing
      const nextMonthStr = format(addMonths(month, 1), 'yyyy-MM');
      const [res1, res2] = await Promise.all([
        fetch(`/api/availability?room=${roomSlug}&month=${monthStr}`),
        fetch(`/api/availability?room=${roomSlug}&month=${nextMonthStr}`),
      ]);
      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
      const allDates = [
        ...(data1.blockedDates || []),
        ...(data2.blockedDates || []),
      ];
      setBlockedDates(new Set(allDates));
    } catch (err) {
      console.error('Failed to fetch availability:', err);
    } finally {
      setLoading(false);
    }
  }, [roomSlug]);

  useEffect(() => {
    fetchAvailability(currentMonth);
  }, [currentMonth, fetchAvailability]);

  const today = startOfDay(new Date());

  const handleDayClick = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    if (blockedDates.has(dateStr) || isBefore(day, today)) return;

    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      setCheckIn(day);
      setCheckOut(null);
    } else {
      // Set checkout
      if (isBefore(day, checkIn)) {
        setCheckIn(day);
        setCheckOut(null);
      } else {
        setCheckOut(day);
        if (onDatesSelected) {
          onDatesSelected(
            format(checkIn, 'yyyy-MM-dd'),
            format(day, 'yyyy-MM-dd')
          );
        }
      }
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  return (
    <div className="w-full max-w-md">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          disabled={isBefore(subMonths(currentMonth, 1), startOfMonth(today))}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          ←
        </button>
        <h3 className="text-lg font-medium capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: it })}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((name) => (
          <div key={name} className="text-center text-xs text-gray-500 font-medium py-1">
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isBlocked = blockedDates.has(dateStr);
          const isPast = isBefore(day, today);
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isCheckIn = checkIn && isSameDay(day, checkIn);
          const isCheckOut = checkOut && isSameDay(day, checkOut);
          const isInRange =
            checkIn &&
            checkOut &&
            isWithinInterval(day, { start: checkIn, end: checkOut });
          const isDisabled = isBlocked || isPast || !isCurrentMonth;

          return (
            <button
              key={dateStr}
              onClick={() => !isDisabled && handleDayClick(day)}
              disabled={isDisabled}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-md
                transition-colors relative
                ${!isCurrentMonth ? 'text-gray-200' : ''}
                ${isPast && isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''}
                ${isBlocked && isCurrentMonth ? 'bg-red-50 text-red-300 line-through cursor-not-allowed' : ''}
                ${isCheckIn ? 'bg-green-700 text-white font-bold' : ''}
                ${isCheckOut ? 'bg-green-700 text-white font-bold' : ''}
                ${isInRange && !isCheckIn && !isCheckOut ? 'bg-green-100 text-green-800' : ''}
                ${!isDisabled && !isCheckIn && !isCheckOut && !isInRange ? 'hover:bg-green-50 cursor-pointer' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="text-center text-sm text-gray-400 mt-2">
          Caricamento disponibilità...
        </div>
      )}

      {/* Selection info */}
      {checkIn && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium">Check-in:</span>{' '}
          {format(checkIn, 'd MMMM yyyy', { locale: it })}
          {checkOut && (
            <>
              {' → '}
              <span className="font-medium">Check-out:</span>{' '}
              {format(checkOut, 'd MMMM yyyy', { locale: it })}
            </>
          )}
          {!checkOut && <span className="text-gray-400"> → Seleziona check-out</span>}
        </div>
      )}

      {minNights > 1 && (
        <p className="text-xs text-gray-400 mt-1">
          Soggiorno minimo: {minNights} notti
        </p>
      )}
    </div>
  );
}
