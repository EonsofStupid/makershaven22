import { Json } from "../base";
import { Database } from "../index";

export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
export type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

export type CmsContent = Database["public"]["Tables"]["cms_content"]["Row"];
export type CmsContentInsert = Database["public"]["Tables"]["cms_content"]["Insert"];
export type CmsContentUpdate = Database["public"]["Tables"]["cms_content"]["Update"];

export type CmsContentRevision = Database["public"]["Tables"]["cms_content_revisions"]["Row"];
export type CmsContentRevisionInsert = Database["public"]["Tables"]["cms_content_revisions"]["Insert"];
export type CmsContentRevisionUpdate = Database["public"]["Tables"]["cms_content_revisions"]["Update"];

export type CmsComponent = Database["public"]["Tables"]["cms_components"]["Row"];
export type CmsComponentInsert = Database["public"]["Tables"]["cms_components"]["Insert"];
export type CmsComponentUpdate = Database["public"]["Tables"]["cms_components"]["Update"];

export type CmsCategory = Database["public"]["Tables"]["cms_categories"]["Row"];
export type CmsCategoryInsert = Database["public"]["Tables"]["cms_categories"]["Insert"];
export type CmsCategoryUpdate = Database["public"]["Tables"]["cms_categories"]["Update"];

export type CmsTag = Database["public"]["Tables"]["cms_tags"]["Row"];
export type CmsTagInsert = Database["public"]["Tables"]["cms_tags"]["Insert"];
export type CmsTagUpdate = Database["public"]["Tables"]["cms_tags"]["Update"];

export type ContentRelationship = Database["public"]["Tables"]["cms_content_relationships"]["Row"];
export type ContentRelationshipInsert = Database["public"]["Tables"]["cms_content_relationships"]["Insert"];
export type ContentRelationshipUpdate = Database["public"]["Tables"]["cms_content_relationships"]["Update"];