import React from 'react'

import { Text, View, StyleSheet, ScrollView } from 'react-native';

const questionsAnswers = [
    { 
      question: "How do I find the nearest EV charging station?",
      answer: "You can use our app's map feature to locate the nearest stations."
    },
    {
      question: "What types of connectors are available?",
      answer: "Most stations support Type 1, Type 2, and CCS connectors."
    },
    {
        question: "Can I use any charging station, regardless of my EV model?",
        answer: "Can I use any charging station, regardless of my EV model?"
      },
      {
        question: "What should I do if a charging station is not working?",
        answer: "If you encounter a non-functional charging station, please report it through our app. You can also contact our support team for immediate assistance."
      },
    // Add more questions and answers here
  ];


export default function FAQScreen() {
  return (
    <ScrollView style={styles.container}>
        <Text style={{padding: 10, fontSize: 20, fontWeight: 'bold'}}>FAQ about charging stations</Text>
      {questionsAnswers.map((qa, index) => (
          <View key={index} style={styles.qaContainer}>
          <Text style={styles.question}>{qa.question}</Text>
          <Text style={styles.answer}>{qa.answer}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      padding: 30,
      paddingTop: 30,
    },
    qaContainer: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#f8f8f8',
      borderRadius: 5,
    },
    question: {
      fontWeight: 'bold',
    },
    answer: {
      marginTop: 5,
    },
  });