import { UnknownAction } from '@reduxjs/toolkit';

export interface ReduxAction extends UnknownAction {
  type: string;
  payload?: unknown;
}