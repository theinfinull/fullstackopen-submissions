const buttonBase =
    "rounded-lg border-[3px] border-ink px-4 py-3 text-sm font-black uppercase tracking-[-0.06em] text-ink shadow-button transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:saturate-115 hover:shadow-button-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-button-active focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";
const headerBase =
    "text-4xl font-black uppercase leading-none -tracking-widest text-ink sm:text-5xl";

export default function FeedbackForm({
    goodFeedbackHandler,
    neutralFeedbackHandler,
    badFeedbackHandler,
}) {
    return (
        <section className="grid gap-5">
            <h1 className={headerBase}>Add FeedBack</h1>
            <div className="grid gap-3 sm:grid-cols-3">
                <button
                    className={`${buttonBase} bg-good`}
                    onClick={goodFeedbackHandler}
                >
                    Good
                </button>
                <button
                    className={`${buttonBase} bg-neutral`}
                    onClick={neutralFeedbackHandler}
                >
                    Neutral
                </button>
                <button
                    className={`${buttonBase} bg-bad`}
                    onClick={badFeedbackHandler}
                >
                    Bad
                </button>
            </div>
        </section>
    );
}
