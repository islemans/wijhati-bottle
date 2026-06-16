"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

interface ProductTabsProps {
  description: string;
  category: "MAKEUP" | "SKINCARE" | "FRAGRANCE" | "FASHION" | "ACCESSORIES";
  // For makeup/skincare: array of ingredient strings
  ingredients?: string[];
  // For fashion: fabric composition string + care instructions
  fabricComposition?: string;
  careInstructions?: string[];
  howToUse?: string;
}

function IngredientsList({ items }: { items: string[] }) {
  return (
    <div>
      <p
        className="mb-3 text-xs leading-relaxed text-[var(--brand-muted)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Full ingredient list (INCI):
      </p>
      <p
        className="text-sm leading-7 text-[var(--brand-foreground)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {items.join(", ")}.
      </p>
    </div>
  );
}

function FabricDetails({
  composition,
  care,
}: {
  composition: string;
  care: string[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4
          className="mb-1.5 text-xs uppercase tracking-widest text-[var(--brand-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Composition
        </h4>
        <p className="text-sm text-[var(--brand-foreground)]" style={{ fontFamily: "var(--font-sans)" }}>
          {composition}
        </p>
      </div>
      <div>
        <h4
          className="mb-2 text-xs uppercase tracking-widest text-[var(--brand-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Care Instructions
        </h4>
        <ul className="flex flex-col gap-1.5">
          {care.map((instruction, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--brand-foreground)]" style={{ fontFamily: "var(--font-sans)" }}>
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--brand-primary)]" />
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProductTabs({
  description,
  category,
  ingredients,
  fabricComposition,
  careInstructions,
  howToUse,
}: ProductTabsProps) {
  const isMakeup = ["MAKEUP", "SKINCARE", "FRAGRANCE"].includes(category);

  const tabs: Tab[] = [
    {
      id: "description",
      label: "Details",
      content: (
        <p
          className="text-sm leading-7 text-[var(--brand-foreground)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {description}
        </p>
      ),
    },
    ...(isMakeup && ingredients
      ? [
          {
            id: "ingredients",
            label: "Ingredients",
            content: <IngredientsList items={ingredients} />,
          },
        ]
      : []),
    ...(!isMakeup && fabricComposition
      ? [
          {
            id: "composition",
            label: "Fabric & Care",
            content: (
              <FabricDetails
                composition={fabricComposition}
                care={careInstructions ?? []}
              />
            ),
          },
        ]
      : []),
    ...(howToUse
      ? [
          {
            id: "how-to-use",
            label: isMakeup ? "How to Apply" : "Styling Notes",
            content: (
              <p
                className="text-sm leading-7 text-[var(--brand-foreground)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {howToUse}
              </p>
            ),
          },
        ]
      : []),
  ];

  const [activeId, setActiveId] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === activeId)!;

  return (
    <div>
      {/* Tab bar */}
      <div className="relative flex border-b border-[var(--brand-border)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`relative pb-3 pr-6 text-sm transition-colors duration-150 ${
              tab.id === activeId
                ? "text-[var(--brand-foreground)]"
                : "text-[var(--brand-muted)] hover:text-[var(--brand-foreground)]"
            }`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {tab.label}
            {tab.id === activeId && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-6 h-px bg-[var(--brand-foreground)]"
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeId}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="pt-6"
      >
        {activeTab.content}
      </motion.div>
    </div>
  );
}
