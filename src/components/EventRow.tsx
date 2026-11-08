import { Text, Pressable, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  isSaved: boolean;
};

export default function EventRow({
  event,
  onPress,
  onLongPress,
  isSaved,
}: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>

      <Text style={styles.details}>
        {event.date} · {event.place}
      </Text>

      {isSaved && (
        <Text style={styles.saved}>★ Saved</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  cardPressed: {
    backgroundColor: '#E8F1FF',
    borderColor: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
  details: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
  },
  saved: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D18B00',
    marginTop: 8,
  },
});

