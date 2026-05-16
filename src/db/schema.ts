export const boardSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "title", "favorite", "tone"],
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    favorite: { type: "boolean" },
    tone: {
      type: "string",
      enum: ["red", "blue", "violet", "slate"],
    },
  },
} 