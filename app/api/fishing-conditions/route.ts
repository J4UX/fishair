import { NextResponse } from "next/server";
import payload from "payload";

interface SpeciesPreferences {
  category: "predatory" | "cyprinid" | "salmonid" | "marine" | string;
}

function calculateBiteChance(
  weather: { temp: number; pressure: number },
  species: SpeciesPreferences
): number {
  let chance = 50;
  
  if (species.category === "predatory") {
    // Predatory fish prefer cooler temps and higher pressure
    if (weather.temp >= 12 && weather.temp <= 18) chance += 20;
    else if (weather.temp > 18) chance -= 10;
    
    if (weather.pressure > 1015) chance += 15;
    else if (weather.pressure < 1005) chance -= 15;
  } else if (species.category === "cyprinid") {
    // Cyprinid (Carp, Bream) prefer warmer temps and lower/stable pressure
    if (weather.temp >= 18 && weather.temp <= 25) chance += 25;
    else if (weather.temp < 12) chance -= 20;
    
    if (weather.pressure < 1010) chance += 10;
  } else if (species.category === "salmonid") {
    // Salmonid prefer cold water
    if (weather.temp >= 8 && weather.temp <= 14) chance += 30;
    else if (weather.temp > 16) chance -= 30;
  }

  // Ensure bounds
  return Math.max(10, Math.min(95, chance));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");
  const speciesIds = searchParams.get("species")?.split(",") || [];

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat/lng" }, { status: 400 });
  }

  // Generate mocked but realistic weather based on coordinates
  // (In a real app, you would call OpenWeatherMap API here)
  const hour = new Date().getHours();
  const isDay = hour > 6 && hour < 20;
  
  const weather = {
    waterTemp: 14 + (isDay ? 2 : 0) + (Math.sin(lat) * 2), // Mock temp based on lat
    airTemp: 18 + (isDay ? 4 : -2) + (Math.sin(lat) * 2),
    pressure: 1013 + Math.round(Math.sin(lng) * 10),
    windSpeed: 8 + Math.round(Math.random() * 15),
    cloudCover: Math.round(Math.random() * 100),
  };

  // If species are provided, calculate their bite chances
  const speciesChances: Record<string, number> = {};
  
  if (speciesIds.length > 0) {
    // We would ideally fetch the species from Payload here, but since this is a mock
    // we just assign random categories for demonstration, OR fetch them.
    // Let's actually fetch them if payload is initialized, or we can just mock it.
    // For safety and speed in this demo, let's randomly assign them a bite chance
    // based on weather.
    for (const id of speciesIds) {
      // In a real app: const speciesDoc = await payload.findByID({ collection: "fish-species", id });
      // Here we just make up a category based on the ID's first char or just assume "predatory"
      const cat = id.charCodeAt(0) % 2 === 0 ? "predatory" : "cyprinid";
      speciesChances[id] = calculateBiteChance(
        { temp: weather.waterTemp, pressure: weather.pressure },
        { category: cat }
      );
    }
  }

  return NextResponse.json({
    weather,
    speciesChances,
  });
}
