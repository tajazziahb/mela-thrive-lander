import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// 1. Function to convert profile to embedding using OpenAI
async function generateEmbedding(profile) {
  const profileText = `Industry: ${profile.industry}. 
    Expertise: ${profile.expertise.join(', ')}. 
    Experience: ${profile.yearsExperience} years. 
    Interests: ${profile.interests.join(', ')}`

  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: profileText
  })

  return response.data[0].embedding
}

// 2. Store mentor profile with vector
async function storeMentorProfile(mentorData) {
  const embedding = await generateEmbedding(mentorData)

  const { data, error } = await supabase
    .from('mentors')
    .insert({
      name: mentorData.name,
      industry: mentorData.industry,
      expertise: mentorData.expertise,
      years_experience: mentorData.yearsExperience,
      profile_vector: embedding
    })

  if (error) throw error
  return data
}

// 3. Find matches for a mentee
async function findMatches(menteeProfile, limit = 5) {
  const menteeEmbedding = await generateEmbedding(menteeProfile)

  const { data, error } = await supabase
    .rpc('match_mentors', {
      query_embedding: menteeEmbedding,
      match_threshold: 0.7, // Adjust this threshold as needed
      match_count: limit
    })

  if (error) throw error
  return data
}

// 4. Example usage
const mentorProfile = {
  name: "Jane Doe",
  industry: "Technology",
  expertise: ["Web Development", "StartUp Growth", "Product Management"],
  yearsExperience: 8,
  interests: ["Innovation", "Mentoring", "Tech Education"]
}

const menteeProfile = {
  industry: "Technology",
  expertise: ["Web Development"],
  yearsExperience: 2,
  interests: ["StartUp", "Learning"]
}