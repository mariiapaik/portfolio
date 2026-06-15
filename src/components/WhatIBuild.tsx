import { Bot, ChartNoAxesCombined, CreditCard } from "lucide-react";
import { services } from "@/lib/data";

const icons = { agent: Bot, dashboard: ChartNoAxesCombined, website: CreditCard };

function Chrome({ label }: { label: string }) {
  return (
    <div className="svc-bar">
      <span className="svc-bdot svc-bdot--r" />
      <span className="svc-bdot svc-bdot--y" />
      <span className="svc-bdot svc-bdot--g" />
      <span className="svc-bar-label">{label}</span>
    </div>
  );
}

function ServiceVisual({ kind }: { kind: "agent" | "dashboard" | "website" }) {
  if (kind === "agent") {
    return (
      <div className="svc-visual">
        <Chrome label="agent.run()" />
        <div className="svc-term">
          <p>
            <span className="svc-pmt">$</span> launch --offer &quot;summer-sale&quot;
          </p>
          <p className="svc-ok">✓ generated 6 creatives</p>
          <p className="svc-ok">✓ published to 3 sources</p>
          <p className="svc-run">
            ▶ optimizing budget<span className="svc-caret">_</span>
          </p>
        </div>
      </div>
    );
  }
  if (kind === "dashboard") {
    const bars = [42, 68, 55, 80, 62, 95, 74];
    return (
      <div className="svc-visual">
        <Chrome label="analytics" />
        <div className="svc-dash">
          <div className="svc-kpis">
            <div className="svc-kpi">
              <span>ROI</span>
              <b>+38%</b>
            </div>
            <div className="svc-kpi">
              <span>LOAD</span>
              <b>0.4s</b>
            </div>
          </div>
          <div className="svc-chart">
            {bars.map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="svc-visual">
      <Chrome label="checkout" />
      <div className="svc-web">
        <div className="svc-web-hero" />
        <div className="svc-web-row">
          <span />
          <span />
        </div>
        <div className="svc-pay">Pay €49 →</div>
      </div>
    </div>
  );
}

export default function WhatIBuild() {
  return (
    <section className="sec-block services-sec" id="services">
      <div className="sec-block-head">
        <span className="sec-kicker">Client-focused development</span>
        <h2 className="sec-block-title">What I Build</h2>
        <div className="sec-block-rule" />
      </div>

      <div className="services-grid">
        {services.map((service) => {
          const Icon = icons[service.visual];
          return (
            <article className="glass-card service-card" key={service.title}>
              <ServiceVisual kind={service.visual} />
              <div className="service-body">
                <h3 className="service-title">
                  <span className="service-ic">
                    <Icon size={16} />
                  </span>
                  {service.title}
                </h3>
                <p className="service-plain">{service.plain}</p>
                <ul className="service-list">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
