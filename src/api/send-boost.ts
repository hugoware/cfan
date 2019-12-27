import { CFanApi } from ".";
import { ApiResult } from "./types";

export interface SendBoostResult extends ApiResult {
  
}

/** sends a fandom boost to the server */
export async function sendBoost(this: CFanApi, boost: number): Promise<SendBoostResult> {
  console.log('sending', boost);
  return { success: true };
}