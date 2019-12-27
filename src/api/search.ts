import _ from "lodash";
import { CFanApi } from ".";
import { ApiResult } from "./types";

export interface SearchResultItem {
  name: string;
  alias: string;
}

export interface SearchResult extends ApiResult {
  matches: SearchResultItem[];
  total: number;
}

export async function search(
  this: CFanApi,
  search: string = ""
): Promise<SearchResult> {
  // convert the search to a lowercase array of strings
  // for example, "BTS Group" would change to ["bts", "group"]
  const phrases: string[] = _(search.split(/ /gi))
    .compact()
    .map(phrase => phrase.toLowerCase())
    .value();

  // perform the database query -- each record should
  // contain a key that's a lower case array of the
  // saved name
  const snapshot = await this.app
    .firestore()
    .collection("fandoms")
    .where("key", "array-contains-any", phrases)
    .get();

  // change each result into a search result
  const matches: SearchResultItem[] = _.map(snapshot.docs, doc => {
    const data = doc.data();
    return {
      name: data.name as string,
      alias: data.alias as string
    };
  });

  return {
    success: true,
    total: _.size(matches),
    matches
  };
}
