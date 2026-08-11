import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Container from "../components/ui/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { getPublishedJewelryBySlug } from "../repositories/jewelryRepository";
import { createInquiry } from "../repositories/inquiryRepository";
import type { Jewelry } from "../repositories/jewelryRepository";

type JewelryContextStatus = "idle" | "loading" | "resolved" | "unresolved";
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const PHONE_PATTERN = /^[0-9+\-()\s]{7,20}$/;
const MESSAGE_MAX_LENGTH = 2000;

const inquirySchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || PHONE_PATTERN.test(value), {
      message: "Please enter a valid phone number.",
    }),
  preferredContactMethod: z.string(),
  message: z
    .string()
    .trim()
    .min(1, "Please tell us a little about what you're looking for.")
    .max(
      MESSAGE_MAX_LENGTH,
      `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`,
    ),
  website: z.string(),
});

type FormValues = z.infer<typeof inquirySchema>;

const INITIAL_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  preferredContactMethod: "",
  message: "",
  website: "",
};

export default function InquiryPage() {
  useDocumentTitle("Start an Inquiry — RMS Jewelries");

  const [searchParams] = useSearchParams();
  const jewelrySlug = searchParams.get("jewelry");

  const [jewelryStatus, setJewelryStatus] = useState<JewelryContextStatus>(
    () => (jewelrySlug ? "loading" : "idle"),
  );
  const [jewelry, setJewelry] = useState<Jewelry | null>(null);

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const isSubmittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: INITIAL_VALUES,
  });

  useEffect(() => {
    if (!jewelrySlug) {
      return;
    }

    let isActive = true;

    getPublishedJewelryBySlug(jewelrySlug)
      .then((found) => {
        if (!isActive) return;
        if (found) {
          setJewelry(found);
          setJewelryStatus("resolved");
        } else {
          setJewelry(null);
          setJewelryStatus("unresolved");
        }
      })
      .catch(() => {
        if (!isActive) return;
        setJewelry(null);
        setJewelryStatus("unresolved");
      });

    return () => {
      isActive = false;
    };
  }, [jewelrySlug]);

  async function onSubmit(values: FormValues) {
    isSubmittingRef.current = true;
    setSubmitStatus("submitting");

    try {
      await createInquiry({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        preferredContactMethod: values.preferredContactMethod || null,
        message: values.message.trim(),
        jewelryId: jewelryStatus === "resolved" ? (jewelry?.id ?? null) : null,
      });

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      isSubmittingRef.current = false;
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) return;

    if (getValues("website").trim() !== "") {
      setSubmitStatus("success");
      return;
    }

    void handleSubmit(onSubmit)(event);
  }

  const fieldClassName =
    "mt-2 w-full border border-rms-charcoal/20 bg-transparent px-4 py-3 text-sm text-rms-charcoal placeholder:text-rms-muted/60 focus:outline-none focus:border-rms-charcoal";
  const labelClassName = "text-sm font-medium text-rms-charcoal";
  const errorClassName = "mt-2 text-xs text-red-700";

  return (
    <main>
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            {submitStatus === "success" ? (
              <div className="border border-rms-charcoal/10 px-8 py-16 text-center">
                <h1 className="font-display text-3xl font-medium text-rms-charcoal">
                  Thank you for your inquiry.
                </h1>
                <p className="mt-4 text-sm leading-6 text-rms-muted">
                  We&apos;ve received your message and will get back to you
                  soon.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  {jewelryStatus === "resolved" && jewelry && (
                    <Link
                      to={`/jewelry/${jewelry.slug}`}
                      className="border border-rms-charcoal/20 px-6 py-2.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
                    >
                      Back to Jewelry
                    </Link>
                  )}
                  <Link
                    to="/collections"
                    className="border border-rms-charcoal/20 px-6 py-2.5 text-sm font-medium text-rms-charcoal transition-colors hover:border-rms-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory"
                  >
                    Return to Collections
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
                  Inquiry
                </p>
                <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-rms-charcoal sm:text-5xl">
                  Start a Conversation
                </h1>
                <p className="mt-5 text-base leading-7 text-rms-muted">
                  Tell us a little about what you have in mind. A member of
                  RMS will personally follow up to continue the conversation.
                </p>

                {jewelrySlug && jewelryStatus === "loading" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-10 border border-rms-charcoal/10 p-6"
                  >
                    <span className="sr-only">Loading piece details…</span>
                    <div aria-hidden="true" className="animate-pulse">
                      <div className="h-3 w-24 bg-black/5" />
                      <div className="mt-3 h-6 w-1/2 bg-black/5" />
                      <div className="mt-2 h-4 w-1/3 bg-black/5" />
                    </div>
                  </div>
                )}

                {jewelryStatus === "resolved" && jewelry && (
                  <div className="mt-10 flex items-center gap-5 border border-rms-charcoal/10 p-6">
                    <div
                      className="h-20 w-16 flex-shrink-0 overflow-hidden bg-black/5"
                      aria-hidden="true"
                    >
                      {jewelry.cover_image_url ? (
                        <img
                          src={jewelry.cover_image_url}
                          alt=""
                          width="64"
                          height="80"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-display text-xs text-rms-muted/50">
                            RMS
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-rms-muted">
                        Inquiry About
                      </p>
                      <p className="mt-1 font-display text-xl font-medium text-rms-charcoal">
                        {jewelry.name}
                      </p>
                      <p className="text-sm text-rms-muted">
                        {jewelry.material}
                      </p>
                    </div>
                  </div>
                )}

                {jewelryStatus === "unresolved" && (
                  <p className="mt-10 border border-rms-charcoal/10 p-6 text-sm text-rms-muted">
                    The piece you were viewing is no longer available, but
                    you&apos;re welcome to send a general inquiry below.
                  </p>
                )}

                <form
                  noValidate
                  onSubmit={handleFormSubmit}
                  className="mt-10 space-y-7"
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </div>

                  <div>
                    <label htmlFor="fullName" className={labelClassName}>
                      Full name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={
                        errors.fullName ? "fullName-error" : undefined
                      }
                      className={fieldClassName}
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p
                        id="fullName-error"
                        role="alert"
                        className={errorClassName}
                      >
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClassName}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className={fieldClassName}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className={errorClassName}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClassName}>
                      Contact number{" "}
                      <span className="text-rms-muted">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      className={fieldClassName}
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p id="phone-error" role="alert" className={errorClassName}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="preferredContactMethod"
                      className={labelClassName}
                    >
                      Preferred contact method{" "}
                      <span className="text-rms-muted">(optional)</span>
                    </label>
                    <select
                      id="preferredContactMethod"
                      className={fieldClassName}
                      {...register("preferredContactMethod")}
                    >
                      <option value="">No preference</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="Messenger">Messenger</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClassName}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={fieldClassName}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className={errorClassName}
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitStatus === "error" && (
                    <p role="alert" className={errorClassName}>
                      We couldn&apos;t send your inquiry right now. Please
                      try again in a moment.
                    </p>
                  )}

                  <p className="text-xs leading-5 text-rms-muted">
                    The information you submit will be used to respond to
                    your inquiry. See our{" "}
                    <Link
                      to="/privacy"
                      className="text-rms-charcoal underline underline-offset-2 hover:text-rms-gold"
                    >
                      Privacy Notice
                    </Link>{" "}
                    for details on how we handle your information.
                  </p>

                  <div>
                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="inline-block bg-rms-charcoal px-8 py-3.5 text-sm font-medium text-rms-ivory transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rms-gold focus-visible:ring-offset-4 focus-visible:ring-offset-rms-ivory disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitStatus === "submitting"
                        ? "Submitting…"
                        : "Send Inquiry"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
