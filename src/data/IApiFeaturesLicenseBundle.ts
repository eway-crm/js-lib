import { Edition } from "../constants/Edition";
import { Feature } from "../constants/Feature";
import { IApiLicenseBundleBase } from "./IApiLicenseBundleBase";

export type TFeatureWithEdition = {
    Edition: Edition;
    Feature: Feature;
};

export interface IApiFeaturesLicenseBundle extends IApiLicenseBundleBase {
    Features: TFeatureWithEdition[];
}