import WaggingTruffles from "../components/WaggingTruffles";
import UnlockForm from "./UnlockForm";

export default function UnlockPage() {
  return (
    <main className="gate-veil flex min-h-dvh flex-col items-center justify-center bg-[#0C0B0A] p-6">
      {/* Truffles on door duty, awake and wagging (he naps at the bottom of the site) */}
      <div className="mb-2 flex flex-col items-center">
        <WaggingTruffles />
        <p className="pencil mt-1 text-[16px] text-[#9A9282]">
          Truffles is guarding the door. (He&rsquo;s terrible at it.)
        </p>
      </div>
      <UnlockForm />
    </main>
  );
}
