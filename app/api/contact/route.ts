export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, phone, inquiryType, childAges, message } = body;

  if (!firstName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase.from("contact_submissions").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || null,
    inquiry_type: inquiryType,
    child_ages: childAges || null,
    message,
  });

  if (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
