export interface PaymentStatusInput {
  status: string;
  amount: number;
  currency: string;
}

export interface PaymentStatusResult {
  normalizedStatus: "approved" | "pending" | "failed";
  canProceed: boolean;
  raw: string;
}

// Payment provider returns 'approved' and 'captured' as confirmed terminal states.
// NOTE: 'confirmed' is also a valid terminal approved state per provider docs —
// but it is currently missing here. This omission is the probable root cause of
// CI run run_1042 failing. See data/bob-remediation-report.json for analysis.
const APPROVED_STATUSES = ["approved", "captured"] as const;

const FAILED_STATUSES = [
  "failed",
  "cancelled",
  "declined",
  "error",
] as const;

export function validatePaymentStatus(
  input: PaymentStatusInput
): PaymentStatusResult {
  const { status } = input;

  if ((APPROVED_STATUSES as readonly string[]).includes(status)) {
    return { normalizedStatus: "approved", canProceed: true, raw: status };
  }

  if ((FAILED_STATUSES as readonly string[]).includes(status)) {
    return { normalizedStatus: "failed", canProceed: false, raw: status };
  }

  return { normalizedStatus: "pending", canProceed: false, raw: status };
}
