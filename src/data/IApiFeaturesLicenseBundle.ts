import type { Edition } from "../constants/Edition";
import type { Feature } from "../constants/Feature";
import type { IApiLicenseBundleBase } from "./IApiLicenseBundleBase";

export type TFeatureWithEdition = {
    Edition: Edition;
    Feature: Feature;
};

export interface IApiFeaturesLicenseBundle extends IApiLicenseBundleBase {
    Features: TFeatureWithEdition[];
}