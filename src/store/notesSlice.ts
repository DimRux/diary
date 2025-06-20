import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Tag } from '@components/index';

export interface INote {
  id: string;
  title: string;
  date: string;
  emoji: string;
  text: string;
  tags: Tag[];
  image: string;
}

export interface NotesState {
  notes: INote[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes.splice(action.payload, 1);
    },
    updateNote: (state, action: PayloadAction<{ id: string; note: INote }>) => {
      const { id, note } = action.payload;
      const index = state.notes.findIndex(existingNote => existingNote.id === id);
      
      if (index !== -1) {
        state.notes[index] = note;
      } else {
        console.error('Заметка с таким id не найдена');
      }
    },
    loadNotes: (state, action: PayloadAction<INote[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { addNote, removeNote, updateNote, loadNotes } = notesSlice.actions;

export default notesSlice.reducer;