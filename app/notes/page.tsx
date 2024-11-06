import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("lck").select();
  console.log(notes);
  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
