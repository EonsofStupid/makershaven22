
// This is a helper script for seeding demo data
// It can be run once to populate initial data for demonstration

import { supabase } from "@/integrations/supabase/client";

export async function seedDemoProjects() {
  const { data: existingProjects } = await supabase
    .from('printer_builds')
    .select('id')
    .limit(1);

  // Only seed if there are no existing projects
  if (existingProjects && existingProjects.length > 0) {
    console.log('Demo data already exists. Skipping seeding.');
    return;
  }

  const demoProjects = [
    {
      title: "Voron 2.4 Build",
      description: "A high-performance CoreXY 3D printer with an enclosed build chamber",
      build_specs: {
        category: "CoreXY",
        dimensions: "350x350x350mm",
        extruder: "Bondtech LGX",
        hotend: "E3D V6"
      },
      difficulty_level: "advanced",
      estimated_time: "40 hours",
      parts_list: [
        { name: "Stepper Motors", quantity: 5 },
        { name: "Linear Rails", quantity: 7 },
        { name: "Belts", quantity: 2 }
      ],
      status: "approved",
      likes_count: 124,
      views_count: 3452
    },
    {
      title: "Prusa Mini Clone",
      description: "A compact and reliable i3-style 3D printer",
      build_specs: {
        category: "i3",
        dimensions: "180x180x180mm",
        extruder: "BMG Clone",
        hotend: "V6 Lite"
      },
      difficulty_level: "beginner",
      estimated_time: "12 hours",
      parts_list: [
        { name: "Stepper Motors", quantity: 4 },
        { name: "Linear Rods", quantity: 8 },
        { name: "Belts", quantity: 1 }
      ],
      status: "approved",
      likes_count: 87,
      views_count: 2150
    },
    {
      title: "HyperCube Evolution",
      description: "A rigid CoreXY 3D printer with modular design",
      build_specs: {
        category: "CoreXY",
        dimensions: "300x300x300mm",
        extruder: "Hemera",
        hotend: "Mosquito"
      },
      difficulty_level: "intermediate",
      estimated_time: "25 hours",
      parts_list: [
        { name: "Stepper Motors", quantity: 4 },
        { name: "Linear Rails", quantity: 5 },
        { name: "Belts", quantity: 2 }
      ],
      status: "approved",
      likes_count: 75,
      views_count: 1895
    },
    {
      title: "DIY Delta Printer",
      description: "A fast delta-style 3D printer for quick prototyping",
      build_specs: {
        category: "Delta",
        dimensions: "200mm diameter x 300mm height",
        extruder: "Titan",
        hotend: "Dragon"
      },
      difficulty_level: "expert",
      estimated_time: "35 hours",
      parts_list: [
        { name: "Stepper Motors", quantity: 3 },
        { name: "Linear Rails", quantity: 3 },
        { name: "Carbon Fiber Rods", quantity: 6 }
      ],
      status: "approved",
      likes_count: 62,
      views_count: 1560
    },
    {
      title: "Ender 3 V2 Upgrades",
      description: "Complete upgrades package for the popular Ender 3 V2",
      build_specs: {
        category: "i3",
        dimensions: "220x220x250mm",
        extruder: "Direct Drive Conversion",
        hotend: "Micro Swiss"
      },
      difficulty_level: "beginner",
      estimated_time: "8 hours",
      parts_list: [
        { name: "Stepper Motors", quantity: 1 },
        { name: "Linear Rails", quantity: 2 },
        { name: "Belts", quantity: 1 }
      ],
      status: "approved",
      likes_count: 145,
      views_count: 4250
    }
  ];

  try {
    const { error } = await supabase.from('printer_builds').insert(demoProjects);
    
    if (error) {
      console.error('Error seeding demo projects:', error);
      return;
    }
    
    console.log('Successfully seeded demo projects!');
  } catch (error) {
    console.error('Error in seeding process:', error);
  }
}
