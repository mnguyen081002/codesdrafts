import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { LessionComponentProps, ITextComponent } from "../../shared/interface";

interface InitialState {
  title: string;
  summary: string;
  components: LessionComponentProps[];
}

const initialState: InitialState = {
  title: "",
  summary: "",
  components: [
    {
      content: {
        html: "",
      },
      type: "Text",
      isFocus: false,
    },
  ],
};

const componentsSlice = createSlice({
  name: "components",
  initialState: initialState,
  reducers: {
    setTitle(state, action: PayloadAction<any>) {
      state.title = action.payload;
    },
    setComponents(state, action: PayloadAction<LessionComponentProps[]>) {
      state.components = action.payload;
    },
    setTextContent(state, action: PayloadAction<{ content: ITextComponent; index: number }>) {
      const copy: any = state.components;
      copy[action.payload.index] = action.payload;
      state.components = copy;
    },
    setComponent(state, action: PayloadAction<{ component: LessionComponentProps; index: number }>) {
      const copy: any = state.components;
      copy[action.payload.index] = action.payload.component;
      state.components = copy;
    },
    setComponentType(state, action: PayloadAction<{ type:string; index: number }>) {
      const copy: any = state.components;
      let component: LessionComponentProps;
      if (action.payload.type === "Code") {
        component = {
          content: {
            code: "",
            judgeContent: {
              testCode: "",
              executeCode: "",
            },
            language: "typescript",
            runable: false,
            timeLimit: 1000,
            allowDownload: false,
          },
          type: "Code",
        };
      } else {
        component = {
          content: {
            html: "",
          },
          type: "Text",
        };
      }
      copy[action.payload.index] = component;
      state.components = copy;
    },
    addComponent(state, action: PayloadAction<LessionComponentProps>) {
      state.components.push(action.payload);
    },
    deleteComponentByIndex(state, action: PayloadAction<number>) {
      if (state.components.length === 1) {
        return;
      }
      const copy: any = state.components;
      copy.splice(action.payload, 1);
      state.components = copy;
    },
    setFocus(state, action: PayloadAction<number>) {
      const copy:any = state.components;
      for (let i = 0; i < state.components.length; i++) {
        let isFocus = false;
        if (i === action.payload) {
          isFocus = true;
        }
        const c  = { ...state.components[i], isFocus };
        copy[i] = c;
      }
      state.components = copy;
    },
    onDrag(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
      console.log("onDrag");
      
      const copy: any = Object.assign([], state.components);
      const temp = copy[action.payload.dragIndex]
      copy[action.payload.dragIndex] = copy[action.payload.hoverIndex];
      copy[action.payload.hoverIndex] = temp;
      console.log(copy);
      
      state.components = copy;
    }
  },
});

export const { setTitle,deleteComponentByIndex,onDrag, setComponents,setComponentType,setFocus, setComponent, setTextContent, addComponent } =
  componentsSlice.actions;

export const selectComponents = (state: RootState) => state.components.components;
export const selectTitle = (state: RootState) => state.components.title;

export default componentsSlice.reducer;
