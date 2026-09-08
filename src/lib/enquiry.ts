/**
 * Shared shape for the enquiry form's state.
 *
 * This lives outside src/app/actions.ts on purpose: that file is marked
 * "use server", and such a file may only export async functions. Exporting the
 * initial-state object from there throws at module load, which takes the whole
 * page down with it.
 */
export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "details" | "privacy", string>>;
};

export const initialEnquiryState: EnquiryState = { status: "idle", message: "" };
