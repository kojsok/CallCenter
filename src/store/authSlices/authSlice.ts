import { Profile } from "@/utils/schemasTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getProfile } from "@/api/authApi";

interface ErrorState {
  message: string;
}

interface AuthState {
  isAuthorized: boolean;
  token: string | null;
  profile: Profile | null;
  role: string;
  error: ErrorState | null;
  loading: boolean;
  success: boolean;
}

const initialState: AuthState = {
  isAuthorized: false,
  token: null,
  profile: null,
  role: "",
  error: null,
  loading: false,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    giveAccess: (state, action: PayloadAction<string>) => {
      state.isAuthorized = true;
      state.token = action.payload;
    },
    revokeAccess: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
        state.role = action.payload.auth_data.role;
        state.loading = false;
        state.success = true;
      })
      .addCase(checkAuth.rejected, (state, action: PayloadAction<unknown>) => {
        state.error = action.payload as ErrorState;
      });
  },
});

//проверяем токен в хранилище, если токен на месте делаем попытку получения профиля.
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("C-c_token");
    if (token) {
      try {
        const profile = await getProfile();
        dispatch(giveAccess(token));
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

export const { giveAccess, revokeAccess } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: RootState) => ({
  isAuthorized: state.auth.isAuthorized,
  role: state.auth.role,
});
export const selectProfile = (state: RootState) => state.auth.profile;
export const selectReqStatus = (state: RootState) => ({
  error: state.auth.error,
  success: state.auth.success,
  loading: state.auth.loading,
});
