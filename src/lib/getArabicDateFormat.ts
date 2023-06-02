export default function getArabicDateFormat(date: Date) {
  return new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(date));
}