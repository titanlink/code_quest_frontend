"use server";

import { IComment } from "../domain/entities/comment.entity";

export async function updateCommentAction(
  _data: IComment,
  _token: string
): Promise<any> {
  throw new Error("serverAction => updateCommentAction -> NOT IMPLEMENT");
}
