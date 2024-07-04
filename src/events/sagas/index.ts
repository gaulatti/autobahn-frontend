import { fork } from 'redux-saga/effects';
import { authLifecycle } from './auth';
import { kickoffLifecycle } from './kickoff';
import { teamsLifecycle } from './teams';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export type SagaContext = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

function* lifecycle(context: SagaContext) {
  yield fork(authLifecycle);
  yield fork(kickoffLifecycle, context);
  yield fork(teamsLifecycle);
}

export { lifecycle };
