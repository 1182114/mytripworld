type PackageKind = "tour" | "cruise" | "inbound";

// Owner-approved payment schedules apply to every package, including CMS content.
export function paymentPolicy(kind: PackageKind): string[] {
  return kind === "cruise"
    ? [
        "50% of the total package cost at the time of booking.",
        "25% of the total package cost at least 60 days before tour departure.",
        "Remaining 25% of the total package cost at least 25 days before tour departure.",
      ]
    : [
        "50% of the total package cost at the time of booking.",
        "Remaining 50% of the total package cost at least 25 days before tour departure.",
      ];
}

export function paymentTerms(terms: string[], kind: PackageKind): string[] {
  let replaced = false;
  return terms.flatMap((term) => {
    // Replace old instalment clauses while retaining cancellation and other terms.
    const isSchedule = /\badvance payment\b/i.test(term)
      || /\b(?:remaining|further)\s+\d+%.*\b(?:paid|departure)\b/i.test(term);
    if (!isSchedule) return [term];
    if (replaced) return [];
    replaced = true;
    return [paymentPolicy(kind).join(" ")];
  });
}
