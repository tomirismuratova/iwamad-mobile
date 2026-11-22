import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useEvents } from '../../src/hooks/useEvents';
import HolidayNote from '../../src/components/HolidayNote';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Could not load events
        </Text>

        <Text style={styles.errorMessage}>
          {error.message}
        </Text>

        <Pressable
          onPress={() => refetch()}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  const event = data.find((item) => item.id === Number(id));

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

      <HolidayNote date={event.date} />

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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
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
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 16,
    color: '#666666',
  },
  retryButton: {
    minHeight: 44,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
