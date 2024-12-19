import React from 'react';
import { Settings } from '@/lib/types/settings';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SEOSectionProps {
  title: string;
  description: string;
  keywords: string;
  onUpdate: (field: string, value: string) => void;
}

export const SEOSection: React.FC<SEOSectionProps> = ({
  title,
  description,
  keywords,
  onUpdate,
}) => {
  return (
    <Card className="p-6 space-y-6 bg-gray-800/50 border border-white/10">
      <h3 className="text-xl font-semibold text-white">SEO Settings</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="seo-title">SEO Title</Label>
          <Input
            id="seo-title"
            value={title}
            onChange={(e) => onUpdate('title', e.target.value)}
            placeholder="Enter SEO title"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div>
          <Label htmlFor="seo-description">Meta Description</Label>
          <Textarea
            id="seo-description"
            value={description}
            onChange={(e) => onUpdate('description', e.target.value)}
            placeholder="Enter meta description"
            className="bg-white/5 border-white/10 text-white"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="seo-keywords">Keywords</Label>
          <Input
            id="seo-keywords"
            value={keywords}
            onChange={(e) => onUpdate('keywords', e.target.value)}
            placeholder="Enter keywords (comma-separated)"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>
    </Card>
  );
};