"use client";

import { useState } from "react";
import { Notice, SectionCard, Toggle, primaryBtn } from "./Ui";

const DEFAULTS = {
  bookingEmail: true,
  bookingSms: true,
  reminders: true,
  promos: false,
  news: false,
};

export default function Notifications() {
  const [prefs, setPrefs] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key: keyof typeof DEFAULTS) => (v: boolean) => {
    setPrefs((p) => ({ ...p, [key]: v }));
    setSaved(false);
  };

  async function save() {
    setSaving(true);
    // TODO: save preferences to your API
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setSaved(true);
  }

  return (
    <SectionCard title="Notifications" description="Choose how and when we contact you.">
      {saved && <div className="mb-4"><Notice>Your preferences have been saved.</Notice></div>}

      <div className="divide-y divide-neutral-100">
        <Toggle id="n-booking-email" checked={prefs.bookingEmail} onChange={set("bookingEmail")} label="Booking confirmations by email" description="Receipts and confirmations for your bookings." />
        <Toggle id="n-booking-sms" checked={prefs.bookingSms} onChange={set("bookingSms")} label="Booking updates by SMS" description="Cleaner arrival and schedule changes." />
        <Toggle id="n-reminders" checked={prefs.reminders} onChange={set("reminders")} label="Reminders before your clean" description="A reminder the day before your booking." />
        <Toggle id="n-promos" checked={prefs.promos} onChange={set("promos")} label="Offers and discounts" description="Occasional deals on our services." />
        <Toggle id="n-news" checked={prefs.news} onChange={set("news")} label="News and tips" description="Cleaning tips and company updates." />
      </div>

      <button type="button" onClick={save} disabled={saving} className={`${primaryBtn} mt-6`}>
        {saving ? "Saving..." : "Save preferences"}
      </button>
    </SectionCard>
  );
}