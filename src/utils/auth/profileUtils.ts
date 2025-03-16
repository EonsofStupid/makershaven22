
import { supabase } from '@/integrations/supabase/client';

/**
 * Function to ensure user profiles exist with correct usernames and roles
 * Called from AuthProvider or an admin section, not from App.tsx
 */
export async function ensureUserProfilesExist() {
  const usersToCheck = [
    { email: 'jessay@angrygaming.org', username: 'Jessay', role: 'admin' },
    { email: 'jessay@gmail.com', username: 'Hades', role: 'maker' }
  ];

  for (const user of usersToCheck) {
    try {
      // First check if the user exists in profiles
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, username, role')
        .eq('email', user.email)
        .maybeSingle();
      
      if (userError) {
        console.error(`Error checking profile for ${user.email}:`, userError);
        continue;
      }
      
      if (!userData) {
        console.log(`No profile found for ${user.email}, cannot update without auth record`);
        continue;
      }
      
      // Update the profile with correct username and role if needed
      if (userData.username !== user.username || userData.role !== user.role) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            username: user.username,
            role: user.role,
            display_name: user.username
          })
          .eq('email', user.email);
        
        if (updateError) {
          console.error(`Error updating profile for ${user.email}:`, updateError);
        } else {
          console.log(`Updated profile for ${user.email} with username: ${user.username}, role: ${user.role}`);
        }
      }
    } catch (error) {
      console.error(`Error processing user ${user.email}:`, error);
    }
  }
}
