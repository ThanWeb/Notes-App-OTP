import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { useAuth } from '../context/AuthContext'

interface INote {
  id: number
  body: string
  userId: string
  createdAt: string
  updatedAt: string
}

const Home = () => {
  const [note, setNote] = useState('')
  const [notesList, setNotesList] = useState<INote[] | never[]>([])
  const { onAddNote, onGetNotes, onDeleteNote } = useAuth()

  useEffect(() => {
    void handleGetNotes()
  }, [])

  const handleGetNotes = async () => {
    const result = await onGetNotes!()
    console.log(result.data.notes)
    setNotesList(result.data.notes)
  }

  const handleAddNote = async () => {
    if (note.trim() !== '') {
      const result = await onAddNote!(note)
      alert(result.data.message)
      setNotesList([result.data.note, ...notesList])
      setNote('')
    }
  }

  const handleDeleteNote = async (id: number) => {
    if (id !== undefined || id !== null) {
      const result = await onDeleteNote!(id)
      alert(result.data.message)
      const newList = notesList.filter((item) => item.id !== id)
      setNotesList(newList)
    }
  }

  const renderItem = ({ item }: { item: INote }) => (
    <View>
      <Text key={item.id}>{item.body}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteNote(item.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
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
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  }
})

export default Home
