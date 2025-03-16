
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/lib/toast';

// Demo printer builds data
const demoPrinterBuilds = [
  {
    title: 'Voron 2.4 R2',
    description: 'A high-speed CoreXY 3D printer with a fully enclosed chamber',
    difficulty_level: 'advanced',
    status: 'approved',
    likes_count: 243,
    views_count: 1852,
    estimated_time: '40 hours',
    build_specs: {
      category: 'CoreXY',
      buildVolume: {
        x: 350,
        y: 350,
        z: 350
      },
      features: ['Enclosed', 'High-temperature', 'Automatic bed leveling']
    },
    parts_list: [
      { name: 'LDO Motors Kit', type: 'mechanical' },
      { name: 'Raspberry Pi 4', type: 'electronics' },
      { name: 'BTT Octopus Pro', type: 'electronics' },
      { name: 'E3D Revo Voron Hotend', type: 'hotend' }
    ]
  },
  {
    title: 'Ender 3 V2 Upgrade',
    description: 'Comprehensive upgrade package for the popular Ender 3 V2 printer',
    difficulty_level: 'intermediate',
    status: 'approved',
    likes_count: 189,
    views_count: 1456,
    estimated_time: '15 hours',
    build_specs: {
      category: 'Cartesian',
      buildVolume: {
        x: 235,
        y: 235,
        z: 250
      },
      features: ['Silent', 'PEI Sheet', 'Direct Drive']
    },
    parts_list: [
      { name: 'Micro Swiss Direct Drive', type: 'extruder' },
      { name: 'PEI Spring Steel Sheet', type: 'bed' },
      { name: 'BTT SKR Mini E3 V3', type: 'electronics' }
    ]
  },
  {
    title: 'Prusa i3 MK3S+ Clone',
    description: 'Open source Prusa i3 MK3S+ clone with quality components',
    difficulty_level: 'beginner',
    status: 'approved',
    likes_count: 127,
    views_count: 983,
    estimated_time: '25 hours',
    build_specs: {
      category: 'Cartesian',
      buildVolume: {
        x: 250,
        y: 210,
        z: 210
      },
      features: ['Auto-leveling', 'Filament sensor', 'Removable sheet']
    },
    parts_list: [
      { name: 'E3D V6 Hotend', type: 'hotend' },
      { name: 'LDO Stepper Motors', type: 'mechanical' },
      { name: 'PINDA Probe', type: 'sensors' }
    ]
  },
  {
    title: 'Voron Trident 300',
    description: 'CoreXY 3D printer with triple Z motors for perfect bed alignment',
    difficulty_level: 'advanced',
    status: 'approved',
    likes_count: 152,
    views_count: 1205,
    estimated_time: '35 hours',
    build_specs: {
      category: 'CoreXY',
      buildVolume: {
        x: 300,
        y: 300,
        z: 250
      },
      features: ['Triple Z', 'Enclosed', 'Auto-calibration']
    },
    parts_list: [
      { name: 'BTT Octopus', type: 'electronics' },
      { name: 'Dragon Hotend', type: 'hotend' },
      { name: 'Gates Belts', type: 'mechanical' },
      { name: 'Meanwell PSU', type: 'power' }
    ]
  },
  {
    title: 'RatRig V-Core 3',
    description: 'Industrial grade CoreXY 3D printer with linear rails',
    difficulty_level: 'expert',
    status: 'approved',
    likes_count: 98,
    views_count: 867,
    estimated_time: '30 hours',
    build_specs: {
      category: 'CoreXY',
      buildVolume: {
        x: 300,
        y: 300,
        z: 300
      },
      features: ['Linear Rails', 'EVA Carriage', 'Duet Electronics']
    },
    parts_list: [
      { name: 'Duet 3 Mini 5+', type: 'electronics' },
      { name: 'MGN Linear Rails', type: 'mechanical' },
      { name: 'Slice Engineering Mosquito', type: 'hotend' }
    ]
  }
];

// Function to seed data
export const seedDemoProjects = async () => {
  // Use a single toast for the entire seeding process
  const loadingToastId = toast.loading('Setting up demo data...');
  
  try {
    // Check if we already have data
    const { data: existingData, error: countError } = await supabase
      .from('printer_builds')
      .select('id')
      .limit(1);
    
    if (countError) {
      console.error('Error checking for existing data:', countError);
      toast.error.fromLoading(loadingToastId, 'Error checking for existing data', countError.message);
      return false;
    }
    
    // If we already have data, don't seed
    if (existingData && existingData.length > 0) {
      console.log('Data already exists, skipping seed');
      toast.success.fromLoading(loadingToastId, 'Demo data already exists', 'Using existing data');
      return false;
    }
    
    // Get current user ID if available
    let userId = null;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
    }
    
    // Insert demo data with proper user ID or null if not available
    const { error } = await supabase
      .from('printer_builds')
      .insert(demoPrinterBuilds.map(build => ({
        ...build,
        user_id: userId // Use actual user ID or null
      })));
    
    if (error) {
      console.error('Error seeding demo data:', error);
      toast.error.fromLoading(loadingToastId, 'Error seeding demo data', error.message);
      return false;
    }
    
    console.log('Demo data seeded successfully');
    toast.success.fromLoading(loadingToastId, 'Demo data seeded successfully');
    return true;
  } catch (error) {
    console.error('Error in seed function:', error);
    toast.error.fromLoading(loadingToastId, 'Failed to seed demo data', (error as Error).message);
    return false;
  }
};
