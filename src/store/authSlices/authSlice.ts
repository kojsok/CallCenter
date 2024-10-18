import { Profile } from "@/utils/schemasTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getProfile, logout } from "@/api/authApi";

interface ErrorState {
  message: string;
}

interface AuthState {
  isAuthorized: boolean;
  token: string | null;
  profile: Profile | null;
  error: ErrorState | null;
  loading: boolean;
  success: boolean;
}

const initialState: AuthState = {
  isAuthorized: false,
  token: null,
  profile: null,
  error: null,
  loading: true,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    revokeAccess: (state) => {
      state.isAuthorized = false;
      state.token = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isAuthorized = true;
        state.profile = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(checkAuth.rejected, (state, action: PayloadAction<unknown>) => {
        state.error = action.payload as ErrorState;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        logoutThunk.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.error = action.payload as ErrorState;
        }
      );
  },
});

//thunk получения профиля пользователя. проверяем токен в хранилище, если токен на месте делаем попытку получения профиля.
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("C-c_token");
    if (token) {
      dispatch(saveToken(token));
      try {
        const profile = await getProfile();
        return profile;
      } catch (error) {
        //в слуае ошибки сбрасываем авторизационные данные
        dispatch(revokeAccess());
        return rejectWithValue({ message: (error as Error).message });
      }
    } else {
      dispatch(revokeAccess());
      return rejectWithValue({ message: "No token found" });
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logout();
      dispatch(revokeAccess());
    } catch (error) {
      return rejectWithValue({ message: (error as Error).message });
    }
  }
);

export const { saveToken, revokeAccess } = authSlice.actions;
export default authSlice.reducer;

export const selectProfile = (state: RootState) => state.auth.profile;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectAuthState = (state: RootState) => state.auth;
