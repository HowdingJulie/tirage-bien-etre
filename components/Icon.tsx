type Name = 'leaf' | 'arrow' | 'sparkles' | 'heart' | 'sun' | 'bulb' | 'sound' | 'muted' | 'check';
const paths: Record<Name, string> = {
    leaf: 'M20 4C11 2 3 6 4 13c1 7 10 9 15 2 2-3 2-7 1-11ZM6 10l10 9M10 14l1-5M13 17l5-1',
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    sparkles: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM4 2v4M2 4h4m14 14v4m-2-2h4',
    heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
    sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
    bulb: 'M9 18h6m-5 3h4M9 15c0-2-3-3-3-7a6 6 0 0 1 12 0c0 4-3 5-3 7H9Z',
    sound: 'M11 4 6 8H2v8h4l5 4V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
    muted: 'M11 4 6 8H2v8h4l5 4V4Zm5 5 6 6m0-6-6 6',
    check: 'm5 12 4 4L19 6',
};
export function Icon({ name, className = '' }: { name: Name; className?: string }) {
    return <svg aria-hidden="true" className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}
