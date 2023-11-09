import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootState } from './store';

export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
