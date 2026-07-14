import { getAuthenticatedHttpClient } from '@openedx/frontend-base';
import { programProgressUrl, programsApiUrl } from './urls';

import { apiKeys } from '@src/data/services/lms/constants';
import urls from '@src/data/services/subs/urls';
import { stringifyUrl } from '@src/data/services/lms/utils';

export const initializeSubsList = async (user) => {
  const { data } = await getAuthenticatedHttpClient().get(
    stringifyUrl(urls.getSubsInitApiUrl(), { [apiKeys.user]: user }),
  );
  return data;
};

export const initializeCourseList = async (user) => {
  const { data } = await getAuthenticatedHttpClient().get(
    stringifyUrl(urls.getSubsCoursesApiUrl(), { [apiKeys.user]: user }),
  );
  return data;
};

export const getProgramProgressData = async (uuid: string) => {
  try {
    const { data } = await getAuthenticatedHttpClient().get(programProgressUrl(uuid));
    return data;
  } catch (error) {
    console.error('Error fetching program progress data:', error);
    throw error;
  }
};

export const getProgramsListData = async () => {
  try {
    const { data } = await getAuthenticatedHttpClient().get(programsApiUrl());
    return data;
  } catch (error) {
    console.error('Error fetching program list data:', error);
    throw error;
  }
};
