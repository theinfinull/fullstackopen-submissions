import { useState } from "react";
import Stats from "./Stats";
import FeedbackForm from "./FeedbackForm";

function App() {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    function addGoodFeedback() {
        setFeedback((prev) => ({
            ...prev,
            good: feedback.good + 1,
        }));
    }

    function addBadFeedback() {
        setFeedback((prev) => ({
            ...prev,
            bad: feedback.bad + 1,
        }));
    }

    function addNeutralFeedback() {
        setFeedback((prev) => ({
            ...prev,
            neutral: feedback.neutral + 1,
        }));
    }

    return (
        <main className="min-h-screen min-w-80 bg-paper px-5 py-12 font-mono text-ink">
            <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-xl flex-col justify-center gap-10">
                <FeedbackForm
                    goodFeedbackHandler={addGoodFeedback}
                    neutralFeedbackHandler={addNeutralFeedback}
                    badFeedbackHandler={addBadFeedback}
                ></FeedbackForm>
                <Stats
                    good={feedback.good}
                    neutral={feedback.neutral}
                    bad={feedback.bad}
                ></Stats>
            </div>
        </main>
    );
}

export default App;
