
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useSettingsQuery } from '@/hooks/useSettings';
import { toast } from 'sonner';

export const TransitionSettingsSection = () => {
  const { data: settings, isLoading, refetch } = useSettingsQuery();
  const [transitionDuration, setTransitionDuration] = useState(settings?.transition_duration || '0.3s');
  const [hoverScale, setHoverScale] = useState(settings?.hover_scale || '1.05');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // We need to provide all required parameters when calling the RPC function
      const updateParams = {
        p_site_title: settings?.site_title || '',
        p_tagline: settings?.tagline || '',
        p_primary_color: settings?.primary_color || '#7FFFD4',
        p_secondary_color: settings?.secondary_color || '#FFB6C1',
        p_accent_color: settings?.accent_color || '#E6E6FA',
        p_text_primary_color: settings?.text_primary_color || '#FFFFFF',
        p_text_secondary_color: settings?.text_secondary_color || '#A1A1AA',
        p_text_link_color: settings?.text_link_color || '#3B82F6',
        p_text_heading_color: settings?.text_heading_color || '#FFFFFF',
        p_neon_cyan: settings?.neon_cyan || '#41f0db',
        p_neon_pink: settings?.neon_pink || '#ff0abe',
        p_neon_purple: settings?.neon_purple || '#8000ff',
        p_border_radius: settings?.border_radius || '0.5rem',
        p_spacing_unit: settings?.spacing_unit || '1rem',
        p_transition_duration: transitionDuration,
        p_shadow_color: settings?.shadow_color || '#000000',
        p_hover_scale: hoverScale,
        p_font_family_heading: settings?.font_family_heading || 'Inter',
        p_font_family_body: settings?.font_family_body || 'Inter',
        p_font_size_base: settings?.font_size_base || '16px',
        p_font_weight_normal: settings?.font_weight_normal || '400',
        p_font_weight_bold: settings?.font_weight_bold || '700',
        p_line_height_base: settings?.line_height_base || '1.5',
        p_letter_spacing: settings?.letter_spacing || 'normal',
        p_box_shadow: settings?.box_shadow || 'none',
        p_backdrop_blur: settings?.backdrop_blur || '0',
        p_transition_type: settings?.transition_type || 'fade'
      };
      
      const { data, error } = await supabase.rpc('update_site_settings', updateParams);
      
      if (error) throw error;
      
      toast.success('Transition settings updated successfully');
      refetch();
    } catch (error) {
      console.error('Error updating transition settings:', error);
      toast.error('Failed to update transition settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading transition settings...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Transition Settings</h3>
        <p className="text-sm text-gray-400">Customize animation and transition effects</p>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="transition-duration">Transition Duration</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="transition-duration-slider"
              value={[parseFloat(transitionDuration.replace('s', '')) * 100]}
              min={0}
              max={200}
              step={5}
              onValueChange={(values) => setTransitionDuration((values[0] / 100).toFixed(2) + 's')}
              className="flex-1"
            />
            <Input
              id="transition-duration"
              value={transitionDuration}
              onChange={(e) => setTransitionDuration(e.target.value)}
              className="w-24"
            />
          </div>
          <p className="text-xs text-gray-400">Time it takes for animations to complete (in seconds)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hover-scale">Hover Scale</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="hover-scale-slider"
              value={[parseFloat(hoverScale) * 100 - 100]}
              min={0}
              max={30}
              step={1}
              onValueChange={(values) => setHoverScale(((values[0] / 100) + 1).toFixed(2))}
              className="flex-1"
            />
            <Input
              id="hover-scale"
              value={hoverScale}
              onChange={(e) => setHoverScale(e.target.value)}
              className="w-24"
            />
          </div>
          <p className="text-xs text-gray-400">Scale factor applied to elements on hover</p>
        </div>

        <Button 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Transition Settings'}
        </Button>
      </div>
    </div>
  );
};
