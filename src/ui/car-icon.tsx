import * as React from "react";

export default function CarIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      width={32}
      height={32}
      {...props}
    >
      <path d="M25.333 22.667h2.667c.8 0 1.333-.533 1.333-1.333v-4c0-1.2-.933-2.267-2-2.533C24.933 14.133 21.333 13.333 21.333 13.333s-1.733-1.867-2.933-3.067c-.667-.533-1.467-.933-2.4-.933H6.667c-.8 0-1.467.533-1.867 1.2l-1.867 3.867A4.933 4.933 0 0 0 2.667 16v5.333c0 .8.533 1.333 1.333 1.333h2.667" />
      <circle cx={9.333} cy={22.667} r={2.667} />
      <path d="M12 22.667h8" />
      <circle cx={22.667} cy={22.667} r={2.667} />
    </svg>
  );
}
