type ContactIconType = "whatsapp" | "email";

interface ContactIconProps {
  type: ContactIconType;
  className?: string;
}

export function ContactIcon({ type, className }: ContactIconProps) {
  if (type === "email") {
    return (
      <svg className={className ?? "contact-icon"} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4.75 6.75h14.5v10.5H4.75z" />
        <path d="m5.5 7.5 6.5 5 6.5-5" />
      </svg>
    );
  }

  return (
    <svg className={className ?? "contact-icon"} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4.25a7.5 7.5 0 0 0-6.4 11.42l-.85 3.08 3.18-.82A7.5 7.5 0 1 0 12 4.25Z" />
      <path d="M9.7 8.75c-.18-.4-.37-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.23-.84.82-.84 2 0 1.17.86 2.3.98 2.46.12.16 1.68 2.68 4.17 3.64 2.07.8 2.5.64 2.95.6.45-.04 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.46-.28-.24-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.2-.72-.65-1.2-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.76-1.77Z" />
    </svg>
  );
}
