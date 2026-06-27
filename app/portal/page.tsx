import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalClient from "@/components/PortalClient";

export const metadata: Metadata = {
  title: "Member Portal",
  description: "Your Z. Axl's Dig Yard member dashboard.",
};

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/portal");
  }

  // Fetch member subscription data from Supabase
  const { data: membership } = await supabase
    .from("memberships")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return <PortalClient user={user} membership={membership} />;
}
