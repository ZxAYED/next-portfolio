import {
  CheckCheck,
  Fingerprint,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import type { Profile } from "@/lib/portfolio";

const icons = [Fingerprint, CheckCheck, MessagesSquare, ShieldCheck];

export function WhyChooseMe({
  principles,
}: {
  principles: Profile["principles"];
}) {
  return (
    <section id="why-me" className="section why-section" data-theme="dark">
      <div className="container why-grid">
        <div className="why-heading" data-reveal-group>
          <h2>
            Why teams can
            <br />
            <span className="highlight title-highlight">rely on me.</span>
          </h2>
          <p>
            I bring more than implementation. I take ownership, communicate with
            clients, and keep the work moving with the team.
          </p>
          <a className="text-link" href="#experience">
            Explore my experience
          </a>
        </div>
        <div className="why-principles" data-reveal-group>
          {principles.map((principle, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article className="why-principle" key={principle.id}>
                <Icon aria-hidden="true" />
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
