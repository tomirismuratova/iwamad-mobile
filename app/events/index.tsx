import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';

import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleSaved = (id: number) => {
    setSavedIds((ids) =>
      ids.includes(id)
        ? ids.filter((savedId) => savedId !== id)
        : [...ids, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        Long-press an event to save it. Saved: {savedIds.length}
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
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No events match.</Text>
        }
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
});
