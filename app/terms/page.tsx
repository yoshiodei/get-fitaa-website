import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { P, UL, type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/components/legal/company";


export const metadata: Metadata = {
  title: "Terms of Service | getFitaa",
  description: "The terms that apply when you use the getFitaa website and book our cleaning services.",
};

/*
 * DRAFT TEMPLATE: not legal advice. Have a qualified lawyer in Ghana review and adapt
 * this text (especially cancellations, liability and governing law) before you publish.
 */
const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <>
        <P>
          These Terms of Service (&ldquo;Terms&rdquo;) apply to your use of the {COMPANY.brand} website and to
          any cleaning service you book through it. By using the website, creating an account or
          making a booking, you agree to these Terms. If you do not agree, please do not use our
          website or services.
        </P>
        <P>
          In these Terms, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean {COMPANY.legalName}, and
          &ldquo;you&rdquo; means the person using the website or booking a service.
        </P>
      </>
    ),
  },
  {
    id: "services",
    title: "Our services",
    body: (
      <>
        <P>
          {COMPANY.brand} is an on-demand cleaning service. Through our website you can book home and
          office cleaning, including Standard Clean, Deep Clean, Move-In / Move-Out, Office Clean
          and related services, in the areas we serve (currently Spintex, Nungua, Klagon, Tema and
          Lashibi).
        </P>
        <P>
          Service descriptions and what is included are shown on our website. We may add, change or
          stop services and service areas from time to time.
        </P>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Your account",
    body: (
      <>
        <P>To make a booking you may need to create an account. You agree to:</P>
        <UL>
          <li>give accurate and up-to-date information, including your name, phone number and address;</li>
          <li>keep your password confidential and tell us straight away if you think it has been misused;</li>
          <li>be responsible for activity that takes place under your account.</li>
        </UL>
        <P>You must be at least 18 years old to create an account and book a service.</P>
      </>
    ),
  },
  {
    id: "bookings",
    title: "Bookings",
    body: (
      <>
        <P>
          When you submit a booking request you are asking us to provide a service at the date,
          time and place you choose. A booking is confirmed once we send you a confirmation. We
          will make every reasonable effort to arrive at the scheduled time, but arrival times may
          be affected by traffic, weather or other circumstances beyond our control.
        </P>
        <P>
          Please give us accurate details about your property (such as size and number of rooms)
          and any special requirements. If the actual job is significantly different from what you
          told us, we may need to adjust the price or the time needed, and we will tell you before
          we continue.
        </P>
      </>
    ),
  },
  {
    id: "prices",
    title: "Prices and payment",
    body: (
      <>
        <P>
          Prices are shown in Ghana cedis (₵). The prices on our website are starting rates and may
          vary with the size and condition of your space. We will show you a price estimate before
          you confirm your booking, and we do not add hidden fees.
        </P>
        <P>
          You agree to pay for the services you book using the payment methods we offer. Payments
          are handled by trusted third-party payment providers, and we do not store your full card
          details.
        </P>
      </>
    ),
  },
  {
    id: "cancellations",
    title: "Cancellations and rescheduling",
    body: (
      <>
        <P>
          Plans change, and we understand. If you need to cancel or reschedule, please contact us
          as early as possible using the details in the &ldquo;Contact us&rdquo; section below.
        </P>
        <UL>
          <li>Cancellations or changes made well before the scheduled time are free of charge.</li>
          <li>
            Late cancellations, or if our cleaner cannot access the property when they arrive, may
            be charged a fee to cover the cleaner&apos;s time.
          </li>
        </UL>
        <P>
          We may also need to reschedule a booking in rare cases, for example due to illness or
          severe weather. If we do, we will offer you a new time or a refund of any amount paid for
          that booking.
        </P>
      </>
    ),
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    body: (
      <>
        <P>To help us do a great job, you agree to:</P>
        <UL>
          <li>make sure our cleaner can safely access the property at the booked time;</li>
          <li>keep valuables, cash, important documents and fragile or sentimental items safely put away;</li>
          <li>tell us about pets, hazards, or anything that may affect the cleaner&apos;s safety;</li>
          <li>provide water and electricity at the property;</li>
          <li>treat our cleaners with respect. We may end a visit if a cleaner feels unsafe or is harassed.</li>
        </UL>
      </>
    ),
  },
  {
    id: "service-standards",
    title: "Our cleaners and service standards",
    body: (
      <>
        <P>
          Our cleaners are vetted, trained and equipped to carry out the services you book. We
          bring our own equipment and cleaning products unless we agree otherwise. We aim to
          deliver every service with reasonable care and skill.
        </P>
        <P>
          If you are not happy with a clean, please tell us within 24 hours of the visit, with
          details and, if possible, photos. We will work with you to put things right, which may
          include a return visit to fix the problem.
        </P>
      </>
    ),
  },
  {
    id: "liability",
    title: "Damage, loss and liability",
    body: (
      <>
        <P>
          We take care of your property. If you believe something was damaged or lost during a
          visit, please contact us as soon as possible (and within 48 hours) so we can look into
          it and, where we are responsible, resolve it fairly.
        </P>
        <P>
          To the extent allowed by law, we are not responsible for pre-existing damage, normal wear
          and tear, items that were not safely stored, or losses we could not reasonably have
          foreseen. Our total liability for any single booking is limited to the amount you paid
          for that booking, except where the law does not allow us to limit liability. Nothing in
          these Terms limits any rights you have under Ghanaian law that cannot be excluded.
        </P>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use of the website",
    body: (
      <>
        <P>You agree not to:</P>
        <UL>
          <li>use the website for anything unlawful, fraudulent or harmful;</li>
          <li>give false information or pretend to be someone else;</li>
          <li>interfere with the website&apos;s security or operation, or try to access it without permission;</li>
          <li>copy, scrape or reuse our content in a way that is not allowed under these Terms.</li>
        </UL>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <P>
        The {COMPANY.brand} name, logo, website design, text, images and other content belong to us or
        our licensors and are protected by law. You may use the website for your own personal or
        business use of our services, but you may not copy or reproduce our content without our
        written permission.
      </P>
    ),
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    body: (
      <P>
        We may suspend or close your account, or refuse a booking, if you break these Terms, give
        false information, behave abusively towards our team, or misuse the website. You may close
        your account at any time by contacting us. Closing an account does not affect any amounts
        you already owe or rights that have already arisen.
      </P>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <P>
        We may update these Terms from time to time. When we do, we will change the &ldquo;Last
        updated&rdquo; date at the top of this page, and for significant changes we will take
        reasonable steps to let you know. By continuing to use the website or book services after
        an update, you accept the updated Terms.
      </P>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <P>
        These Terms are governed by the laws of the Republic of Ghana. If we cannot resolve a
        dispute together, it will be dealt with by the courts of Ghana. We encourage you to
        contact us first so we can try to resolve any concern quickly.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <P>If you have any questions about these Terms, please get in touch:</P>
        <UL>
          <li>
            Email:{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-semibold text-[#0E7C3A] hover:underline">
              {COMPANY.email}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="font-semibold text-[#0E7C3A] hover:underline">
              {COMPANY.phone}
            </a>
          </li>
          <li>Address: {COMPANY.address}</li>
        </UL>
        <P>
          You can also read our{" "}
          <Link href="/faq" className="font-semibold text-[#0E7C3A] hover:underline">
            FAQs
          </Link>{" "}
          for quick answers.
        </P>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="Please read these terms carefully. They explain how our website and cleaning services work, and what you can expect from us and we from you."
      lastUpdated={COMPANY.lastUpdated}
      sections={sections}
      related={{ href: "/privacy", label: "Privacy Policy" }}
    />
  );
}