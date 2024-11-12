import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Tag } from '@components/index';

export interface Note {
  title: string;
  date: string;
  emoji: string;
  text: string;
  tags: Tag[];
  image: string;
}

export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes.splice(action.payload, 1);
    },
    updateNote: (state, action: PayloadAction<{ index: number; note: Note }>) => {
      const { index, note } = action.payload;
      state.notes[index] = note;
    },
    loadNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { addNote, removeNote, updateNote, loadNotes } = notesSlice.actions;

export default notesSlice.reducer;