/** Lightweight vector ornament shared by both sides of the cards. */
function BotanicalSprig() {
    return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M12 91C25 63 46 32 88 12M14 90C28 83 52 76 76 77" stroke="currentColor" strokeWidth="1.25" />
        <g fill="currentColor" stroke="#b68b43" strokeWidth=".55">
            <path d="M23 70C8 66 8 52 10 45c11 6 16 15 13 25Z" /><path d="M25 66c-2-16 7-24 14-28 2 13-3 22-14 28Z" />
            <path d="M37 48c-14-3-17-15-16-22 11 3 18 12 16 22Z" /><path d="M39 46c1-14 11-20 18-21-1 12-8 19-18 21Z" />
            <path d="M53 32c-11-4-12-14-11-21 9 5 13 12 11 21Z" /><path d="M57 29c5-11 14-14 21-12-5 10-11 14-21 12Z" />
            <path d="M75 17c-3-10 3-15 8-17 4 8 1 14-8 17Z" />
            <path d="M30 83c1-11 8-16 14-17-1 9-5 15-14 17Z" /><path d="M38 81c7 10 18 10 23 7-8-8-15-10-23-7Z" />
            <path d="M51 78c4-10 12-13 18-12-4 9-9 13-18 12Z" /><path d="M61 78c7 7 17 7 23 3-8-5-15-6-23-3Z" />
        </g>
        <g fill="#bd914b"><ellipse cx="20" cy="78" rx="2" ry="3" transform="rotate(-35 20 78)" /><ellipse cx="47" cy="42" rx="2" ry="3" transform="rotate(35 47 42)" /><ellipse cx="65" cy="24" rx="1.7" ry="2.7" /><circle cx="82" cy="76" r="2.2" /><circle cx="17" cy="35" r="1.7" /></g>
    </svg>;
}

export function CardOrnaments() {
    return <span className="card-ornaments" aria-hidden="true">
        <span className="botanical-corner top-left"><BotanicalSprig /></span>
        <span className="botanical-corner top-right"><BotanicalSprig /></span>
        <span className="botanical-corner bottom-left"><BotanicalSprig /></span>
        <span className="botanical-corner bottom-right"><BotanicalSprig /></span>
        <svg className="card-north-star star-top" viewBox="0 0 40 48" fill="none"><path d="m20 1 2.7 18.5L35 13l-9.5 10L39 24l-14 2L32 36l-10-7L20 47l-2.5-18L8 36l6.5-10L1 24l13.5-1L5 13l12.5 6.5L20 1Z" fill="#bd914b" /><path d="M20 7v34M7 24h26" stroke="#f8edcf" strokeWidth=".6" /></svg>
        <svg className="card-north-star star-bottom" viewBox="0 0 40 48" fill="none"><path d="m20 1 3 18 12-6-9 10 13 1-14 2 7 10-10-7-2 18-2-18-10 7 7-10-14-2 13-1-9-10 12 6 3-18Z" fill="#bd914b" /></svg>
    </span>;
}
