import { BaseRepository } from "../util/BaseRepository";
import { Content } from "../models/Content";

export class ContentRepository extends BaseRepository<Content> {
  constructor() {
    super(Content);
  } 
 
}