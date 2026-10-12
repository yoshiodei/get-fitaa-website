import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { P, UL, type LegalSection } from "@/components/legal/LegalPage";
import { COMPANY } from "@/components/legal/company";

export const metadata: Metadata = {
  title: "Privacy Policy | getFitaa",
  description: "How getFitaa collects, uses, shares and protects your personal information.",
};

/*
 * DRAFT TEMPLATE: not legal advice. Have a qualified lawyer in Ghana review and adapt
 * this text, and make sure it matches what your website actually collects and which
 * tools you use (analytics, payment providers, etc.), before you publish. If you are
 * required to register as a data controller with Ghana's Data Protection Commission,
 * add your registration details here.
 */
const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <P>
          {COMPANY.legalName} (&ldquo;{COMPANY.brand}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
          privacy. This Privacy Policy explains what personal information we collect when you use
          our website and book our cleaning services, how we use it, who we share it with, and the
          choices and rights you have.
        </P>
        <P>
          We handle personal information in line with the Data Protection Act, 2012 (Act 843) of
          Ghana and other applicable laws. For the purposes of that law, {COMPANY.legalName} is the
          data controller of the information described in this policy.
        </P>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <P>We collect the following types of information:</P>
        <UL>
          <li>
            <span className="font-semibold">Account details:</span> your name, email address, phone
            number and password (stored in protected form).
          </li>
          <li>
            <span className="font-semibold">Booking details:</span> the service you choose, your
            area and address, the date and time, access instructions, and any notes you give us
            about your property.
          </li>
          <li>
            <span className="font-semibold">Payment information:</span> confirmation that a payment
            was made and its amount. Payments are processed by our payment providers, and we do
            not store your full card or mobile money PIN details.
          </li>
          <li>
            <span className="font-semibold">Communications:</span> messages, emails, feedback,
            reviews and calls you share with us.
          </li>
          <li>
            <span className="font-semibold">Technical information:</span> your device type,
            browser, IP address and how you use our website, collected through cookies and similar
            tools.
          </li>
        </UL>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <>
        <P>We use your information to:</P>
        <UL>
          <li>create and manage your account;</li>
          <li>take, confirm, schedule and carry out your bookings, and send you booking updates;</li>
          <li>process payments and prevent fraud;</li>
          <li>give you customer support and respond to your questions and feedback;</li>
          <li>keep our team and cleaners safe, and improve the quality of our service;</li>
          <li>understand how our website is used so we can improve it;</li>
          <li>send you service-related messages and, where you have agreed, offers and news (you can opt out at any time);</li>
          <li>meet our legal obligations.</li>
        </UL>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Why we may use your information",
    body: (
      <P>
        We only use your personal information where we have a proper reason to do so. Depending on
        the situation, this may be because you have given your consent, because we need the
        information to provide the service you booked, because we have a legitimate interest in
        running and improving our business (which does not override your rights), or because the
        law requires it. Where we rely on your consent, you can withdraw it at any time.
      </P>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <P>We do not sell your personal information. We share it only where needed:</P>
        <UL>
          <li>
            <span className="font-semibold">Our cleaners:</span> the details they need to carry out your
            booking, such as your first name, address, access notes and the service requested.
          </li>
          <li>
            <span className="font-semibold">Service providers:</span> companies that help us run the
            business, such as payment processors, hosting, email and SMS providers, and analytics
            tools. They may only use your information to provide their services to us.
          </li>
          <li>
            <span className="font-semibold">Authorities and advisers:</span> where the law requires
            it, to protect our rights and safety or the safety of others, or to professional
            advisers under a duty of confidentiality.
          </li>
          <li>
            <span className="font-semibold">Business changes:</span> if our business is sold or
            restructured, your information may be transferred to the new owner, who must protect it
            in line with this policy.
          </li>
        </UL>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <P>
        Our website uses cookies and similar technologies. Some are essential to make the website
        work, such as keeping you signed in. Others help us understand how the site is used. You
        can control or delete cookies in your browser settings, but blocking essential cookies may
        stop parts of the website from working properly.
      </P>
    ),
  },
  {
    id: "retention",
    title: "How long we keep your information",
    body: (
      <P>
        We keep your information only for as long as we need it for the purposes in this policy,
        including to provide our services, keep records, resolve disputes and meet legal and
        accounting requirements. When we no longer need it, we delete it or make it anonymous.
      </P>
    ),
  },
  {
    id: "security",
    title: "How we protect your information",
    body: (
      <P>
        We use reasonable technical and organisational measures to protect your information from
        loss, misuse and unauthorised access, including secure connections and restricted access
        for our team. No online service can be completely secure, so we also encourage you to
        choose a strong password and keep it private. If you think your account has been
        compromised, please contact us right away.
      </P>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <P>Under Ghana&apos;s data protection law you have rights over your personal information, including to:</P>
        <UL>
          <li>ask whether we hold information about you and request a copy;</li>
          <li>ask us to correct information that is inaccurate or incomplete;</li>
          <li>ask us to delete your information where we no longer need it;</li>
          <li>object to certain uses of your information, including direct marketing;</li>
          <li>withdraw your consent where we rely on it.</li>
        </UL>
        <P>
          To use any of these rights, contact us using the details below. We may need to confirm
          your identity first. If you are unhappy with how we handle your information, you can also
          complain to Ghana&apos;s Data Protection Commission.
        </P>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <P>
        Our services are intended for adults aged 18 and over. We do not knowingly collect personal
        information from children. If you believe a child has given us their information, please
        contact us and we will delete it.
      </P>
    ),
  },
  {
    id: "transfers",
    title: "Transfers outside Ghana",
    body: (
      <P>
        Some of our service providers (such as hosting or email services) may process information
        outside Ghana. Where this happens, we take reasonable steps to make sure your information
        is still protected to an appropriate standard.
      </P>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <P>
        We may update this Privacy Policy from time to time. We will change the &ldquo;Last
        updated&rdquo; date at the top of this page, and for important changes we will take
        reasonable steps to let you know.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <P>For any privacy question, or to use your rights, please contact us:</P>
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
          Your use of our website and services is also covered by our{" "}
          <Link href="/terms" className="font-semibold text-[#0E7C3A] hover:underline">
            Terms of Service
          </Link>
          .
        </P>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains what information we collect, how we use it and the choices you have."
      lastUpdated={COMPANY.lastUpdated}
      sections={sections}
      related={{ href: "/terms", label: "Terms of Service" }}
    />
  );
}