import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';

import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';

export default function EventsScreen() {
  const { savedIds, toggleSaved } = useSavedIds();
  const [searchText, setSearchText] = useState('');

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
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

  const filteredEvents = (data ?? []).filter((event) =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        Swipe or long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search events"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onToggleSaved={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No events match.</Text>
        }
        refreshing={isRefetching}
        onRefresh={() => refetch()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  info: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333333',
  },
  search: {
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666666',
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
