// Reusable InfoCard — fixed for truncation in flex layouts
export default function InfoCard({ icon, label, value, className = '' }) {
  return (
    <div
      className={
        `flex items-center gap-3  sm:p-4 p-3 rounded-xl border  ` +
        ` ${className}`
      }
    >
      <div className="text-indigo-600 flex-shrink-0">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs sm:text-sm  truncate" title={label}>
          {label}
        </p>

        <p className=" font-medium text-sm sm:text-base truncate" title={value}>
          {value}
        </p>
      </div>
    </div>
  );
}
