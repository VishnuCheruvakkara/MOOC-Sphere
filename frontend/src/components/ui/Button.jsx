// components/common/Button.jsx

export default function Button({
  text,
  onClick,
  icon,
  type = "outline",
}) {

  const styles =
    type === "primary"
      ? `
        flex items-center justify-center gap-2
        px-3 py-2
        border-2 border-deep-lavender-400
        bg-deep-lavender-400
        text-butter-cream-100
        font-semibold cursor-pointer
      `
      : `
        flex items-center justify-center gap-2
        px-3 py-2
        border-2 border-deep-lavender-300
        text-deep-lavender-500
        font-semibold
        hover:bg-butter-cream-200 cursor-pointer
      `;

  return (
    <button
      onClick={onClick}
      className={styles}
    >
      {icon}

      {text}
    </button>
  );
}