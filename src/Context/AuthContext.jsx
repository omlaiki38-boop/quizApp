import React, { useEffect, useContext, createContext, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [isBanned, setIsBanned] = useState(false);
  const [loading, setLoading] = useState(true); // true until session + accountType are ready

  // --- Sign in ---
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Failed to sign in");
      return;
    }

    const currentUser = data.session?.user || null;
    setSession(data.session);
    setUser(currentUser);
    setAccountType(currentUser?.user_metadata?.role || null);
    setIsBanned(currentUser?.user_metadata?.banned || false);

    toast.success("Signed in successfully 🎉");

    const role = currentUser?.user_metadata?.role;
    navigate(role === "admin" ? "/admin/dashboard" : "/dashboard");
  };

  // --- Sign up ---
  const signUp = async (email, password, usernameValue) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: usernameValue, role: "client", banned: false },
      },
    });

    if (error) {
      toast.error(error.message || "Failed to sign up");
      return;
    }

    // If email confirmation is ON -> no session yet
    if (!data.session) {
      toast.success("Account created. Please check your email to confirm.");
      return;
    }

    const currentUser = data.session.user;
    setSession(data.session);
    setUser(currentUser);
    setAccountType(currentUser.user_metadata?.role || null);
    setIsBanned(currentUser.user_metadata?.banned || false);

    toast.success("Account created successfully 🎉");
    navigate("/dashboard");
  };

  // --- Sign out ---
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
      return;
    }

    setSession(null);
    setUser(null);
    setAccountType(null);
    setIsBanned(false);
    toast.success("Signed out successfully 👋");
    navigate("/login");
  };

  // --- Ban user ---
  // const banUser = async (userId) => {
  //   const { data, error } = await supabase.auth.admin.updateUserById(userId, {
  //     user_metadata: { banned: true },
  //   });

  //   if (error) {
  //     console.log("Error banning user:", error);
  //     toast.error(error.message || "error banning user");
  //   } else {
  //     toast.success("User banned successfully");
  //   }
  // };
  // const activateUser = async (userId) => {
  //   const { data, error } = await supabase.auth.admin.updateUserById(userId, {
  //     user_metadata: { banned: false },
  //   });

  //   if (error) {
  //     console.log("Error activating user:", error);
  //     toast.error(error.message || "error activating user");
  //   } else {
  //     toast.success("User Activated successfully");
  //   }
  // };

  // --- Initialize session & auth listener ---
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast.error(error.message || "Failed to fetch session");
      } else if (data?.session) {
        const currentUser = data.session.user;
        setSession(data.session);
        setUser(currentUser);
        setAccountType(currentUser?.user_metadata?.role || null);
        setIsBanned(currentUser?.user_metadata?.banned || false);

        // // Log out immediately if user is banned
        // if (currentUser?.user_metadata?.banned) {
        //   toast.error("You are banned from this platform.");
        //   await signOut();
        // }
      }

      setLoading(false); // Done loading initial session
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user || null;
      setSession(session || null);
      setUser(currentUser);
      setAccountType(currentUser?.user_metadata?.role || null);
      setIsBanned(currentUser?.user_metadata?.banned || false);

      // if (currentUser?.user_metadata?.banned) {
      //   toast.error("You are banned from this platform.");
      //   await signOut();
      // }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleBannedUser = async () => {
      const currentUser = session?.user || null;

      if (currentUser?.user_metadata?.banned) {
        toast.error("You are banned from this platform.");
        await signOut();
        return;
      }
    };
    handleBannedUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        accountType,
        isBanned,
        signIn,
        signUp,
        signOut,
        loading,
        // banUser,
        // activateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
