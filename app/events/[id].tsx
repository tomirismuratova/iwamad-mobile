import { View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { events } from '../../src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.detail}>Date: {event.date}</Text>
      <Text style={styles.detail}>Place: {event.place}</Text>
      <Text style={styles.detail}>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    marginBottom: 12,
  },
});
