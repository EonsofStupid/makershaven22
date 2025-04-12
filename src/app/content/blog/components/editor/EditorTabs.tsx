
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../../shared/ui/tabs';
import { FileText, Image, Settings } from 'lucide-react';

interface EditorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-3 w-full bg-black/20 border border-white/5">
        <TabsTrigger value="editor" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span>Editor</span>
        </TabsTrigger>
        <TabsTrigger value="media" className="flex items-center gap-2">
          <Image className="w-4 h-4" />
          <span>Media</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default EditorTabs;
