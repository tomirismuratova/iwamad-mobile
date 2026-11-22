import { Text, Pressable, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  isSaved: boolean;
};

export default function EventRow({
  event,
  onPress,
  onToggleSaved,
  isSaved,
}: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>
              {isSaved ? 'Unsave' : 'Save'}
            </Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
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
            <Animated.Text
              entering={ZoomIn}
              style={styles.saved}
            >
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
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
  action: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
