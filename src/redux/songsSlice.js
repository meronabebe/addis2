import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://jsonplaceholder.typicode.com';

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  const response = await axios.get(`${apiUrl}/posts`);
  return response.data;
});

export const addSong = createAsyncThunk('songs/addSong', async ({ title }) => {
  const response = await axios.post(`${apiUrl}/posts`, { title });
  return response.data;
});

export const updateSong = createAsyncThunk('songs/updateSong', async ({ id, title }) => {
  const response = await axios.put(`${apiUrl}/posts/${id}`, { title });
  return response.data;
});

export const deleteSong = createAsyncThunk('songs/deleteSong', async (id) => {
  await axios.delete(`${apiUrl}/posts/${id}`);
  return id;
});

const songsSlice = createSlice({
  name: 'songs',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addSong.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        const song = state.find((song) => song.id === id);
        if (song) {
          song.title = title;
        }
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        const id = action.payload;
        return state.filter((song) => song.id !== id);
      });
  },
});

export default songsSlice.reducer;