
import React from "react";
import { SettingsFormContainer } from "./components/SettingsFormContainer";
import { SiteSettingsManager } from "./SiteSettingsManager";

export const SettingsForm = () => {
  return (
    <div className="space-y-8">
      <SettingsFormContainer />
      <SiteSettingsManager />
    </div>
  );
};
