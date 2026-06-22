const statBase =
    "flex justify-between gap-8 border-l-8 border-ink px-4 py-3 font-bold uppercase tracking-[-0.04em] text-ink";
const headerBase =
    "text-4xl font-black uppercase leading-none -tracking-widest text-ink sm:text-5xl";

export default function Stats({ good, neutral, bad }) {
    const total = good + neutral + bad;

    if (!total) {
        return (
            <section className="grid gap-4">
                <h1 className={headerBase}>Stats</h1>
                <p className={`${statBase} bg-ink/10`}>No Feedbacks Yet!</p>
            </section>
        );
    }

    const average = total / 3;
    const positivePercentage = (good / total) * 100;
    const negativePercentage = (bad / total) * 100;

    return (
        <section className="grid gap-4">
            <h1 className={headerBase}>Stats</h1>
            <p className={`${statBase} bg-good/35`}>good : {good}</p>
            <p className={`${statBase} bg-neutral/45`}>neutral : {neutral}</p>
            <p className={`${statBase} bg-bad/35`}>bad : {bad}</p>
            <p className={`${statBase} bg-ink/20`}>total feedbacks : {total}</p>
            <p className={`${statBase} bg-ink/10`}>
                average : {`${average.toFixed(2)}`}
            </p>
            <p className={`${statBase} bg-ink/10`}>
                positive percentage :{`${positivePercentage.toFixed(2)}%`}
            </p>
            <p className={`${statBase} bg-ink/10`}>
                negative percentage :{`${negativePercentage.toFixed(2)}%`}
            </p>
        </section>
    );
}
