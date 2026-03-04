export function formatLocationLocalTime(dtSeconds, tzOffsetSeconds, locale = 'pl-PL') {
  if (!dtSeconds) return null;
  const localTsMs = (dtSeconds + (tzOffsetSeconds || 0)) * 1000;
  const date = new Date(localTsMs);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC' 
  }).format(date);
}