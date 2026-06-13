import { Bot, ChartNoAxesCombined, CreditCard } from "lucide-react";
import { services } from "@/lib/data";

const icons = [Bot, ChartNoAxesCombined, CreditCard];

export default function WhatIBuild() {
  return (
    <section className="sec-block services-sec" id="services">
      <div className="sec-block-head">
        <span className="sec-kicker">Client-focused development</span>
        <h2 className="sec-block-title">What I Build</h2>
        <div className="sec-block-rule" />
      </div>

      <div className="services-grid">
        {services.map((service, i) => {
          const Icon = icons[i];
          return (
            <article className="glass-card service-card" key={service.title}>
              <div className="service-icon">
                <Icon size={22} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <ul className="service-list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
