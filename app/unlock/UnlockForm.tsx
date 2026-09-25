"use client";

import { useActionState } from "react";
import { unlock } from "./actions";

export default function UnlockForm() {
  const [state, action, pending] = useActionState(unlock, { error: false });

  return (
    <form
      action={action}
      className="w-full max-w-md border-[3px] border-double border-[#34302B] bg-[#141312] p-6 sm:p-8"
    >
      <h1 className="font-serif text-3xl leading-tight tracking-tight">
        Otherwise Engaged
      </h1>
      <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.14em] text-[#8E8E93] sm:tracking-[0.18em]">
        FOR FRIENDS, NOT FOR CIRCULATION.
      </p>
      <label htmlFor="passcode" className="sr-only">
        Passcode
      </label>
      <input
        id="passcode"
        name="passcode"
        type="password"
        autoFocus
        autoComplete="current-password"
        className="mt-8 w-full border border-[#242220] bg-[#0C0B0A] px-3 py-3 font-mono text-base tracking-[0.2em] text-[#EAE5D9] outline-none focus:border-[#A07E55]"
        placeholder="············"
      />
      {state.error && !pending && (
        <p className="mt-3 font-mono text-[11px] tracking-widest text-[#A07E55]">
          NOT QUITE. TRUFFLES ISN&rsquo;T CONVINCED.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full border border-[#A07E55] px-4 py-3 font-mono text-[11px] tracking-[0.32em] text-[#A07E55] transition hover:bg-[#A07E55] hover:text-[#0C0B0A] disabled:opacity-60"
      >
        {pending ? "CHECKING…" : "COME IN"}
      </button>
      <p className="mt-4 text-center font-serif text-[15px] italic text-[#8E8E93]">
        Don&rsquo;t have it? Text me.
      </p>
    </form>
  );
}
