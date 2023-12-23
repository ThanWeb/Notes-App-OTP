import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'

const Home = () => {
  const [note, setNote] = useState('')
  const [notesList, setNotesList] = useState<string[]>([])

  const handleAddNote = () => {
    if (note.trim() !== '') {
      setNotesList([...notesList, note])
      setNote('')
    }
  }

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.noteItem}>
      <Text>{item}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your note"
        onChangeText={(text) => setNote(text)}
        value={note}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>

      <FlatList
        data={notesList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.notesContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notesContainer: {
    marginTop: 20,
  },
  noteItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
})

export default Home
