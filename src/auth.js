import { supabase } from "./supabaseclient";
import { v4 as uuidv4 } from "uuid";

export const loginWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const sessionId = uuidv4();

  await supabase
    .from("users")
    .update({ activeSession: sessionId })
    .eq("id", data.user.id);

  localStorage.setItem("sessionId", sessionId);

  return data.user;
};

export const createUserWithEmail = async (fullName, email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const sessionId = uuidv4();

  await supabase.from("users").insert({
    id: data.user.id,
    name: fullName,
    email,
    coursesOwned: [],
    activeSession: sessionId,
    created_at: new Date(),
  });

  localStorage.setItem("sessionId", sessionId);

  return data.user;
};

export const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin },
  });

  if (error) throw error;

  return data;
};


export const logoutUser = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("sessionId");
};