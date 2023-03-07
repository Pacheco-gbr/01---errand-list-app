import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
} from "../../../services/ApiService";
import {
  CreateErrandRequest,
  Errand,
  GetByIdErrandRequest,
  ResponseAPI,
  UpdateErrandRequest,
} from "../typeStore";

export const errandsAdapter = createEntityAdapter<Errand>({
  selectId: (state) => state.id,
});

export const { selectAll: findingAllErrands, selectById: findErrandById } =
  errandsAdapter.getSelectors<RootState>((state) => state.errands);

export const getErrands = createAsyncThunk<ResponseAPI, string>(
  "errands/getErrands",
  async (idUser: string) => {
    const response = await apiGet(`/users/${idUser}/errands`);

    return response;
  }
);

export const getErrandById = createAsyncThunk<
  ResponseAPI,
  GetByIdErrandRequest
>("errands/getErrandById", async (params: GetByIdErrandRequest) => {
  const response = await apiGet(
    `/users/${params.idUser}/errands/${params.idErrand}`
  );
  return response;
});

export const saveErrand = createAsyncThunk<ResponseAPI, CreateErrandRequest>(
  "errands/saveErrand",
  async (data: CreateErrandRequest) => {
    const response = await apiPost(
      `/users/${data.idUser}/errands`,
      data.dataCreateErrand
    );
    return response;
  }
);

export const attErrand = createAsyncThunk<ResponseAPI, UpdateErrandRequest>(
  "errands/attErrand",
  async (data: UpdateErrandRequest) => {
    const response = await apiPut(
      `/users/${data.idUser}/errands/${data.idErrand}`,
      data.dataUpdateErrand
    );
    return response;
  }
);

export const deleteErrand = createAsyncThunk<ResponseAPI, GetByIdErrandRequest>(
  "errands/deleteErrand",
  async (params: GetByIdErrandRequest) => {
    const response = await apiDelete(
      `/users/${params.idUser}/errands/${params.idErrand}`
    );

    return response;
  }
);

const errandsSlice = createSlice({
  name: "errands",
  initialState: errandsAdapter.getInitialState({
    success: false,
    message: "",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getErrands.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.setAll(state, action.payload.data);
      }
      state.message = action.payload.message;
      state.success = action.payload.success;
    });

    builder.addCase(getErrandById.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.setOne(state, action.payload.data);
      }
      state.success = action.payload.success;
      state.message = action.payload.message;
    });

    builder.addCase(saveErrand.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.addOne(state, action.payload.data);
      }
      state.message = action.payload.message;
      state.success = action.payload.success;
    });
    builder.addCase(attErrand.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.updateOne(state, {id: action.payload.data.id, changes: action.payload.data});
      }
      state.message = action.payload.message;
      state.success = action.payload.success;
    });

    builder.addCase(deleteErrand.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.removeOne(state, action.payload.data.id);
      }
      state.success = action.payload.success;
      state.message = action.payload.message;
    });
  },
});

export const errandsReducer = errandsSlice.reducer;
