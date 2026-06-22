import { useState } from "react";

export default function App() {
    const anecdotes = [
        "if it hurts, do it more often.",
        "adding manpower to a late software project makes it later!",
        "the first 90 percent of the code accounts for the first 90 percent of the development time...the remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "any fool can write code that a computer can understand. good programmers write code that humans can understand.",
        "premature optimization is the root of all evil.",
        "debugging is twice as hard as writing the code in the first place. therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "the only way to go fast, is to go well.",
    ];
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
    const [anecdoteIndex, setAnecdoteIndex] = useState(0);

    const maxVoteAnecdoteIndex = votes.indexOf(Math.max(...votes));

    function setNextAnecdoteIndex() {
        setAnecdoteIndex(
            anecdoteIndex == anecdotes.length - 1 ? 0 : anecdoteIndex + 1,
        );
    }

    function voteAnecdote() {
        setVotes((arr) => {
            const newArr = [...arr];
            newArr[anecdoteIndex]++;
            return newArr;
        });
    }

    return (
        <div>
            <h1>anecdote of the day:</h1>
            <p>{anecdotes[anecdoteIndex]}</p>
            <p>current votes: {votes[anecdoteIndex]}</p>
            <button onClick={setNextAnecdoteIndex}>next</button>
            <button onClick={voteAnecdote}>vote anecdote</button>
            <h1>anecdote with most votes:</h1>
            {votes[maxVoteAnecdoteIndex] == 0 ? (
                <p>no votes yet</p>
            ) : (
                <>
                    <p>{anecdotes[maxVoteAnecdoteIndex]}</p>
                    <p>max votes: {votes[maxVoteAnecdoteIndex]}</p>
                </>
            )}
        </div>
    );
}
