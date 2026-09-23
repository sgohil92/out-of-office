"use client";

import { useSyncExternalStore } from "react";
import type { Invite } from "../../content/invites";
import "./sections.css";

/** When this page was opened in the reader's browser. */
const openedAt = Date.now();
const noChanges = () => () => {};

/** "09.27.2026" → the first moment it should stop showing (the next day). */
function hidesAt(until: string) {
  const [m, d, y] = until.split(".").map(Number);
  if (!m || !d || !y) return Infinity;
  return new Date(y, m - 1, d + 1).getTime();
}

function rsvpHref(invite: Invite, email: string) {
  if (invite.rsvpLink) return invite.rsvpLink;
  const subject = `RSVP: ${invite.title}`;
  const body = `Count me in for ${invite.title} (${invite.when}, ${invite.where}).\n\n— `;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Ticket({ invite, email }: { invite: Invite; email: string }) {
  return (
    <article className="ooo-ticket relative grid sm:grid-cols-[minmax(0,1fr)_auto]">
      <div className="relative px-5 pb-4 pt-5 sm:px-7 sm:pb-5 sm:pt-6">
        <p aria-hidden className="ooo-rubber-stamp absolute right-4 top-4 font-mono text-[7px] font-bold tracking-[0.18em] sm:right-6 sm:top-5 sm:text-[8px]">
          YOU&rsquo;RE INVITED
        </p>
        <p className="font-mono text-[10px] tracking-[0.26em] text-[#8C7D63]">COME ALONG</p>
        <h2 className="mt-2 max-w-[20ch] font-serif text-[26px] leading-[1.05] tracking-tight text-[#1E1A16] sm:max-w-none sm:text-[32px]">
          {invite.title}
        </h2>
        <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-[#3A332B] sm:text-[12px]">
          {invite.when.toUpperCase()} <span className="text-[#A07E55]">·</span> {invite.where.toUpperCase()}
        </p>
        {invite.note ? (
          <p className="mt-2 max-w-prose font-serif text-[15px] italic leading-snug text-[#5A5247]">
            {invite.note}
          </p>
        ) : null}
      </div>
      <div className="ooo-ticket-stub flex items-center justify-between gap-4 px-5 py-4 sm:flex-col sm:justify-center sm:px-6">
        <p className="font-mono text-[9px] leading-relaxed tracking-[0.22em] text-[#8C7D63] sm:text-center">
          ADMIT ONE
          <br />
          (+ TRUFFLES)
        </p>
        <a
          href={rsvpHref(invite, email)}
          target={invite.rsvpLink ? "_blank" : undefined}
          rel={invite.rsvpLink ? "noreferrer" : undefined}
          className="shrink-0 border border-[#9A3A28] px-4 py-2.5 font-mono text-[10px] tracking-[0.28em] text-[#9A3A28] transition hover:bg-[#9A3A28] hover:text-[#F3EAD6] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#9A3A28]"
        >
          RSVP →
        </a>
      </div>
    </article>
  );
}

export default function InviteTicket({ invites, email }: { invites: Invite[]; email: string }) {
  // Checked in the reader's browser, so past invites vanish without rebuilding the site.
  const now = useSyncExternalStore(
    noChanges,
    () => openedAt,
    () => null,
  );
  const current = invites.filter((invite) => now === null || now < hidesAt(invite.until));
  if (current.length === 0) return null;

  return (
    <section
      aria-label="Invitations"
      className="relative z-10 border-b-[3px] border-double border-[#34302B] px-5 py-8 sm:px-10 lg:px-14"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        {current.map((invite, i) => (
          <div key={invite.id} className={i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"}>
            <Ticket invite={invite} email={email} />
          </div>
        ))}
      </div>
    </section>
  );
}
