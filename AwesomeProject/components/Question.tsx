import {Text, ScrollView, View, Button, StyleSheet} from 'react-native';
import React from 'react';
import data from '../img/data.json';
import {useEffect, useState} from 'react';

interface Question {
  id: number;
  question: string;
  answers: {id: number; text: string}[]; // Define the structure of answers
  correct_answer_id: number;
}

const Question = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>(
    Array(data.questions.length).fill(-1),
  );
  const [score, setScore] = useState<number>(0);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(() => {
    // Shuffle the array of questions randomly
    const shuffled = shuffleArray(data.questions);
    setShuffledQuestions(shuffled);
  }, []);

  // Function to shuffle an array randomly
  const shuffleArray = (array: any[]) => {
    const shuffled = array.slice(); // Create a shallow copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  // Function to handle user selection of an answer
  const handleAnswerSelection = (
    questionIndex: number,
    answerIndex: number,
  ) => {
    const updatedUserAnswers = [...userAnswers]; // Create a copy of the userAnswers array
    updatedUserAnswers[questionIndex] = answerIndex; // Update the selected answer for the corresponding question
    setUserAnswers(updatedUserAnswers); // Update state
  };

  // Function to evaluate user's answers and determine score
  const evaluateScore = () => {
    // Check if all questions have been answered
    if (userAnswers.includes(-1)) {
      // Display a warning message if not all questions have been answered
      setShowWarning(true);
    } else {
      // Calculate the score if all questions have been answered
      setShowWarning(false); // Hide the warning message
      let userScore = 0;
      shuffledQuestions.forEach((question, index) => {
        if (
          question.correct_answer_id === question.answers[userAnswers[index]].id
        ) {
          userScore++;
        }
      });
      setScore(userScore); // Update the score state
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {shuffledQuestions.map((d: Question, questionIndex: number) => (
          <View key={d.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {' '}
              {questionIndex + 1} {d.question}{' '}
            </Text>
            {/* Iterate over answers and display them */}
            {d.answers.map((answer, answerIndex) => (
              <Button
                key={answer.id}
                title={answer.text}
                onPress={() =>
                  handleAnswerSelection(questionIndex, answerIndex)
                }
                color={
                  userAnswers[questionIndex] === answerIndex
                    ? 'yellow'
                    : undefined
                }
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.scoreContainer}>
        <Button title="Submit Answers" onPress={evaluateScore} />
        <Text>Score: {score}</Text>
      </View>
      {showWarning && (
        <Text style={styles.warningText}>
          Please answer all questions before submitting.
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  answerButton: {
    marginBottom: 10,
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  warningText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Question;
