
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const demoProjects = [
  {
    title: 'Prusa i3 MK3S+ Build',
    description: 'A complete build of the Prusa i3 MK3S+ with custom firmware modifications.',
    build_specs: {
      category: 'Cartesian',
      dimensions: '210x210x250mm',
      controller: 'Einsy RAMBo',
      mainboard: 'Prusa Einsy RAMBo',
      stepper_drivers: 'TMC2130'
    },
    difficulty_level: 'intermediate',
    estimated_time: '16 hours',
    status: 'approved',
    likes_count: 147,
    views_count: 2304
  },
  {
    title: 'Voron 2.4 300mm Build',
    description: 'High-speed CoreXY 3D printer with linear rails and enclosed chamber.',
    build_specs: {
      category: 'CoreXY',
      dimensions: '300x300x300mm',
      controller: 'Klipper',
      mainboard: 'BTT Octopus Pro',
      stepper_drivers: 'TMC2209'
    },
    difficulty_level: 'expert',
    estimated_time: '40 hours',
    status: 'approved',
    likes_count: 256,
    views_count: 3412
  },
  {
    title: 'Ender 3 V2 Upgrades',
    description: 'Comprehensive upgrade guide for the Ender 3 V2.',
    build_specs: {
      category: 'Cartesian',
      dimensions: '220x220x250mm',
      controller: 'Marlin 2.0',
      mainboard: 'Creality 4.2.2',
      upgrades: ['Direct drive', 'BLTouch', 'Dual Z-axis']
    },
    difficulty_level: 'beginner',
    estimated_time: '8 hours',
    status: 'approved',
    likes_count: 324,
    views_count: 4506
  },
  {
    title: 'Hypercube CoreXY Build',
    description: 'Custom Hypercube Evolution with carbon fiber reinforcements.',
    build_specs: {
      category: 'CoreXY',
      dimensions: '300x300x350mm',
      controller: 'Klipper',
      mainboard: 'BTT SKR 1.4 Turbo',
      stepper_drivers: 'TMC2209'
    },
    difficulty_level: 'advanced',
    estimated_time: '30 hours',
    status: 'approved',
    likes_count: 98,
    views_count: 1876
  },
  {
    title: 'Delta Printer FLSUN QQ-S Pro',
    description: 'Build and optimization guide for the FLSUN QQ-S Pro delta printer.',
    build_specs: {
      category: 'Delta',
      dimensions: '255mm diameter x 360mm height',
      controller: 'Marlin',
      mainboard: 'MKS Robin Nano',
      stepper_drivers: 'TMC2208'
    },
    difficulty_level: 'intermediate',
    estimated_time: '10 hours',
    status: 'approved',
    likes_count: 76,
    views_count: 1256
  }
];

export const seedDemoProjects = async () => {
  try {
    // Check if we already have projects in the database
    const { count, error: countError } = await supabase
      .from('printer_builds')
      .select('*', { count: 'exact', head: true });
    
    if (countError) throw countError;
    
    // Only seed if table is empty
    if (count === 0) {
      console.log('Seeding demo projects...');
      
      // Get a random user ID for demo purposes (or create a default one)
      let userId: string;
      
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (usersError) {
        console.error('Error fetching users:', usersError);
        // If no users found or error, we'll use a UUID constant for demo purposes
        userId = '00000000-0000-0000-0000-000000000000';
      } else if (users && users.length > 0) {
        userId = users[0].id;
      } else {
        // No users found, use a default UUID
        userId = '00000000-0000-0000-0000-000000000000';
      }
      
      // Prepare projects with the user ID
      const projectsToSeed = demoProjects.map(project => ({
        ...project,
        user_id: userId,
        parts_list: project.build_specs?.upgrades 
          ? project.build_specs.upgrades.map(upgrade => ({ name: upgrade })) 
          : [],
        media_links: {
          images: [`https://placehold.co/600x400?text=${encodeURIComponent(project.title)}`]
        }
      }));
      
      // Insert projects
      const { error: insertError } = await supabase
        .from('printer_builds')
        .insert(projectsToSeed);
      
      if (insertError) throw insertError;
      
      console.log('Demo projects seeded successfully');
    } else {
      console.log('Database already contains printer builds, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding demo projects:', error);
  }
};
