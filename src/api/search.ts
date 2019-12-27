import _ from 'lodash';
import { CFanApi } from '.';
import { ApiResult } from './types';

interface SearchResult extends ApiResult {

}

export async function search(this: CFanApi, search: string = ''): Promise<SearchResult> {

  const phrases: string[] = _(search.split(/ /gi))
    .compact()
    .map(phrase => phrase.toLowerCase())
    .value();

  console.log('search', phrases);

  const snapshot = await this.app.firestore()
    .collection('fandoms')
    .where('key', 'array-contains-any', phrases)
    .get();

  console.log(snapshot.docs);
  
  return {
    success: true
  };

}