
import { Dispatch } from 'redux';
import { Action } from '../todoReducer';
import { ADD_TODO } from '../actions';
import { AnyAction } from "@reduxjs/toolkit";

export const saveTodo = (obj: {_id:string, name:string, description: string, status:boolean}) => {
    return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
        dispatch<any>({ type: ADD_TODO, payload: obj });
    }
} 