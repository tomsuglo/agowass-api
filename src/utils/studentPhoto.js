// utils/studentPhoto.js
import { supabase } from "./supabase"; 

export const getStudentPhoto = async (studentId) => {
  try {
    const filePath = `students/${studentId}.jpg`; // path inside bucket
    const { data, error } = supabase.storage
      .from("uploads") // 👈 your bucket name
      .getPublicUrl(filePath);

    if (error) {
      console.error("Error fetching photo URL:", error.message);
      return null;
    }

    // return public URL
    return data.publicUrl;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
