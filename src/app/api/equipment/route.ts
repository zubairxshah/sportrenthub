import { equipmentData } from "@/app/data-sets/mockData";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const equipment = equipmentData;
  return Response.json(equipment);
}