
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface ControlOption {
  label: string;
  value: string;
}

interface CSSEffectsControlProps {
  label: string;
  type: 'slider' | 'select' | 'input';
  value: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: ControlOption[];
  onChange: (value: any) => void;
  description?: string;
  previewClass?: string;
}

export const CSSEffectsControl: React.FC<CSSEffectsControlProps> = ({
  label,
  type,
  value,
  min = 0,
  max = 100,
  step = 1,
  options = [],
  onChange,
  description,
  previewClass
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">{label}</label>
        {type === 'slider' && (
          <span className="text-xs text-gray-400">{value}</span>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-400">{description}</p>
      )}
      
      <div className="mt-2">
        {type === 'slider' && (
          <Slider
            value={[typeof value === 'number' ? value : parseFloat(value.toString()) || 0]}
            min={min}
            max={max}
            step={step}
            onValueChange={(values) => onChange(values[0])}
            className="w-full"
          />
        )}
        
        {type === 'select' && (
          <Select
            value={value?.toString()}
            onValueChange={(val) => onChange(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {type === 'input' && (
          <Input
            value={value?.toString()}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
          />
        )}
      </div>
      
      {previewClass && (
        <div className="mt-3 p-2 bg-gray-800/50 rounded-md">
          <motion.div 
            className={`p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded text-center ${previewClass}`}
            whileHover={{ scale: typeof value === 'number' ? value : 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Preview Effect
          </motion.div>
        </div>
      )}
    </div>
  );
};
