import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type CaseStudy = GetTypeByName<typeof configuration, "caseStudies">;
export declare const allCaseStudies: Array<CaseStudy>;

export {};
