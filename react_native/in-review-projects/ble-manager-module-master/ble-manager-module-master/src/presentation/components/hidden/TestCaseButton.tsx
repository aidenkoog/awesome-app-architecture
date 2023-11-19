import { Pressable, View, Text, StyleSheet, Platform } from 'react-native'

interface TestCaseButtonProp {
  title: string,
  color: string,
  onPress: any
}

function TestCaseButton({ title, color, onPress }: TestCaseButtonProp) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default TestCaseButton

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    borderRadius: 8,
    elevation: 8,
    backgroundColor: 'white',
    shadowColor: 'red',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000000'
  },
})
