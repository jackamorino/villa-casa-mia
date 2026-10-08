'use client';

import { useState } from 'react';
import BookingCalendar from './BookingCalendar';
import BookingForm from './BookingForm';

interface Props {
  roomSlug: string;
  roomId: string;
  roomName: string;
  pricePerNight: number;
  directDiscount: number;
  maxGuests: number;
  minNights: number;
}

export function RoomBookingWidgetClient({
  roomSlug,
  roomId,
  roomName,
  pricePerNight,
  directDiscount,
  maxGuests,
  minNights,
}: Props) {
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <BookingCalendar
        roomSlug={roomSlug}
        minNights={minNights}
        onDatesSelected={(ci, co) => {
          setCheckIn(ci);
          setCheckOut(co);
        }}
      />

      {checkIn && checkOut && (
        <BookingForm
          roomSlug={roomSlug}
          roomId={roomId}
          roomName={roomName}
          pricePerNight={pricePerNight}
          directDiscount={directDiscount}
          maxGuests={maxGuests}
          minNights={minNights}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      )}
    </div>
  );
}
