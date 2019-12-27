import * as _ from 'lodash';
import { CFanApi } from '.';
import { ApiResult } from './types';


export interface FandomSummary {
  name: string;
}

export interface GetSummaryResult extends ApiResult {
  top: FandomSummary[];
  head: FandomSummary[];
  member: FandomSummary[];
  tail: FandomSummary[];
}

export async function getSummary(this: CFanApi): Promise<GetSummaryResult> {
  
  const db = this.app.firestore();
  const fandoms = db.collection('fandoms');
  const result = await fandoms.get();

  const records: FandomSummary[] = [ ]
  result.forEach(item => {
    const record = Object.assign({ }, item.data());
    records.push(record as FandomSummary);
  });

  return {
    success: true,
    top: _.take(records, 3),
    head: _.first(records),
    tail: _.last(records),
    member: records
  };

}