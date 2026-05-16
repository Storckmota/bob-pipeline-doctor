/**
 * CI FAILURE FIXTURE — tests/checkout.test.ts
 *
 * This file represents the failing test from CI run run_1042.
 * It is kept as a reference artifact for IBM Bob IDE analysis
 * and for dashboard display context.
 *
 * No test framework is installed in this MVP (vitest/jest not added).
 * The test structure below documents what the actual test looks like
 * and what the failure was.
 *
 * FAILING TEST (line 47 in actual test suite):
 *
 *   it('should approve a confirmed payment transaction', () => {
 *     const result = validatePaymentStatus({ status: 'confirmed', amount: 99.99, currency: 'USD' })
 *     // 'confirmed' is the terminal approved state from the payment provider
 *     expect(result.normalizedStatus).toBe('approved')  // FAILS: received 'pending'
 *     expect(result.canProceed).toBe(true)              // FAILS: received false
 *   })
 *
 * PASSING TESTS:
 *   ✔ should reject a payment with status 'failed'
 *   ✔ should reject a payment with status 'cancelled'
 *   ✔ should reject a payment with status 'pending'
 *   ✔ should handle missing status field gracefully
 *
 * See data/ci-failure.log for full CI output.
 * See data/bob-remediation-report.json for structured analysis.
 */

export const ciFailureFixture = {
  runId: "run_1042",
  testName: "should approve a confirmed payment transaction",
  file: "tests/checkout.test.ts",
  line: 47,
  input: { status: "confirmed", amount: 99.99, currency: "USD" },
  expected: { normalizedStatus: "approved", canProceed: true },
  received: { normalizedStatus: "pending", canProceed: false },
} as const;
