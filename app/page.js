import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Form from "@/components/form"

export default async function Page() {
  const supabase = await createClient();

  const { data: todos } = await supabase.from("todos").select();

  return (
    <>
      <ul>
        {todos?.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
      <Form/>

    </>
  );
}
